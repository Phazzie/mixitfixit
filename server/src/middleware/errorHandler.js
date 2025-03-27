const { GeminiError, ValidationError, PermissionError } = require('../errors/apiErrors');

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({
      error: "Validation Error",
      errorMessage: err.message
    });
  }

  if (err instanceof PermissionError) {
    return res.status(403).json({
      error: "Permission Error",
      errorMessage: err.message
    });
  }

  if (err instanceof GeminiError) {
    return res.status(err.status).json({
      error: "Gemini API Error",
      errorMessage: err.message
    });
  }

  // Default error
  console.error('Unhandled error:', err);
  return res.status(500).json({
    error: "Internal Server Error",
    errorMessage: "An unexpected error occurred"
  });
};

module.exports = errorHandler;