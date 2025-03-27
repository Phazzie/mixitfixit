describe('WordTokenizer', () => {
  const tokenizer = new WordTokenizer();

  it('splits text into words', () => {
    expect(tokenizer.tokenize('hello world')).toEqual(['hello', 'world']);
  });

  it('handles multiple spaces', () => {
    expect(tokenizer.tokenize('hello    world')).toEqual(['hello', 'world']);
  });

  it('returns empty array for empty string', () => {
    expect(tokenizer.tokenize('')).toEqual([]);
  });
});