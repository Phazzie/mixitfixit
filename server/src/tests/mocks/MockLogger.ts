class MockLogger implements ILogger {
  private logs: Array<{level: string, message: string, error?: unknown}> = [];

  error(message: string, error?: unknown): void {
    this.logs.push({ level: 'ERROR', message, error });
  }

  info(message: string): void {
    this.logs.push({ level: 'INFO', message });
  }

  getLogs(): Array<{level: string, message: string, error?: unknown}> {
    return this.logs;
  }

  clear(): void {
    this.logs = [];
  }
}