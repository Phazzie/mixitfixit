class GeminiService implements IAnalyzer {
  constructor(
    private readonly model: GenerativeModel,
    private readonly validator: IValidator,
    private readonly promptBuilder: IPromptBuilder
  ) {}

  async analyze(statement1: string, statement2: string): Promise<Result<Analysis>> {
    try {
      const prompt = this.promptBuilder.build({ statement1, statement2 });
      const response = await this.model.generateContent(prompt);
      const validatedResponse = this.validator.validate(response);
      
      if (!validatedResponse.success) {
        return failure(validatedResponse.error);
      }

      return success(validatedResponse.data);
    } catch (error) {
      return failure(new GeminiError('Analysis failed', error));
    }
  }
}