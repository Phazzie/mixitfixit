interface ITextAnalyzer {
    analyzeComplexity(text: string): ComplexityScore;
    analyzeTone(text: string): ToneAnalysis;
    extractKeywords(text: string): string[];
}

export class TextAnalyzer implements ITextAnalyzer {
    private readonly complexityAnalyzer: ComplexityAnalyzer;
    private readonly toneAnalyzer: ToneAnalyzer;
    private readonly keywordExtractor: KeywordExtractor;

    constructor(
        complexityAnalyzer: ComplexityAnalyzer,
        toneAnalyzer: ToneAnalyzer,
        keywordExtractor: KeywordExtractor
    ) {
        this.complexityAnalyzer = complexityAnalyzer;
        this.toneAnalyzer = toneAnalyzer;
        this.keywordExtractor = keywordExtractor;
    }

    analyzeComplexity(text: string): ComplexityScore {
        return this.complexityAnalyzer.analyze(text);
    }

    analyzeTone(text: string): ToneAnalysis {
        return this.toneAnalyzer.analyze(text);
    }

    extractKeywords(text: string): string[] {
        return this.keywordExtractor.extract(text);
    }
}