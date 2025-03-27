const { validateApiKey } = require('../../gemini/validation');

describe('validateApiKey', () => {
  test('returns valid for proper API key', () => {
    const result = validateApiKey('valid-key');
    expect(result.isValid).toBe(true);
  });

  test('returns invalid for missing API key', () => {
    const result = validateApiKey(null);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('GEMINI_API_KEY environment variable not set');
  });

  test('returns invalid for empty API key', () => {
    const result = validateApiKey('  ');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('GEMINI_API_KEY environment variable is invalid');
  });
});