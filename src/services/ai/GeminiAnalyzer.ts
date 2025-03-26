export class GeminiAnalyzer implements IAnalyzer {
    constructor(
        private readonly contentGenerator: IContentGenerator,
        private readonly responseValidator: IResponseValidator,
        private readonly errorHandler: IGeminiErrorHandler
    ) {}

    async analyze(content: string): Promise<Result<Analysis>> {
        try {
            const response = await this.contentGenerator.generate(content);
            return this.responseValidator.validate(response);
        } catch (error) {
            return this.errorHandler.handle(error);
        }
    }
}