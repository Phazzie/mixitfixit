// Core analysis interface
interface IAnalyzer {
    analyze(content: string): Promise<Result<Analysis>>;
}

// Separate validation concerns
interface IResponseValidator {
    validate(response: unknown): Result<Analysis>;
}

// Separate metrics concerns
interface IMetricsProvider {
    getMetrics(): AnalysisMetrics;
}
