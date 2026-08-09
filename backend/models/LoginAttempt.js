const mongoose = require('mongoose');

// Security audit trail: every login attempt against a restricted role
// (currently: admin) gets logged here, successful or not.
const loginAttemptSchema = new mongoose.Schema(
  {
    email: { type: String, lowercase: true, trim: true },
    attemptedRole: { type: String, default: '' },
    method: { type: String, enum: ['password', 'google'], required: true },
    success: { type: Boolean, required: true },
    reason: { type: String, default: '' },
    ip: { type: String, default: '' },
    userAgent: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LoginAttempt', loginAttemptSchema);
