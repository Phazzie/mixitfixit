interface RawStatement {
  content: string;
  userId: string;
  timestamp: Date;
}

interface Restatement {
  originalStatement: RawStatement;
  restatement: string;
  userId: string;
}

class StatementAnalyzer {
  constructor(
    private readonly aiClient: GeminiClient,
    private readonly logger: ILogger
  ) {}

  async analyzeRestatement(context: Restatement): Promise<AIFeedback> {
    const prompt = `
      Original statement: "${context.originalStatement.content}"
      Their restatement: "${context.restatement}"

      Focus ONLY on whether the restatement captures the main point(s).
      Ignore tone/format. They don't need to use formal language.

      Return JSON with:
      {
        "understood": boolean,
        "missedPoints": string[],
        "needsClarification": boolean
      }
    `;

    try {
      const response = await this.aiClient.generateContent(prompt);
      return this.parseResponse(response);
    } catch (error) {
      this.logger.error('Statement analysis failed', { error, context });
      return {
        understood: false,
        missedPoints: [],
        needsClarification: true
      };
    }
  }
}