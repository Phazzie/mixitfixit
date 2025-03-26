1 2interface IAIAnalyzer {
    analyze(statement: string): Promise<Analysis>;
    validateResponse(response: unknown): Result<Analysis>;
    getAnalysisMetrics(): AnalysisMetrics;
}

type Analysis = {
    readonly sentiment: Sentiment;
    readonly constructiveness: number;
    readonly suggestions: ReadonlyArray<string>;
};