class LoggingService implements Logger {
  constructor(private readonly config: LogConfig) {}

  error(message: string, error: unknown): void {
    console.error(this.formatError(message, error));
  }

  info(message: string, data?: unknown): void {
    console.info(this.formatInfo(message, data));
  }

  private formatError(message: string, error: unknown): string {
    return JSON.stringify({
      level: 'ERROR',
      message,
      error: this.serializeError(error),
      timestamp: new Date().toISOString()
    });
  }

  private formatInfo(message: string, data?: unknown): string {
    return JSON.stringify({
      level: 'INFO',
      message,
      data,
      timestamp: new Date().toISOString()
    });
  }

  private serializeError(error: unknown): object {
    if (error instanceof Error) {
      return {
        name: error.name,
        message: error.message,
        stack: this.config.includeStack ? error.stack : undefined
      };
    }
    return { unknown: String(error) };
  }
}