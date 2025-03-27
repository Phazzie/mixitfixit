describe('TextAnalyzer', () => {
  let analyzer: TextAnalyzer;
  let mockValidator: jest.Mocked<IValidator>;
  let mockLogger: jest.Mocked<ILogger>;

  beforeEach(() => {
    mockValidator = {
      validate: jest.fn().mockReturnValue(true)
    };
    mockLogger = {
      error: jest.fn()
    };
    analyzer = new TextAnalyzer(mockValidator, mockLogger);
  });

  it('should analyze valid text successfully', async () => {
    const result = await analyzer.analyze('Sample text.');
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.metrics.length).toBe(11);
      expect(result.data.metrics.complexity).toBe(1);
    }
  });

  it('should fail for invalid input', async () => {
    mockValidator.validate.mockReturnValue(false);
    const result = await analyzer.analyze('');
    expect(result.success).toBe(false);
  });
});