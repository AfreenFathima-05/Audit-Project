const fs = require('fs');
const path = require('path');
const Document = require('../models/Document');
const Audit = require('../models/Audit');
const Booking = require('../models/Booking');

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');

// Confirms the requesting user is allowed to see documents for this booking/audit.
const canAccess = async (user, relatedType, relatedId) => {
  if (user.role === 'admin') return true;

  if (relatedType === 'audit') {
    const audit = await Audit.findById(relatedId);
    if (!audit) return false;
    return (
      (user.role === 'junior' && String(audit.assignedTo) === String(user._id)) ||
      (user.role === 'client' && String(audit.client) === String(user._id))
    );
  }

  if (relatedType === 'booking') {
    // Bookings aren't tied to a user account (public form submissions), so a
    // logged-in client can only see booking documents that match their own email.
    const booking = await Booking.findById(relatedId);
    if (!booking) return false;
    return user.role === 'client' && booking.businessEmail === user.email;
  }

  return false;
};

// POST /api/documents/upload  (multipart/form-data: file, relatedType, relatedId, label?)
const uploadDocument = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ status: 'error', message: 'No file uploaded', timestamp: new Date().toISOString() });
  }

  const { relatedType, relatedId, label } = req.body;
  if (!relatedType || !relatedId || !['booking', 'audit'].includes(relatedType)) {
    fs.unlink(req.file.path, () => {});
    return res.status(400).json({ status: 'error', message: 'relatedType (booking|audit) and relatedId are required', timestamp: new Date().toISOString() });
  }

  const allowed = await canAccess(req.user, relatedType, relatedId);
  if (!allowed) {
    fs.unlink(req.file.path, () => {});
    return res.status(403).json({ status: 'error', message: 'Not authorized to upload documents here', timestamp: new Date().toISOString() });
  }

  const doc = await Document.create({
    originalName: req.file.originalname,
    storedName: req.file.filename,
    mimeType: req.file.mimetype,
    size: req.file.size,
    relatedType,
    relatedId,
    uploadedBy: req.user._id,
    createdBy: req.user._id,
    label: label || '',
  });

  res.status(201).json({ status: 'success', message: 'Document uploaded', data: doc, timestamp: new Date().toISOString() });
};

// GET /api/documents/:relatedType/:relatedId
const listDocuments = async (req, res) => {
  const { relatedType, relatedId } = req.params;
  if (!['booking', 'audit'].includes(relatedType)) {
    return res.status(400).json({ status: 'error', message: 'Invalid relatedType', timestamp: new Date().toISOString() });
  }

  const allowed = await canAccess(req.user, relatedType, relatedId);
  if (!allowed) {
    return res.status(403).json({ status: 'error', message: 'Not authorized to view these documents', timestamp: new Date().toISOString() });
  }

  const docs = await Document.find({ relatedType, relatedId, isDeleted: false }).sort({ createdAt: -1 });
  res.status(200).json({ status: 'success', message: 'Documents fetched', data: docs, timestamp: new Date().toISOString() });
};

// GET /api/documents/:id/download
const downloadDocument = async (req, res) => {
  const doc = await Document.findById(req.params.id);
  if (!doc || doc.isDeleted) {
    return res.status(404).json({ status: 'error', message: 'Document not found', timestamp: new Date().toISOString() });
  }

  const allowed = await canAccess(req.user, doc.relatedType, doc.relatedId);
  if (!allowed) {
    return res.status(403).json({ status: 'error', message: 'Not authorized to download this document', timestamp: new Date().toISOString() });
  }

  const filePath = path.join(UPLOAD_DIR, doc.storedName);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ status: 'error', message: 'File missing from storage', timestamp: new Date().toISOString() });
  }

  res.download(filePath, doc.originalName);
};

// DELETE /api/documents/:id  (soft delete)
const deleteDocument = async (req, res) => {
  const doc = await Document.findById(req.params.id);
  if (!doc || doc.isDeleted) {
    return res.status(404).json({ status: 'error', message: 'Document not found', timestamp: new Date().toISOString() });
  }

  const allowed = req.user.role === 'admin' || String(doc.uploadedBy) === String(req.user._id);
  if (!allowed) {
    return res.status(403).json({ status: 'error', message: 'Not authorized to delete this document', timestamp: new Date().toISOString() });
  }

  doc.isDeleted = true;
  doc.status = 'archived';
  await doc.save();

  res.status(200).json({ status: 'success', message: 'Document archived', data: doc, timestamp: new Date().toISOString() });
};

module.exports = { uploadDocument, listDocuments, downloadDocument, deleteDocument };
