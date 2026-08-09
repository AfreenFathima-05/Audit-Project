const Audit = require('../models/Audit');
const User = require('../models/User');
const notify = require('../utils/notify');

const POPULATE = [
  { path: 'client', select: 'name email company' },
  { path: 'assignedTo', select: 'name email' },
];

// GET /api/audits  - admin sees all, junior sees theirs, client sees theirs
const getAudits = async (req, res) => {
  try {
    let filter = { isDeleted: false };
    if (req.user.role === 'junior') filter.assignedTo = req.user._id;
    if (req.user.role === 'client') filter.client = req.user._id;

    const audits = await Audit.find(filter).populate(POPULATE).sort({ createdAt: -1 });
    res.status(200).json(audits);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching audits' });
  }
};

// POST /api/audits  (admin only)  { title, client, assignedTo, description, amount }
const createAudit = async (req, res) => {
  try {
    const { title, client, assignedTo, description, amount } = req.body;
    if (!title || !client || !assignedTo) {
      return res.status(400).json({ message: 'title, client and assignedTo are required' });
    }

    const audit = await Audit.create({ title, client, assignedTo, description, amount, createdBy: req.user._id });
    const populated = await audit.populate(POPULATE);
    res.status(201).json(populated);
  } catch (error) {
    console.error('Create audit error:', error);
    res.status(500).json({ message: 'Failed to create audit' });
  }
};

const findAccessibleAudit = async (req, res) => {
  const audit = await Audit.findById(req.params.id);
  if (!audit) {
    res.status(404).json({ message: 'Engagement not found' });
    return null;
  }
  const isOwner =
    req.user.role === 'admin' ||
    (req.user.role === 'junior' && String(audit.assignedTo) === String(req.user._id)) ||
    (req.user.role === 'client' && String(audit.client) === String(req.user._id));

  if (!isOwner) {
    res.status(403).json({ message: 'Not authorized for this engagement' });
    return null;
  }
  return audit;
};

// PATCH /api/audits/:id/status  { status, feedback? }  (admin, or junior starting fieldwork)
const updateStatus = async (req, res) => {
  try {
    const audit = await findAccessibleAudit(req, res);
    if (!audit) return;

    const { status, feedback } = req.body;
    const allowed = ['pending', 'in_progress', 'review', 'completed'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    audit.status = status;
    if (typeof feedback === 'string') audit.feedback = feedback;
    if (status !== 'in_progress' && status !== 'completed') {
      // keep feedback only when it's meaningful (a rejection)
    }
    if (status === 'completed') audit.feedback = '';

    await audit.save();
    const populated = await audit.populate(POPULATE);

    if (status === 'completed') {
      await notify({
        userId: populated.client._id,
        userEmail: populated.client.email,
        type: 'report_delivered',
        title: 'Your final report is ready',
        message: `"${populated.title}" has been completed and approved. Your final report is available in your dashboard.`,
        priority: 'high',
        link: '/crm/client/dashboard',
      });
    } else if (status === 'in_progress' && feedback) {
      await notify({
        userId: populated.assignedTo._id,
        userEmail: populated.assignedTo.email,
        type: 'report_rejected',
        title: 'Revisions requested on your submission',
        message: `"${populated.title}" needs changes: ${feedback}`,
        priority: 'high',
        link: '/crm/junior/dashboard',
      });
    }

    res.status(200).json(populated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update engagement status' });
  }
};

// PATCH /api/audits/:id/submit  { document }  (junior submitting fieldwork findings)
const submitReport = async (req, res) => {
  try {
    const audit = await findAccessibleAudit(req, res);
    if (!audit) return;

    const { document } = req.body;
    if (!document) {
      return res.status(400).json({ message: 'A document reference is required' });
    }

    audit.documents.push({ name: document });
    audit.status = 'review';
    await audit.save();

    const populated = await audit.populate(POPULATE);

    const admins = await User.find({ role: 'admin' }).select('_id email');
    admins.forEach((admin) =>
      notify({
        userId: admin._id,
        userEmail: admin.email,
        type: 'report_submitted',
        title: 'Report submitted for review',
        message: `${populated.assignedTo.name} submitted findings for "${populated.title}" — ready for your review.`,
        priority: 'normal',
        link: '/crm/admin/dashboard',
      })
    );

    res.status(200).json(populated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit report' });
  }
};

module.exports = { getAudits, createAudit, updateStatus, submitReport };
