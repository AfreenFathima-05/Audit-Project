const express = require('express');
const router = express.Router();
const { login, google, me } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/rateLimiters');

// @route   POST /api/auth/login
// @desc    Email + password login, returns app JWT
router.post('/login', authLimiter, login);

// @route   POST /api/auth/google
// @desc    Verify a Firebase ID token from Google Sign-In, find-or-create the user, return app JWT
router.post('/google', authLimiter, google);

// @route   POST /api/auth/reset-password
// @desc    Direct password reset (no email token, for testing)
router.post('/reset-password', authLimiter, require('../controllers/authController').resetPassword);

// @route   GET /api/auth/me
// @desc    Return the currently authenticated user
router.get('/me', protect, me);

module.exports = router;
