const Booking = require('../models/Booking');
const User = require('../models/User');
const Audit = require('../models/Audit');
const { sendMail } = require('../utils/mailer');
const notify = require('../utils/notify');

const REQUIRED_FIELDS = ['fullName', 'businessEmail', 'mobileNumber'];

const generateBookingId = () => {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `AUD-${year}-${rand}`;
};

const confirmationEmailHtml = (booking) => `
  <div style="font-family: sans-serif; color: #1E2A20;">
    <h2>Thank you, ${booking.fullName}.</h2>
    <p>Your consultation request has been received.</p>
    <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
    <p>Keep this ID -- you can use it with your email to track your booking status at any time.</p>
    <p>Our team will review your request and reach out shortly to confirm your preferred slot.</p>
  </div>
`;

// POST /api/bookings  (public)
const createBooking = async (req, res) => {
  try {
    const missing = REQUIRED_FIELDS.filter((f) => !req.body[f]);
    if (missing.length) {
      return res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}` });
    }
    if (!req.body.acceptedTerms || !req.body.acceptedPrivacyPolicy) {
      return res.status(400).json({ message: 'You must accept the Terms and Privacy Policy to proceed' });
    }

    let bookingId = generateBookingId();
    // extremely unlikely collision, but guard anyway
    while (await Booking.findOne({ bookingId })) {
      bookingId = generateBookingId();
    }

    const booking = await Booking.create({ ...req.body, bookingId });

    sendMail({
      to: booking.businessEmail,
      subject: `Booking Confirmed — ${booking.bookingId}`,
      html: confirmationEmailHtml(booking),
    }).catch(() => {});

    // Notify every admin so it shows up on their dashboard immediately.
    const admins = await User.find({ role: 'admin' }).select('_id email');
    admins.forEach((admin) =>
      notify({
        userId: admin._id,
        type: 'booking_created',
        title: 'New consultation request',
        message: `${booking.fullName} (${booking.companyName || booking.businessEmail}) submitted a new consultation request — ${booking.bookingId}.`,
        priority: 'normal',
        link: '/crm/admin/dashboard',
      })
    );

    res.status(201).json(booking);
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Failed to submit consultation request' });
  }
};

// GET /api/bookings  (admin only)
const getBookings = async (req, res) => {
  try {
    const filter = { isDeleted: false };
    if (req.query.status) filter.status = req.query.status;
    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching bookings' });
  }
};

// PATCH /api/bookings/:id  (admin only)  { status?, trackerStage?, assignedTo? }
const updateBooking = async (req, res) => {
  try {
    const { status, trackerStage, assignedTo } = req.body;
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (status) booking.status = status;
    if (trackerStage) booking.trackerStage = trackerStage;
    if (assignedTo !== undefined) booking.assignedTo = assignedTo || null;

    await booking.save();
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update booking' });
  }
};

// GET /api/bookings/track?bookingId=&email=  (public — requires both to prevent enumeration)
const trackBooking = async (req, res) => {
  try {
    const { bookingId, email } = req.query;
    if (!bookingId || !email) {
      return res.status(400).json({ message: 'bookingId and email are required' });
    }

    const booking = await Booking.findOne({
      bookingId: bookingId.trim(),
      businessEmail: email.trim().toLowerCase(),
    }).select('bookingId fullName status trackerStage createdAt');

    if (!booking) {
      return res.status(404).json({ message: 'No booking found for that ID and email' });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error tracking booking' });
  }
};

// POST /api/bookings/:id/approve  (admin only)  { assignedTo: juniorUserId }
// The core Booking -> Project workflow: turns a raw consultation request into
// a real Audit/Project, auto-provisioning a client account from the booking's
// contact details if one doesn't already exist, and assigning a junior auditor.
const approveBooking = async (req, res) => {
  try {
    const { assignedTo } = req.body;
    if (!assignedTo) {
      return res.status(400).json({ message: 'Select a junior auditor to assign this engagement to' });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking || booking.isDeleted) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    if (booking.status !== 'Pending' && booking.status !== 'Under Review') {
      return res.status(400).json({ message: `Booking is already ${booking.status}` });
    }

    const junior = await User.findOne({ _id: assignedTo, role: 'junior' });
    if (!junior) {
      return res.status(400).json({ message: 'Selected auditor was not found' });
    }

    // Find or auto-provision the client account from the booking's own details.
    // They won't have a password yet -- they can set one via Google Sign-In or
    // a password reset using this same email once they want to log in.
    let client = await User.findOne({ email: booking.businessEmail });
    if (!client) {
      client = await User.create({
        name: booking.fullName,
        email: booking.businessEmail,
        role: 'client',
        company: booking.companyName || '',
      });
    } else if (client.role !== 'client') {
      return res.status(400).json({ message: 'This email is already registered under a different role' });
    }

    const project = await Audit.create({
      title: booking.servicesInterestedIn?.length ? booking.servicesInterestedIn.join(', ') : `Engagement for ${booking.fullName}`,
      client: client._id,
      assignedTo: junior._id,
      description: booking.businessGoals || booking.currentProblems || '',
      amount: 0,
      createdBy: req.user._id,
    });

    booking.status = 'Assigned';
    booking.trackerStage = 'Assigned';
    booking.assignedTo = junior._id;
    await booking.save();

    await notify({
      userId: junior._id,
      userEmail: junior.email,
      type: 'project_started',
      title: 'New engagement assigned to you',
      message: `You've been assigned "${project.title}" for ${client.name}.`,
      priority: 'high',
      link: '/crm/junior/dashboard',
    });
    await notify({
      userId: client._id,
      userEmail: client.email,
      type: 'booking_assigned',
      title: 'Your consultation has been approved',
      message: `Your request (${booking.bookingId}) has been approved and assigned to our team. Work has begun.`,
      priority: 'normal',
      link: '/track-booking',
    });

    res.status(200).json({ booking, project });
  } catch (error) {
    console.error('Approve booking error:', error);
    res.status(500).json({ message: 'Failed to approve booking' });
  }
};

// POST /api/bookings/:id/reject  (admin only)  { reason? }
const rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking || booking.isDeleted) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    booking.status = 'Cancelled';
    await booking.save();

    sendMail({
      to: booking.businessEmail,
      subject: `Update on your consultation request — ${booking.bookingId}`,
      html: `<p>Hi ${booking.fullName},</p><p>We're unable to proceed with your request (${booking.bookingId}) at this time. ${req.body.reason || 'Please contact us for details.'}</p>`,
    }).catch(() => {});

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to reject booking' });
  }
};

module.exports = { createBooking, getBookings, updateBooking, trackBooking, approveBooking, rejectBooking };
