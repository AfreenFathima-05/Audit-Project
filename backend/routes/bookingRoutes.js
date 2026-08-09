const express = require('express');
const router = express.Router();
const { createBooking, getBookings, updateBooking, trackBooking, approveBooking, rejectBooking } = require('../controllers/bookingController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const validateBooking = require('../middleware/validateBooking');

// @route   POST /api/bookings
// @desc    Submit a new consultation request
// @access  Public
router.post('/', validateBooking, createBooking);

// @route   GET /api/bookings/track
// @desc    Client looks up their own booking status by bookingId + email
// @access  Public (scoped by matching both fields)
router.get('/track', trackBooking);

// @route   GET /api/bookings
// @desc    List all consultation requests
// @access  Private/Admin
router.get('/', protect, adminOnly, getBookings);

// @route   POST /api/bookings/:id/approve
// @desc    Approve a booking -> creates the client account (if new) + Project + assigns a junior auditor
// @access  Private/Admin
router.post('/:id/approve', protect, adminOnly, approveBooking);

// @route   POST /api/bookings/:id/reject
// @access  Private/Admin
router.post('/:id/reject', protect, adminOnly, rejectBooking);

// @route   PATCH /api/bookings/:id
// @desc    Update booking status / tracker stage / assignment
// @access  Private/Admin
router.patch('/:id', protect, adminOnly, updateBooking);

module.exports = router;
