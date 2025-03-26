class ValidationService {
  constructor(private readonly config: ValidationConfig) {}

  validateApiKey(key: string): Result<void> {
    if (!this.isValidApiKeyFormat(key)) {
      return failure(new ValidationError('Invalid API key format'));
    }
    return success(void 0);
  }

  validateStatements(statement1: string, statement2: string): Result<void> {
    const results = [statement1, statement2].map(this.validateStatement);
    const errors = results.filter(r => !r.success);
    
    if (errors.length > 0) {
      return failure(new ValidationError('Invalid statements'));
    }
    return success(void 0);
  }

  private validateStatement(statement: string): Result<void> {
    if (!this.meetsLengthRequirements(statement)) {
      return failure(new ValidationError('Statement length invalid'));
    }
    if (!this.hasValidCharacters(statement)) {
      return failure(new ValidationError('Statement contains invalid characters'));
    }
    return success(void 0);
  }

  private meetsLengthRequirements(text: string): boolean {
    const length = text.trim().length;
    return length >= this.config.minLength && length <= this.config.maxLength;
  }

  private hasValidCharacters(text: string): boolean {
    return this.config.allowedCharacters.test(text);
  }

  private isValidApiKeyFormat(key: string): boolean {
    return /^[A-Za-z0-9-_]{39}$/.test(key);
  }
}