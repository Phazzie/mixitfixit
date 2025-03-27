class DatabaseConfigLoader {
  load(): Result<DatabaseConfig> {
    try {
      return success({
        maxConnections: this.parseMaxConnections(),
        timeout: this.parseTimeout()
      });
    } catch (error) {
      return failure(new ConfigurationError('Failed to load database configuration'));
    }
  }

  private parseMaxConnections(): number {
    return parseInt(process.env.DB_MAX_CONNECTIONS || '20');
  }

  private parseTimeout(): number {
    return parseInt(process.env.DB_TIMEOUT || '5000');
  }
}