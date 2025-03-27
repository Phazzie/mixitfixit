class StatementValidator implements IValidator {
  validate(data: unknown, context: ValidationContext): Result<void> {
    if (typeof data !== 'string') {
      return failure(new ValidationError('Statement must be a string'));
    }
    if (data.length === 0) {
      return failure(new ValidationError('Statement cannot be empty'));
    }
    if (data.length > context.maxLength) {
      return failure(new ValidationError(`Statement exceeds maximum length of ${context.maxLength}`));
    }
    return success(void 0);
  }
}