const rateLimit = require('express-rate-limit');

// Applies to /api/auth/login and /api/auth/google.
// Generous enough for normal retries, tight enough to blunt credential stuffing.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many login attempts. Please try again in a few minutes.' },
});

module.exports = { authLimiter };
