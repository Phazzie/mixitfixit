class TestContainer implements IContainer {
  private readonly services: Map<string, unknown>;

  constructor() {
    this.services = new Map();
    this.registerDefaults();
  }

  get<T>(key: string): T {
    const service = this.services.get(key);
    if (!service) {
      throw new Error(`Service not found: ${key}`);
    }
    return service as T;
  }

  register<T>(key: string, service: T): void {
    this.services.set(key, service);
  }

  private registerDefaults(): void {
    this.register('logger', new MockLogger());
    this.register('dataSource', new InMemoryDataSource());
    this.register('configLoader', new MockConfigLoader());
  }
}