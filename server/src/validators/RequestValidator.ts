class RequestValidator {
  constructor(private readonly config: ValidationConfig) {}

  validateStatement(statement: unknown): Result<string> {
    if (!this.isString(statement)) {
      return failure(new ValidationError('Statement must be a string'));
    }

    const trimmed = statement.trim();
    
    if (!this.hasValidLength(trimmed)) {
      return failure(new ValidationError('Invalid statement length'));
    }

    return success(trimmed);
  }

  private isString(value: unknown): value is string {
    return typeof value === 'string';
  }

  private hasValidLength(value: string): boolean {
    return value.length > 0 && value.length <= this.config.maxLength;
  }
}