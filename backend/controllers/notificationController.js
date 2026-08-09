const Notification = require('../models/Notification');

// GET /api/notifications
const getMyNotifications = async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id, isDeleted: false })
    .sort({ createdAt: -1 })
    .limit(50);
  const unreadCount = await Notification.countDocuments({ user: req.user._id, isDeleted: false, read: false });
  res.status(200).json({ status: 'success', message: 'Notifications fetched', data: { notifications, unreadCount }, timestamp: new Date().toISOString() });
};

// PATCH /api/notifications/:id/read
const markRead = async (req, res) => {
  const notification = await Notification.findOne({ _id: req.params.id, user: req.user._id });
  if (!notification) {
    return res.status(404).json({ status: 'error', message: 'Notification not found', timestamp: new Date().toISOString() });
  }
  notification.read = true;
  await notification.save();
  res.status(200).json({ status: 'success', message: 'Marked read', data: notification, timestamp: new Date().toISOString() });
};

// PATCH /api/notifications/read-all
const markAllRead = async (req, res) => {
  await Notification.updateMany({ user: req.user._id, read: false }, { read: true });
  res.status(200).json({ status: 'success', message: 'All marked read', data: null, timestamp: new Date().toISOString() });
};

module.exports = { getMyNotifications, markRead, markAllRead };
