class ApiConfigValidator {
  validate(config: ApiConfig): Result<void> {
    if (!this.isValidUrl(config.baseUrl)) {
      return failure(new ValidationError('Invalid API URL'));
    }
    if (!this.isValidTimeout(config.timeout)) {
      return failure(new ValidationError('Invalid API timeout'));
    }
    return success(void 0);
  }

  private isValidUrl(url: string): boolean {
    return url.startsWith('http');
  }

  private isValidTimeout(ms: number): boolean {
    return ms > 0 && ms < 30000;
  }
}