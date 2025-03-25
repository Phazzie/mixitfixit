const { ErrorHandler } = require('../../utils/errorHandler');
const { GeminiError } = require('../../errors/apiErrors');

describe('ErrorHandler', () => {
  let errorHandler;

  beforeEach(() => {
    errorHandler = new ErrorHandler();
  });

  test('handles content policy violation', () => {
    const error = {
      details: [{ metadata: 'HarmBlockThreshold' }]
    };

    const result = errorHandler.handleError(error);

    expect(result).toBeInstanceOf(GeminiError);
    expect(result.message).toBe('Content policy violation');
    expect(result.status).toBe(400);
  });

  test('handles permission denied', () => {
    const error = {
      message: 'Permission denied'
    };

    const result = errorHandler.handleError(error);

    expect(result).toBeInstanceOf(GeminiError);
    expect(result.message).toBe('API permission denied');
    expect(result.status).toBe(403);
  });

  test('handles unknown errors', () => {
    const error = new Error('Unknown error');

    const result = errorHandler.handleError(error);

    expect(result).toBeInstanceOf(GeminiError);
    expect(result.message).toBe('Gemini API error');
    expect(result.status).toBe(500);
  });

  test('passes through GeminiError', () => {
    const originalError = new GeminiError('Original error', 418);

    const result = errorHandler.handleError(originalError);

    expect(result).toBe(originalError);
  });
});