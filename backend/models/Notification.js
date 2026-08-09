const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: {
      type: String,
      enum: [
        'booking_created', 'booking_assigned', 'project_started', 'deadline_reminder',
        'report_submitted', 'report_approved', 'report_rejected', 'report_delivered',
        'system',
      ],
      default: 'system',
    },
    title: { type: String, required: true },
    message: { type: String, default: '' },
    priority: { type: String, enum: ['low', 'normal', 'high'], default: 'normal' },
    link: { type: String, default: '' }, // relative frontend path to open on click
    read: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
