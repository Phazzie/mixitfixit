class InfoLogger {
  constructor(private readonly logger: ILogger) {}

  log(message: string): void {
    this.logger.info(message);
  }
}