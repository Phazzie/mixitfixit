class ContentGenerator {
  constructor(
    private readonly model: GenerativeModel,
    private readonly promptBuilder: PromptBuilder
  ) {}

  async generate(statement1: string, statement2: string): Promise<GenerativeResponse> {
    const prompt = this.promptBuilder.build(statement1, statement2);
    return this.model.generateContent(prompt);
  }
}