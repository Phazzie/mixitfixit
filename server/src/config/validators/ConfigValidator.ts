class ConfigValidator implements IConfigValidator {
  validate(config: unknown): Result<void> {
    const validationRules = {
      api: {
        baseUrl: (url: string) => url.startsWith('http'),
        timeout: (ms: number) => ms > 0 && ms < 30000
      },
      database: {
        maxConnections: (n: number) => n > 0 && n <= 100,
        timeout: (ms: number) => ms > 0
      },
      analysis: {
        maxStatementLength: (n: number) => n > 0 && n <= 2000,
        minStatementLength: (n: number) => n > 0
      }
    };

    try {
      this.validateStructure(config as Record<string, unknown>, validationRules);
      return success(void 0);
    } catch (error) {
      return failure(new ValidationError(error.message));
    }
  }

  private validateStructure(config: Record<string, unknown>, rules: object): void {
    // Implementation of deep validation logic
  }
}