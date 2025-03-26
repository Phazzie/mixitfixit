// Single Responsibility: Coordinates the sentiment analysis process
export class SentimentAnalyzer implements IAnalyzer {
  constructor(
    private readonly tokenizer: ITokenizer,
    private readonly scoreCalculator: ISentimentScoreCalculator,
    private readonly validator: IInputValidator,
    private readonly logger: ILogger
  ) {}

  async analyze(text: string): Promise<Result<SentimentScore>> {
    const validationResult = this.validator.validate(text);
    if (!validationResult.success) {
      return failure(new ValidationError('Invalid input for sentiment analysis'));
    }

    try {
      const tokens = await this.tokenizer.tokenize(text);
      return this.scoreCalculator.calculate(tokens);
    } catch (error) {
      this.logger.error('Sentiment analysis failed', error);
      return failure(new AnalysisError('Failed to analyze sentiment'));
    }
  }
}