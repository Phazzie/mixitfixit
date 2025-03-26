export class ErrorHandler {
  private static readonly errorMap = new Map<string, (error: Error) => void>([
    ['ValidationError', (error) => logger.error('Validation failed', error)],
    ['ApiError', (error) => logger.error('API request failed', error)],
    ['GeminiError', (error) => logger.error('Gemini operation failed', error)]
  ]);

  static handle(error: Error): void {
    const handler = this.errorMap.get(error.constructor.name);
    if (handler) {
      handler(error);
    } else {
      logger.error('Unhandled error', error);
    }
  }
}