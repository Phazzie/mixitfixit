const { RequestValidator } = require('../../validation/requestValidator');
const { ValidationError } = require('../../errors/validationError');

describe('RequestValidator', () => {
  let validator;

  beforeEach(() => {
    validator = new RequestValidator();
  });

  describe('validateAnalysisRequest', () => {
    test('accepts valid request', () => {
      const body = {
        user1Statement: 'Valid statement 1',
        user2Statement: 'Valid statement 2'
      };

      const result = validator.validateAnalysisRequest(body);

      expect(result).toEqual(body);
    });

    test('rejects missing user1Statement', () => {
      const body = {
        user2Statement: 'Valid statement'
      };

      expect(() => validator.validateAnalysisRequest(body))
        .toThrow(ValidationError);
    });

    test('rejects empty statements', () => {
      const body = {
        user1Statement: '   ',
        user2Statement: 'Valid statement'
      };

      expect(() => validator.validateAnalysisRequest(body))
        .toThrow(ValidationError);
    });

    test('rejects too long statements', () => {
      const body = {
        user1Statement: 'a'.repeat(1001),
        user2Statement: 'Valid statement'
      };

      expect(() => validator.validateAnalysisRequest(body))
        .toThrow(ValidationError);
    });
  });
});