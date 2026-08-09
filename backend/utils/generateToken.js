const jwt = require('jsonwebtoken');

// Signs our own app-level JWT (used for both email/password and Google logins).
// This is what every protected route verifies -- separate from Firebase ID tokens,
// which are only used once at Google-login time to prove the user owns that email.
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

module.exports = generateToken;
