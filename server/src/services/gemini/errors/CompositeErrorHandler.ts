class CompositeErrorHandler implements IErrorHandler {
  constructor(private readonly handlers: IErrorHandler[]) {}

  handle(error: unknown): Result<never> {
    const handler = this.handlers.find(h => h.canHandle(error));
    if (handler) {
      return handler.handle(error);
    }
    return failure(new UnhandledError('Unhandled error occurred'));
  }
}