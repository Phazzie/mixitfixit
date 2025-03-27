class DatabaseConfigValidator {
  validate(config: DatabaseConfig): Result<void> {
    if (!this.isValidConnectionLimit(config.maxConnections)) {
      return failure(new ValidationError('Invalid connection limit'));
    }
    if (!this.isValidTimeout(config.timeout)) {
      return failure(new ValidationError('Invalid database timeout'));
    }
    return success(void 0);
  }

  private isValidConnectionLimit(n: number): boolean {
    return n > 0 && n <= 100;
  }

  private isValidTimeout(ms: number): boolean {
    return ms > 0;
  }
}