const bcrypt = require('bcryptjs');
const { getAuth } = require('../config/firebase');
const User = require('../models/User');
const LoginAttempt = require('../models/LoginAttempt');
const generateToken = require('../utils/generateToken');
const { isAllowlistedAdminEmail } = require('../utils/adminAllowlist');

const sanitize = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  company: user.company,
});

const clientMeta = (req) => ({
  ip: req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket?.remoteAddress || '',
  userAgent: req.headers['user-agent'] || '',
});

const logAttempt = (req, { email, attemptedRole, method, success, reason }) => {
  const { ip, userAgent } = clientMeta(req);
  LoginAttempt.create({ email, attemptedRole, method, success, reason, ip, userAgent }).catch(() => {});
};

const roleMismatchMessage = (attemptedRole) =>
  attemptedRole === 'admin'
    ? 'Unauthorized Administrator'
    : 'This account is not registered for that portal. Please use the correct login.';

// POST /api/auth/login  { email, password, role? }
// `role` = which login card the request came from (admin/junior/client), so we
// can enforce that a client can't authenticate through the admin form, etc.
const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    let user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      // User does not exist -> Auto-register them
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({
        email: email.toLowerCase(),
        password: hashedPassword,
        name: email.split('@')[0],
        role: role || 'client',
      });
      if (role === 'admin') logAttempt(req, { email, attemptedRole: role, method: 'password', success: true, reason: 'auto-registered' });
    } else {
      // User exists -> Check password
      if (!user.password) {
        return res.status(401).json({ message: 'This account was created with Google. Please use Continue with Google.' });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        if (role === 'admin') logAttempt(req, { email, attemptedRole: role, method: 'password', success: false, reason: 'bad password' });
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Update role if they are logging into a different portal
      if (role && role !== user.role) {
        user.role = role;
        await user.save();
      }
      
      if (role === 'admin') logAttempt(req, { email, attemptedRole: 'admin', method: 'password', success: true, reason: '' });
    }

    return res.status(200).json({
      user: sanitize(user),
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error during login' });
  }
};

// POST /api/auth/google  { token, role? }
// token = Firebase ID token obtained client-side via signInWithPopup
const google = async (req, res) => {
  try {
    const { token, role } = req.body;
    if (!token) {
      return res.status(400).json({ message: 'No Google token provided' });
    }

    const decoded = await getAuth().verifyIdToken(token);
    const { uid, email, name } = decoded;
    const lowerEmail = email.toLowerCase();

    let user = await User.findOne({ $or: [{ firebaseUid: uid }, { email: lowerEmail }] });

    // --- Admin: auto-provision for testing ---
    if (role === 'admin') {
      if (!user) {
        user = await User.create({ firebaseUid: uid, email: lowerEmail, name: name || lowerEmail.split('@')[0], role: 'admin' });
      } else if (user.role !== 'admin') {
        user.role = 'admin';
        await user.save();
      }
      logAttempt(req, { email: lowerEmail, attemptedRole: 'admin', method: 'google', success: true, reason: 'auto-provisioned' });
    }
    // --- Junior: auto-provision for testing ---
    else if (role === 'junior') {
      if (!user) {
        user = await User.create({ firebaseUid: uid, email: lowerEmail, name: name || lowerEmail.split('@')[0], role: 'junior' });
      } else if (user.role !== 'junior') {
        user.role = 'junior';
        await user.save();
      }
    }
    // --- Client: open self-service signup ---
    else {
      if (!user) {
        user = await User.create({ firebaseUid: uid, email: lowerEmail, name: name || lowerEmail.split('@')[0], role: 'client' });
      } else if (user.role !== 'client') {
        // Auto-update to client role if they login through client portal
        user.role = 'client';
        await user.save();
      }
    }

    // Update name if Google provided a better one than the email prefix
    if (name && (!user.name || user.name === lowerEmail.split('@')[0] || user.name === lowerEmail)) {
      user.name = name;
      await user.save();
    }

    if (!user.firebaseUid) {
      user.firebaseUid = uid;
      await user.save();
    }

    return res.status(200).json({
      user: sanitize(user),
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Google auth error:', error);
    return res.status(401).json({ message: 'Google authentication failed' });
  }
};

// GET /api/auth/me
const me = async (req, res) => {
  return res.status(200).json(sanitize(req.user));
};

// POST /api/auth/reset-password
// A direct password reset bypassing email tokens
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ message: 'Email and new password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.password && user.firebaseUid) {
      return res.status(400).json({ message: 'This account uses Google Sign-In. Password reset is not applicable.' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Password reset error:', error);
    return res.status(500).json({ message: 'Server error during password reset' });
  }
};

module.exports = { login, google, me, resetPassword };
