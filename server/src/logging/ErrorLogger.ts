class ErrorLogger {
  constructor(private readonly logger: ILogger) {}

  log(message: string, error: unknown): void {
    this.logger.error(message, error);
  }
}