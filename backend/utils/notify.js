const Notification = require('../models/Notification');
const { sendMail } = require('./mailer');

// Creates a dashboard notification and (best-effort, non-blocking) emails the
// user too. Used by booking/audit controllers whenever something happens
// that the recipient should know about -- never throws into the caller.
const notify = async ({ userId, userEmail, type, title, message, priority = 'normal', link = '' }) => {
  try {
    await Notification.create({ user: userId, type, title, message, priority, link });
  } catch (error) {
    console.error('notify() failed to store notification:', error.message);
  }

  if (userEmail) {
    sendMail({
      to: userEmail,
      subject: title,
      html: `<div style="font-family: sans-serif; color: #1E2A20;"><p>${message}</p></div>`,
    }).catch(() => {});
  }
};

module.exports = notify;
