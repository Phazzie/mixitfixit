class ResponseValidator {
  validate(response: GenerativeResponse): Result<Analysis> {
    if (!this.hasValidResponse(response)) {
      return failure(new ValidationError('Invalid response structure'));
    }

    const text = response.response.text();
    if (!this.isValidAnalysis(text)) {
      return failure(new ValidationError('Invalid analysis content'));
    }

    return success(this.parseAnalysis(text));
  }

  private hasValidResponse(response: unknown): response is GenerativeResponse {
    return response?.response?.text !== undefined;
  }

  private isValidAnalysis(text: string): boolean {
    return text.length > 0 && text.includes('analysis');
  }

  private parseAnalysis(text: string): Analysis {
    // Parse and structure the analysis
    return {
      content: text,
      timestamp: new Date()
    };
  }
}