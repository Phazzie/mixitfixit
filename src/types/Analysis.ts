export type Analysis = {
    readonly sentiment: Sentiment;
    readonly constructiveness: number;
    readonly suggestions: ReadonlyArray<string>;
    readonly confidence: number;
};

export type Sentiment = 'positive' | 'negative' | 'neutral';

export type AnalysisMetrics = {
    readonly requestCount: number;
    readonly averageLatency: number;
    readonly successRate: number;
};