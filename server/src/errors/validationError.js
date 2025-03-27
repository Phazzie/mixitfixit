/**
 * Custom error for validation failures
 */
class ValidationError extends Error {
  /**
   * @param {string} message - Error message
   */
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

module.exports = { ValidationError };