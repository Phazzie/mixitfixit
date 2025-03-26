// Single Responsibility: Breaks text into analyzable tokens
export class SentimentTokenizer implements ITokenizer {
  constructor(private readonly sanitizer: ITextSanitizer) {}

  async tokenize(text: string): Promise<string[]> {
    const sanitized = this.sanitizer.sanitize(text);
    return sanitized
      .toLowerCase()
      .split(/\s+/)
      .filter(token => token.length > 0);
  }
}