import { ErrorHandlerMiddleware } from '../errorHandler';
import { ValidationError, GeminiError } from '../errors';

describe('ErrorHandlerMiddleware', () => {
  let mockReq: any;
  let mockRes: any;
  let mockNext: jest.Mock;
  let jsonSpy: jest.Mock;
  let statusSpy: jest.Mock;

  beforeEach(() => {
    jsonSpy = jest.fn();
    statusSpy = jest.fn().mockReturnValue({ json: jsonSpy });
    mockReq = {};
    mockRes = { status: statusSpy };
    mockNext = jest.fn();
  });

  it('should handle ValidationError', () => {
    const error = new ValidationError('Invalid input');
    ErrorHandlerMiddleware.handle(error, mockReq, mockRes, mockNext);
    
    expect(statusSpy).toHaveBeenCalledWith(400);
    expect(jsonSpy).toHaveBeenCalledWith({
      error: 'Validation Error',
      message: 'Invalid input'
    });
  });

  it('should handle GeminiError', () => {
    const error = new GeminiError('AI service failed');
    ErrorHandlerMiddleware.handle(error, mockReq, mockRes, mockNext);
    
    expect(statusSpy).toHaveBeenCalledWith(502);
    expect(jsonSpy).toHaveBeenCalledWith({
      error: 'AI Service Error',
      message: 'Failed to process statements'
    });
  });

  it('should handle unknown errors', () => {
    const error = new Error('Unknown error');
    ErrorHandlerMiddleware.handle(error, mockReq, mockRes, mockNext);
    
    expect(statusSpy).toHaveBeenCalledWith(500);
    expect(jsonSpy).toHaveBeenCalledWith({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred'
    });
  });
});