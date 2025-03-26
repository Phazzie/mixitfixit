const { ValidationError } = require('../errors/validationError');

/**
 * Validates API requests
 */
class RequestValidator {
  /**
   * Validates statement analysis request
   * @param {object} body - Request body
   * @throws {ValidationError} If validation fails
   */
  validateAnalysisRequest(body) {
    const { user1Statement, user2Statement } = body;

    if (!this.isValidStatement(user1Statement)) {
      throw new ValidationError('Invalid user1Statement');
    }

    if (!this.isValidStatement(user2Statement)) {
      throw new ValidationError('Invalid user2Statement');
    }

    return { user1Statement, user2Statement };
  }

  /**
   * @private
   */
  isValidStatement(statement) {
    return typeof statement === 'string' && 
           statement.trim().length > 0 &&
           statement.length <= 1000; // Reasonable limit
  }
}

module.exports = { RequestValidator };