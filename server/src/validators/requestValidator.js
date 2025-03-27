const { ValidationError } = require('../errors/validationError');

class RequestValidator {
  validateAiRequest(body) {
    this.validateRequired(body);
    this.validateStringFields(body);
    return body;
  }

  private validateRequired(body) {
    if (!body.user1Statement || !body.user2Statement) {
      throw new ValidationError('Missing required statements');
    }
  }

  private validateStringFields(body) {
    if (typeof body.user1Statement !== 'string' || 
        typeof body.user2Statement !== 'string') {
      throw new ValidationError('Statements must be strings');
    }
  }
}

module.exports = new RequestValidator();