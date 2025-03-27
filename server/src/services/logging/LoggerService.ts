class LoggerService implements ILogger {
  constructor(private readonly loggers: ILogTarget[]) {}

  error(message: string, error: unknown): void {
    const logEntry = this.createLogEntry('ERROR', message, error);
    this.loggers.forEach(logger => logger.log(logEntry));
  }

  private createLogEntry(level: string, message: string, error: unknown): LogEntry {
    return {
      level,
      message,
      timestamp: new Date(),
      error: this.formatError(error)
    };
  }

  private formatError(error: unknown): string {
    if (error instanceof Error) {
      return `${error.name}: ${error.message}\n${error.stack}`;
    }
    return String(error);
  }
}