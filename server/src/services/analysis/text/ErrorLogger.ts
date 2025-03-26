export class ErrorLogger {
  constructor(private readonly logger: ILogger) {}

  logAndReturnError(message: string, error: unknown): Result<never> {
    this.logger.error(message, error);
    return failure(new AnalysisError(message));
  }
}