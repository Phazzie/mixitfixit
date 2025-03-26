export class GeminiErrorHandler implements IGeminiErrorHandler {
    constructor(private readonly logger: ILogger) {}

    handle(error: unknown): Result<never> {
        this.logger.error('Gemini analysis failed', { error });

        if (error instanceof ApiError) {
            return failure(new GeminiError('API error', error));
        }

        if (error instanceof ValidationError) {
            return failure(new GeminiError('Validation failed', error));
        }

        return failure(new GeminiError('Unknown error occurred'));
    }
}