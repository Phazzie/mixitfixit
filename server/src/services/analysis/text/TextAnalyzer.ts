export class TextAnalyzer {
  constructor(
    private readonly validator: TextValidator,
    private readonly metricsAggregator: TextMetricsAggregator,
    private readonly logger: ErrorLogger
  ) {}

  async analyze(text: string): Promise<Result<TextAnalysis>> {
    const validationResult = this.validator.validate(text);
    if (!validationResult.success) return validationResult;

    try {
      return success({
        content: text,
        metrics: this.metricsAggregator.aggregate(text)
      });
    } catch (error) {
      return this.logger.logAndReturnError('Text analysis failed', error);
    }
  }
}