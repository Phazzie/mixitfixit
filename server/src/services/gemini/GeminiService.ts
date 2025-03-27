// Single Responsibility: Coordinates analysis operations
export class GeminiService {
  constructor(
    private readonly client: GeminiClient,
    private readonly analyzer: GeminiAnalyzer,
    private readonly validator: InputValidator
  ) {}

  async analyze(input: AnalysisInput): Promise<Result<Analysis>> {
    const validationResult = this.validator.validate(input);
    if (!validationResult.success) return validationResult;

    const model = await this.client.create(input.apiKey);
    if (!model.success) return model;

    return this.analyzer.analyze(model.data, input.statements);
  }
}

