class ErrorClassifier {
  classify(error: unknown): string {
    if (error instanceof ValidationError) return 'validation';
    if (error instanceof RepositoryError) return 'repository';
    if (error instanceof GeminiError) return 'gemini';
    return 'unknown';
  }
}

class ErrorDetailExtractor {
  extract(error: Error): Record<string, unknown> {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack
    };
  }
}

class ErrorResponseBuilder {
  build(error: Error, type: string): ErrorResponse {
    return {
      type,
      message: error.message,
      timestamp: new Date()
    };
  }
}

class HttpStatusCodeMapper {
  map(errorType: string): number {
    const statusCodes = {
      validation: 400,
      repository: 500,
      gemini: 502,
      unknown: 500
    };
    return statusCodes[errorType] ?? 500;
  }
}
