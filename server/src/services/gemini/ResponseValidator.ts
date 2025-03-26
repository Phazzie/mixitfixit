class ResponseValidator implements IResponseValidator {
  constructor(private readonly schema: IValidationSchema) {}

  validate(response: GenerativeResponse): Result<Analysis> {
    if (!this.hasValidResponse(response)) {
      return failure(new ValidationError('Invalid response structure'));
    }

    const content = this.extractContent(response);
    if (!this.schema.validate(content)) {
      return failure(new ValidationError('Response failed schema validation'));
    }

    return success(this.parseContent(content));
  }

  private hasValidResponse(response: GenerativeResponse): boolean {
    return response?.response?.text !== undefined;
  }

  private extractContent(response: GenerativeResponse): unknown {
    return JSON.parse(response.response.text());
  }

  private parseContent(content: unknown): Analysis {
    return {
      fallacies: this.extractFallacies(content),
      explanation: this.extractExplanation(content),
      confidence: this.extractConfidence(content)
    };
  }

  private extractFallacies(content: any): string[] {
    return content.fallacies || [];
  }

  private extractExplanation(content: any): string {
    return content.explanation || '';
  }

  private extractConfidence(content: any): number {
    return content.confidence || 0;
  }
}


