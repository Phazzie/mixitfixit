class EnvironmentConfigLoader implements IConfigLoader {
  async loadConfigurations(): Promise<Result<Record<string, unknown>>> {
    try {
      return success({
        api: {
          baseUrl: process.env.API_BASE_URL,
          timeout: parseInt(process.env.API_TIMEOUT || '5000')
        },
        database: {
          maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '20'),
          timeout: parseInt(process.env.DB_TIMEOUT || '5000')
        },
        analysis: {
          maxStatementLength: parseInt(process.env.MAX_STATEMENT_LENGTH || '1000'),
          minStatementLength: parseInt(process.env.MIN_STATEMENT_LENGTH || '10')
        }
      });
    } catch (error) {
      return failure(new ConfigurationError('Failed to load environment configurations'));
    }
  }
}