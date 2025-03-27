describe('TextSanitizer', () => {
  const sanitizer = new TextSanitizer();

  it('removes special characters', () => {
    expect(sanitizer.sanitize('Hello, World!')).toBe('hello world');
  });

  it('converts to lowercase', () => {
    expect(sanitizer.sanitize('HELLO WORLD')).toBe('hello world');
  });

  it('handles empty string', () => {
    expect(sanitizer.sanitize('')).toBe('');
  });
});