describe('ResponseValidator', () => {
  const validator = new ResponseValidator();

  it('validates successful response', () => {
    const mockResponse = {
      response: { text: () => 'valid response' }
    };
    const result = validator.validate(mockResponse as any);
    expect(result.success).toBe(true);
    expect(result.data).toBe('valid response');
  });

  it('rejects empty response', () => {
    const result = validator.validate({} as any);
    expect(result.success).toBe(false);
    expect(result.error.message).toBe('Empty response from Gemini');
  });
});