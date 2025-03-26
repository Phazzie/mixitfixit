class ErrorHandlingService {
  constructor(private readonly logger: Logger) {}

  handleApiError(error: unknown): Result<never> {
    this.logger.error('API Error:', error);
    
    if (error instanceof ValidationError) {
      return failure(new ApiError('Validation failed', 400, error));
    }
    if (error instanceof GeminiError) {
      return failure(new ApiError('Gemini service error', 502, error));
    }
    
    return failure(new ApiError('Internal server error', 500, error));
  }

  handleValidationError(error: unknown): Result<never> {
    this.logger.error('Validation Error:', error);
    return failure(new ValidationError('Validation failed', error));
  }

  handleGeminiError(error: unknown): Result<never> {
    this.logger.error('Gemini Error:', error);
    return failure(new GeminiError('Gemini service failed', error));
  }
}