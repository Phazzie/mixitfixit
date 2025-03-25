const { GeminiError } = require('../errors/apiErrors');

/**
 * Handles Gemini-specific errors
 */
class ErrorHandler {
  /**
   * Processes and transforms errors
   * @param {Error} error - Original error
   * @returns {GeminiError} Transformed error
   */
  handleError(error) {
    if (error instanceof GeminiError) {
      return error;
    }

    if (this.isContentPolicyViolation(error)) {
      return new GeminiError('Content policy violation', 400);
    }

    if (this.isPermissionDenied(error)) {
      return new GeminiError('API permission denied', 403);
    }

    return new GeminiError('Gemini API error', 500);
  }

  /**
   * @private
   */
  isContentPolicyViolation(error) {
    return error.details?.[0]?.metadata?.includes('HarmBlockThreshold');
  }

  /**
   * @private
   */
  isPermissionDenied(error) {
    return error.message?.includes('Permission denied');
  }
}

module.exports = { ErrorHandler };