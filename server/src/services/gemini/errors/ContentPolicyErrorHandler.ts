class ContentPolicyErrorHandler implements IErrorHandler {
  constructor(private readonly logger: ILogger) {}

  canHandle(error: unknown): boolean {
    return this.isHarmBlockError(error);
  }

  handle(error: unknown): Result<never> {
    this.logger.error('Content policy violation', error);
    return failure(new ContentPolicyError('Content violates safety policy'));
  }

  private isHarmBlockError(error: unknown): boolean {
    return error?.details?.[0]?.metadata?.includes('HarmBlockThreshold') ?? false;
  }
}
