const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      unique: true,
      sparse: true, // only email/password users won't have this
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 6,
      select: false, // never returned by default queries
    },
    role: {
      type: String,
      enum: ['admin', 'junior', 'client'],
      default: 'client',
    },
    company: {
      type: String, // client's organization name, shown on dashboards
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
