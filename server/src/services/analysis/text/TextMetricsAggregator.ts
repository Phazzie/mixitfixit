export class TextMetricsAggregator {
  constructor(
    private readonly lengthCalculator: TextLengthCalculator,
    private readonly complexityCalculator: ComplexityCalculator
  ) {}

  aggregate(text: string): TextMetrics {
    return {
      length: this.lengthCalculator.calculate(text),
      complexity: this.complexityCalculator.calculate(text)
    };
  }
}