// Single Responsibility: Normalizes raw sentiment scores into final metrics
export class ScoreNormalizer implements IScoreNormalizer {
  normalize(scores: number[]): NormalizedScores {
    const total = scores.reduce((sum, score) => sum + Math.abs(score), 0);
    if (total === 0) return { positive: 0, negative: 0, neutral: 1, compound: 0 };

    const positive = scores.filter(s => s > 0).reduce((sum, s) => sum + s, 0) / total;
    const negative = Math.abs(scores.filter(s => s < 0).reduce((sum, s) => sum + s, 0)) / total;
    const neutral = scores.filter(s => s === 0).length / scores.length;

    return {
      positive,
      negative,
      neutral,
      compound: positive - negative
    };
  }
}
