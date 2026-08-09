// Lightweight, dependency-free request validators. Every one of these must
// pass before a request reaches the database -- the frontend's own validation
// is never trusted as the only line of defense.

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());

// Accepts 10-digit Indian mobile numbers, optionally with +91 / 0 prefix and spaces/dashes.
const isValidPhone = (value) => /^(\+91[\-\s]?|0)?[6-9]\d{9}$/.test(String(value || '').replace(/\s+/g, ''));

// Standard 15-character GSTIN format
const isValidGST = (value) => /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}$/.test(String(value || '').trim().toUpperCase());

// Standard 10-character PAN format
const isValidPAN = (value) => /^[A-Z]{5}\d{4}[A-Z]{1}$/.test(String(value || '').trim().toUpperCase());

const isValidDate = (value) => !isNaN(Date.parse(value));

const isValidObjectId = (value) => /^[0-9a-fA-F]{24}$/.test(String(value || ''));

// Runs a list of { field, value, rules: [{ test, message }] } and collects
// every failure instead of stopping at the first one, so the client can fix
// everything in one pass.
const collectErrors = (checks) => {
  const errors = {};
  for (const { field, value, rules } of checks) {
    for (const rule of rules) {
      if (!rule.test(value)) {
        errors[field] = rule.message;
        break; // one message per field is enough
      }
    }
  }
  return errors;
};

const required = (message = 'This field is required') => ({
  test: (v) => v !== undefined && v !== null && String(v).trim() !== '',
  message,
});

const optionalOr = (test) => ({ test: (v) => !v || test(v) });

module.exports = {
  isValidEmail,
  isValidPhone,
  isValidGST,
  isValidPAN,
  isValidDate,
  isValidObjectId,
  collectErrors,
  required,
  optionalOr,
};
