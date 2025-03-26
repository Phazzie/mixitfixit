const { ValidationError } = require('../errors/validationError');
const { GeminiError } = require('../errors/apiErrors');

/**
 * Global error handling middleware
 */
const errorMiddleware = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    return res.status(400).json({
      error: 'Validation Error',
      message: error.message
    });
  }

  if (error instanceof GeminiError) {
    return res.status(error.status || 500).json({
      error: 'Gemini API Error',
      message: error.message
    });
  }

  // Log unexpected errors
  console.error('Unexpected error:', error);
  
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred'
  });
};

module.exports = { errorMiddleware };