describe('ScoreNormalizer', () => {
  const normalizer = new ScoreNormalizer();

  it('normalizes mixed scores', () => {
    const result = normalizer.normalize([1, -1, 2, -2]);
    expect(result).toEqual({
      positive: 0.5,
      negative: 0.5,
      neutral: 0,
      compound: 0
    });
  });

  it('handles all positive scores', () => {
    const result = normalizer.normalize([1, 2]);
    expect(result).toEqual({
      positive: 1,
      negative: 0,
      neutral: 0,
      compound: 1
    });
  });

  it('handles empty scores', () => {
    const result = normalizer.normalize([]);
    expect(result).toEqual({
      positive: 0,
      negative: 0,
      neutral: 1,
      compound: 0
    });
  });
});