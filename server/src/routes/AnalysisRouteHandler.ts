class AnalysisRouteHandler {
  constructor(
    private readonly validator: RequestValidator,
    private readonly geminiService: GeminiService,
    private readonly errorHandler: ErrorHandler
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = await this.validateRequest(req);
      const analysis = await this.performAnalysis(validatedData);
      this.sendResponse(res, analysis);
    } catch (error) {
      this.errorHandler.handleRouteError(error, res);
    }
  }

  private async validateRequest(req: Request): Promise<ValidatedData> {
    const result = await this.validator.validateAnalysisRequest(req.body);
    if (!result.success) {
      throw new ValidationError(result.error);
    }
    return result.data;
  }

  private async performAnalysis(data: ValidatedData): Promise<Analysis> {
    const result = await this.geminiService.analyzeStatements(
      data.user1Statement,
      data.user2Statement
    );
    if (!result.success) {
      throw result.error;
    }
    return result.data;
  }

  private sendResponse(res: Response, analysis: Analysis): void {
    res.status(200).json({ aiResponse: analysis });
  }
}