// Single Responsibility: Calculates sentiment scores from tokens
export class SentimentScoreCalculator implements ISentimentScoreCalculator {
  constructor(
    private readonly dictionary: ISentimentDictionary,
    private readonly normalizer: IScoreNormalizer
  ) {}

  calculate(tokens: string[]): Result<SentimentScore> {
    const rawScores = tokens.map(token => this.dictionary.getScore(token));
    const normalized = this.normalizer.normalize(rawScores);
    
    return success({
      positive: normalized.positive,
      negative: normalized.negative,
      neutral: normalized.neutral,
      compound: normalized.compound
    });
  }
}