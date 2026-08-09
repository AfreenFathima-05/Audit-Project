const express = require('express');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { asyncHandler } = require('../middleware/errorHandler');
const { uploadDocument, listDocuments, downloadDocument, deleteDocument } = require('../controllers/documentController');

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/zip',
  'application/x-zip-compressed',
  'image/jpeg',
  'image/png',
];

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const unique = crypto.randomBytes(16).toString('hex');
    cb(null, `${Date.now()}-${unique}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) return cb(null, true);
  cb(new Error('Unsupported file type. Allowed: PDF, Excel, Word, ZIP, JPG, PNG.'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
});

// @route   POST /api/documents/upload
// @access  Private
router.post('/upload', protect, upload.single('file'), asyncHandler(uploadDocument));

// @route   GET /api/documents/download/:id
// @access  Private (ownership enforced in controller)
// NOTE: must be registered before the generic /:relatedType/:relatedId route below,
// otherwise "download" would be matched as a relatedType instead.
router.get('/download/:id', protect, asyncHandler(downloadDocument));

// @route   GET /api/documents/:relatedType/:relatedId
// @access  Private (ownership enforced in controller)
router.get('/:relatedType/:relatedId', protect, asyncHandler(listDocuments));

// @route   DELETE /api/documents/:id
// @access  Private (uploader or admin)
router.delete('/:id', protect, asyncHandler(deleteDocument));

module.exports = router;
