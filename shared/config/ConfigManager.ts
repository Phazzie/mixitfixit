export class ConfigManager {
  private static instance: ConfigManager;
  private config: Record<string, any>;

  private constructor() {
    this.config = {
      api: {
        baseUrl: process.env.API_BASE_URL,
        timeout: 5000
      },
      validation: {
        maxStatementLength: 1000,
        minStatementLength: 10
      },
      phases: {
        order: ['statement', 'resolution', 'summary'],
        timeouts: {
          statement: 300000,
          resolution: 600000,
          summary: 300000
        }
      }
    };
  }

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  get<T>(key: string): T {
    return this.config[key];
  }
}
