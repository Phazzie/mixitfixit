describe('ApiKeyValidator', () => {
  const validator = new ApiKeyValidator();

  it('validates correct API key', () => {
    const result = validator.validate('a'.repeat(32));
    expect(result.success).toBe(true);
  });

  it('rejects empty API key', () => {
    const result = validator.validate('');
    expect(result.success).toBe(false);
    expect(result.error.message).toBe('API key cannot be empty');
  });

  it('rejects short API key', () => {
    const result = validator.validate('short');
    expect(result.success).toBe(false);
    expect(result.error.message).toBe('Invalid API key format');
  });
});