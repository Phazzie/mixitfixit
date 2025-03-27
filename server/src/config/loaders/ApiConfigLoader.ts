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

// Tests for ApiConfigLoader
describe('ApiConfigLoader', () => {
  let apiConfigLoader: ApiConfigLoader;

  beforeEach(() => {
    apiConfigLoader = new ApiConfigLoader();
  });

  it('should load API configuration successfully', () => {
    process.env.API_BASE_URL = 'http://example.com';
    process.env.API_TIMEOUT = '5000';

    const result = apiConfigLoader.load();

    expect(result.success).toBe(true);
    expect(result.data).toEqual({
      baseUrl: 'http://example.com',
      timeout: 5000
    });
  });

  it('should handle errors when loading API configuration', () => {
    process.env.API_BASE_URL = undefined;
    process.env.API_TIMEOUT = undefined;

    const result = apiConfigLoader.load();

    expect(result.success).toBe(false);
    expect(result.error).toBeInstanceOf(ConfigurationError);
    expect(result.error.message).toBe('Failed to load API configuration');
  });
});
