abstract class TestBase {
  protected readonly container: IContainer;

  constructor() {
    this.container = new TestContainer();
  }

  protected async arrange(): Promise<void> {
    await this.setupTestData();
  }

  protected async cleanup(): Promise<void> {
    await this.cleanupTestData();
  }

  protected abstract setupTestData(): Promise<void>;
  protected abstract cleanupTestData(): Promise<void>;
}