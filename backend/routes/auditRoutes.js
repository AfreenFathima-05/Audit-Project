const express = require('express');
const router = express.Router();
const { getAudits, createAudit, updateStatus, submitReport } = require('../controllers/auditController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// @route   GET /api/audits
// @desc    Get audits scoped to the current user's role
// @access  Private
router.get('/', protect, getAudits);

// @route   POST /api/audits
// @desc    Create a new engagement
// @access  Private/Admin
router.post('/', protect, adminOnly, createAudit);

// @route   PATCH /api/audits/:id/status
// @desc    Move an engagement through its workflow (start, approve, reject)
// @access  Private (ownership enforced in controller)
router.patch('/:id/status', protect, updateStatus);

// @route   PATCH /api/audits/:id/submit
// @desc    Junior submits fieldwork findings for partner review
// @access  Private (ownership enforced in controller)
router.patch('/:id/submit', protect, submitReport);

module.exports = router;
