const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { asyncHandler } = require('../middleware/errorHandler');
const { getMyNotifications, markRead, markAllRead } = require('../controllers/notificationController');

router.get('/', protect, asyncHandler(getMyNotifications));
router.patch('/read-all', protect, asyncHandler(markAllRead));
router.patch('/:id/read', protect, asyncHandler(markRead));

module.exports = router;
