describe('GeminiAnalyzer', () => {
    const mockContentGenerator = {
        generate: jest.fn()
    };
    const mockValidator = {
        validate: jest.fn()
    };
    const mockErrorHandler = {
        handle: jest.fn()
    };

    const analyzer = new GeminiAnalyzer(
        mockContentGenerator,
        mockValidator,
        mockErrorHandler
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return validated analysis for valid content', async () => {
        const content = 'test content';
        const generatedResponse = { text: 'analysis result' };
        const expectedAnalysis = {
            sentiment: 'positive',
            constructiveness: 0.8,
            suggestions: ['suggestion1'],
            confidence: 0.9
        };

        mockContentGenerator.generate.mockResolvedValue(generatedResponse);
        mockValidator.validate.mockReturnValue(success(expectedAnalysis));

        const result = await analyzer.analyze(content);

        expect(result.success).toBe(true);
        expect(result.data).toEqual(expectedAnalysis);
        expect(mockContentGenerator.generate).toHaveBeenCalledWith(content);
        expect(mockValidator.validate).toHaveBeenCalledWith(generatedResponse);
    });

    test('should handle errors during content generation', async () => {
        const error = new Error('Generation failed');
        mockContentGenerator.generate.mockRejectedValue(error);
        mockErrorHandler.handle.mockReturnValue(failure(new GeminiError('API error')));

        const result = await analyzer.analyze('content');

        expect(result.success).toBe(false);
        expect(result.error).toBeInstanceOf(GeminiError);
        expect(mockErrorHandler.handle).toHaveBeenCalledWith(error);
    });
});