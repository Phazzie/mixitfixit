class GeminiErrorHandler {
  handle(error: unknown): Result<never> {
    if (this.isHarmBlockError(error)) {
      return failure(new GeminiError('Content policy violation', 400));
    }
    if (this.isPermissionError(error)) {
      return failure(new GeminiError('API permission denied', 403));
    }
    return failure(new GeminiError('Gemini API error', 500));
  }

  private isHarmBlockError(error: unknown): boolean {
    return error?.details?.[0]?.metadata?.includes('HarmBlockThreshold') ?? false;
  }

  private isPermissionError(error: unknown): boolean {
    return error?.message?.includes('Permission denied') ?? false;
  }
}