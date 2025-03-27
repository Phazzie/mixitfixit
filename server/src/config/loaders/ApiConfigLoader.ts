class ApiConfigLoader {
  load(): Result<ApiConfig> {
    try {
      return success({
        baseUrl: process.env.API_BASE_URL,
        timeout: this.parseTimeout()
      });
    } catch (error) {
      return failure(new ConfigurationError('Failed to load API configuration'));
    }
  }

  private parseTimeout(): number {
    return parseInt(process.env.API_TIMEOUT || '5000');
  }
}