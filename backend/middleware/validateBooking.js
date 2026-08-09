const { isValidEmail, isValidPhone, isValidGST, isValidPAN, collectErrors, required } = require('../utils/validators');

// Validates a consultation booking submission before it ever reaches the
// controller/database. Runs on POST /api/bookings.
const validateBooking = (req, res, next) => {
  const b = req.body;

  const errors = collectErrors([
    { field: 'fullName', value: b.fullName, rules: [required('Full name is required')] },
    {
      field: 'businessEmail',
      value: b.businessEmail,
      rules: [required('Business email is required'), { test: isValidEmail, message: 'Enter a valid email address' }],
    },
    {
      field: 'mobileNumber',
      value: b.mobileNumber,
      rules: [required('Mobile number is required'), { test: isValidPhone, message: 'Enter a valid 10-digit mobile number' }],
    },
    {
      field: 'gstNumber',
      value: b.gstNumber,
      rules: [{ test: (v) => !v || isValidGST(v), message: 'Enter a valid 15-character GSTIN' }],
    },
    {
      field: 'panNumber',
      value: b.panNumber,
      rules: [{ test: (v) => !v || isValidPAN(v), message: 'Enter a valid 10-character PAN' }],
    },
  ]);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Please correct the highlighted fields',
      errors,
      timestamp: new Date().toISOString(),
    });
  }

  next();
};

module.exports = validateBooking;
