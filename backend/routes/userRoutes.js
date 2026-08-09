const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// @route   GET /api/users
// @desc    List users (optionally filtered by ?role=)
// @access  Private/Admin
router.get('/', protect, adminOnly, getUsers);

module.exports = router;
