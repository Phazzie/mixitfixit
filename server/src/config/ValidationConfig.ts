class ValidationConfig {
  readonly maxLength: number = 1000;
  readonly minLength: number = 1;
  readonly allowedCharacters: RegExp = /^[\w\s.,!?-]+$/;
  
  validate(config: Partial<ValidationConfig>): Result<ValidationConfig> {
    if (config.maxLength && config.maxLength < this.minLength) {
      return failure(new ConfigError('Invalid maxLength'));
    }
    return success({ ...this, ...config });
  }
}