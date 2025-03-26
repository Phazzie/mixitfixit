describe('SentimentAnalyzer', () => {
  let analyzer: SentimentAnalyzer;
  let mockTokenizer: jest.Mocked<ITokenizer>;
  let mockScoreCalculator: jest.Mocked<ISentimentScoreCalculator>;
  let mockValidator: jest.Mocked<IInputValidator>;
  let mockLogger: jest.Mocked<ILogger>;

  beforeEach(() => {
    mockTokenizer = {
      tokenize: jest.fn()
    };
    mockScoreCalculator = {
      calculate: jest.fn()
    };
    mockValidator = {
      validate: jest.fn().mockReturnValue(success(true))
    };
    mockLogger = {
      error: jest.fn()
    };

    analyzer = new SentimentAnalyzer(
      mockTokenizer,
      mockScoreCalculator,
      mockValidator,
      mockLogger
    );
  });

  it('should analyze text sentiment successfully', async () => {
    const tokens = ['great', 'product'];
    const expectedScore = {
      positive: 0.8,
      negative: 0,
      neutral: 0.2,
      compound: 0