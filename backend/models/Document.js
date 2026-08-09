const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    originalName: { type: String, required: true },
    storedName: { type: String, required: true }, // filename on disk
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },

    // What this document is attached to
    relatedType: { type: String, enum: ['booking', 'audit'], required: true },
    relatedId: { type: mongoose.Schema.Types.ObjectId, required: true },

    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    label: { type: String, default: '' }, // e.g. "Draft Report", "Supporting Document"

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['active', 'archived'], default: 'active' },
    isDeleted: { type: Boolean, default: false }, // soft delete
  },
  { timestamps: true }
);

module.exports = mongoose.model('Document', documentSchema);
