class GeminiErrorHandler {
  handle(error: unknown): Result<never> {
    if (this.isContentPolicyViolation(error)) {
      return failure(new GeminiError('Content policy violation', 400));
    }

    if (this.isPermissionDenied(error)) {
      return failure(new GeminiError('API permission denied', 403));
    }

    return failure(new GeminiError('Gemini API error', 500));
  }

  private isContentPolicyViolation(error: unknown): boolean {
    return (error as any)?.details?.[0]?.metadata?.includes('HarmBlockThreshold') ?? false;
  }

  private isPermissionDenied(error: unknown): boolean {
    return (error as any)?.message?.includes('Permission denied') ?? false;
  }
}
