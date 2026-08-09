const logger = require('../utils/logger');

// Wraps an async route handler so thrown/rejected errors reach errorHandler
// instead of crashing the process or hanging the request.
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// 404 for any route that didn't match
const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Route not found: ${req.method} ${req.originalUrl}`));
};

// Centralized error handler -- last middleware in the chain.
// Never leaks stack traces or internal details to the client.
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  logger.error(err.message, {
    statusCode,
    method: req.method,
    path: req.originalUrl,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });

  res.status(statusCode).json({
    status: 'error',
    message: statusCode === 500 ? 'Something went wrong on our end. Please try again.' : err.message,
    timestamp: new Date().toISOString(),
  });
};

module.exports = { asyncHandler, notFound, errorHandler };
