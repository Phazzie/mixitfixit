export class ResponseValidator implements IResponseValidator {
    constructor(private readonly schema: IValidationSchema) {}

    validate(response: unknown): Result<Analysis> {
        if (!this.isValidResponse(response)) {
            return failure(new ValidationError('Invalid response structure'));
        }

        const content = this.extractContent(response);
        if (!this.schema.validate(content)) {
            return failure(new ValidationError('Response failed schema validation'));
        }

        return success(this.parseAnalysis(content));
    }

    private isValidResponse(response: unknown): boolean {
        return response !== null && 
               typeof response === 'object' && 
               'text' in response;
    }

    private parseAnalysis(content: unknown): Analysis {
        // Implementation of parsing logic
        return {
            sentiment: this.parseSentiment(content),
            constructiveness: this.parseConstructiveness(content),
            suggestions: this.parseSuggestions(content),
            confidence: this.parseConfidence(content)
        };
    }
}