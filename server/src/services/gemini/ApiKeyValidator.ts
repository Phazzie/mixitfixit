export class ApiKeyValidator {
  validate(apiKey: string): Result<void> {
    if (!apiKey?.trim()) {
      return failure(new ValidationError('API key cannot be empty'));
    }
    if (apiKey.length < 32) {
      return failure(new ValidationError('Invalid API key format'));
    }
    return success(void 0);
  }
}