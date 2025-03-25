/**
 * Custom API error classes
 */
class GeminiError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.name = 'GeminiError';
    this.status = status;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
  }
}

class PermissionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PermissionError';
    this.status = 403;
  }
}

module.exports = {
  GeminiError,
  ValidationError,
  PermissionError
};