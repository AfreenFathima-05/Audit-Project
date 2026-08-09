// Lightweight structured logger -- no external dependency needed for this scale.
// Every line is timestamped and tagged so it's easy to grep in production logs.
const timestamp = () => new Date().toISOString();

const logger = {
  info: (message, meta = {}) => {
    console.log(`[${timestamp()}] [INFO] ${message}`, Object.keys(meta).length ? meta : '');
  },
  warn: (message, meta = {}) => {
    console.warn(`[${timestamp()}] [WARN] ${message}`, Object.keys(meta).length ? meta : '');
  },
  error: (message, meta = {}) => {
    console.error(`[${timestamp()}] [ERROR] ${message}`, Object.keys(meta).length ? meta : '');
  },
};

module.exports = logger;
