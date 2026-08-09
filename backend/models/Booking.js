const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },

    // --- Contact & company ---
    fullName: { type: String, required: true, trim: true },
    companyName: { type: String, trim: true, default: '' },
    businessEmail: { type: String, required: true, trim: true, lowercase: true },
    mobileNumber: { type: String, required: true, trim: true },
    alternateContactNumber: { type: String, trim: true, default: '' },
    companyWebsite: { type: String, trim: true, default: '' },

    // --- Address ---
    businessAddress: { type: String, trim: true, default: '' },
    country: { type: String, trim: true, default: '' },
    state: { type: String, trim: true, default: '' },
    city: { type: String, trim: true, default: '' },

    // --- Business profile ---
    industry: { type: String, trim: true, default: '' },
    natureOfBusiness: { type: String, trim: true, default: '' },
    numberOfEmployees: { type: String, trim: true, default: '' },
    annualTurnover: { type: String, trim: true, default: '' },
    currentAccountingSoftware: { type: String, trim: true, default: '' },
    businessRegistrationNumber: { type: String, trim: true, default: '' },
    gstNumber: { type: String, trim: true, default: '' },
    panNumber: { type: String, trim: true, default: '' },

    // --- Consultation preferences ---
    preferredMode: {
      type: String,
      enum: ['Online', 'Offline', 'Video Call'],
      default: 'Video Call',
    },
    preferredDate: { type: String, trim: true, default: '' },
    preferredTime: { type: String, trim: true, default: '' },

    // --- Requirements ---
    businessGoals: { type: String, trim: true, default: '' },
    currentProblems: { type: String, trim: true, default: '' },
    expectedOutcome: { type: String, trim: true, default: '' },
    servicesInterestedIn: { type: [String], default: [] },
    budgetRange: { type: String, trim: true, default: '' },
    supportingDocumentsNote: { type: String, trim: true, default: '' }, // real file upload deferred
    additionalNotes: { type: String, trim: true, default: '' },

    // --- Consent ---
    acceptedTerms: { type: Boolean, required: true },
    acceptedPrivacyPolicy: { type: Boolean, required: true },

    // --- Workflow ---
    status: {
      type: String,
      enum: [
        'Pending',
        'Under Review',
        'Assigned',
        'In Progress',
        'Completed',
        'Cancelled',
      ],
      default: 'Pending',
    },
    // Mirrors the client-facing tracker stages independent of internal `status`
    trackerStage: {
      type: String,
      enum: [
        'Received',
        'Under Review',
        'Assigned',
        'Auditing Started',
        'Internal Review',
        'Final Report',
        'Delivered',
      ],
      default: 'Received',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
