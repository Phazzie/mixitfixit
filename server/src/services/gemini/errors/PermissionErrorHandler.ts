class PermissionErrorHandler implements IErrorHandler {
  constructor(private readonly logger: ILogger) {}

  canHandle(error: unknown): boolean {
    return this.isPermissionError(error);
  }

  handle(error: unknown): Result<never> {
    this.logger.error('Permission denied', error);
    return failure(new PermissionError('API access denied'));
  }

  private isPermissionError(error: unknown): boolean {
    return error?.message?.includes('Permission denied') ?? false;
  }
}
