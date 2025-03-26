class GeminiAnalyzer implements IAnalyzer {
  constructor(
    private readonly contentGenerator: IContentGenerator,
    private readonly responseValidator: IResponseValidator,
    private readonly errorHandler: IGeminiErrorHandler
  ) {}

  async analyze(statement1: string, statement2: string): Promise<Result<Analysis>> {
    try {
      const response = await this.contentGenerator.generate(statement1, statement2);
      return this.responseValidator.validate(response);
    } catch (error) {
      return this.errorHandler.handle(error);
    }
  }
}