import { ERROR_MESSAGES } from '../constants/errorMessages';

export class BaseError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly status: number = 500
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ValidationError extends BaseError {
  constructor(message: string) {
    super(
      message,
      'VALIDATION_ERROR',
      400
    );
  }
}

export class GeminiError extends BaseError {
  constructor(message: string, status: number = 500) {
    super(
      message,
      'GEMINI_ERROR',
      status
    );
  }
}

export class SystemError extends BaseError {
  constructor(message: string = ERROR_MESSAGES.SYSTEM.INTERNAL) {
    super(
      message,
      'SYSTEM_ERROR',
      500
    );
  }
}