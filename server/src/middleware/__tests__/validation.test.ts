import { ValidationMiddleware } from '../validation';
import { ValidationError } from '../errors';

describe('ValidationMiddleware', () => {
  let mockReq: any;
  let mockRes: any;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockReq = {
      body: {}
    };
    mockRes = {};
    mockNext = jest.fn();
  });

  it('should validate valid statements', () => {
    mockReq.body = {
      user1Statement: 'Valid statement 1',
      user2Statement: 'Valid statement 2'
    };

    ValidationMiddleware.validateStatements(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalledWith();
    expect(mockReq.validatedData).toBeDefined();
  });

  it('should reject empty statements', () => {
    mockReq.body = {
      user1Statement: '',
      user2Statement: 'Valid'
    };

    ValidationMiddleware.validateStatements(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalledWith(expect.any(ValidationError));
  });

  it('should reject too long statements', () => {
    mockReq.body = {
      user1Statement: 'a'.repeat(1001),
      user2Statement: 'Valid'
    };

    ValidationMiddleware.validateStatements(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalledWith(expect.any(ValidationError));
  });
});