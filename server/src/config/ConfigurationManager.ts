class ConfigurationManager implements IConfigurationManager {
  private readonly configurations: Map<string, unknown>;

  constructor(
    private readonly configLoader: IConfigLoader,
    private readonly validator: IConfigValidator,
    private readonly logger: ILogger
  ) {
    this.configurations = new Map();
  }

  async load(): Promise<Result<void>> {
    try {
      const configs = await this.configLoader.loadConfigurations();
      const validationResult = this.validator.validate(configs);
      
      if (!validationResult.success) {
        return failure(new ConfigurationError('Invalid configuration'));
      }

      this.updateConfigurations(configs);
      return success(void 0);
    } catch (error) {
      this.logger.error('Failed to load configurations', error);
      return failure(new ConfigurationError('Failed to load configurations'));
    }
  }

  get<T>(key: string): Result<T> {
    const config = this.configurations.get(key);
    if (!config) {
      return failure(new ConfigurationError(`Configuration not found: ${key}`));
    }
    return success(config as T);
  }

  private updateConfigurations(configs: Record<string, unknown>): void {
    Object.entries(configs).forEach(([key, value]) => {
      this.configurations.set(key, value);
    });
  }
}