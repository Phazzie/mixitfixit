const { GeminiError } = require('../errors/apiErrors');

class ResponseValidator {
  validate(response) {
    if (!response?.response) {
      throw new GeminiError('Failed to generate response');
    }
    return response;
  }
}

module.exports = ResponseValidator;