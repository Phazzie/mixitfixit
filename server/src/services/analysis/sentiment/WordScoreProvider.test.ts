describe('WordScoreProvider', () => {
  const dictionary = new Map([
    ['good', 1],
    ['bad', -1],
    ['HAPPY', 2]
  ]);
  const provider = new WordScoreProvider(dictionary);

  it('returns correct score for lowercase word', () => {
    expect(provider.getScore('good')).toBe(1);
  });

  it('returns correct score for uppercase word', () => {
    expect(provider.getScore('HAPPY')).toBe(2);
  });

  it('returns 0 for unknown word', () => {
    expect(provider.getScore('unknown')).toBe(0);
  });
});