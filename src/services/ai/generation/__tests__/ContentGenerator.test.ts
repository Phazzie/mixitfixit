describe('ContentGenerator', () => {
    const mockModel = {
        generateContent: jest.fn()
    };
    const mockPromptBuilder = {
        build: jest.fn()
    };
    const mockRateLimiter = {
        canProceed: jest.fn()
    };
    const mockLogger = {
        error: jest.fn()
    };

    const generator = new ContentGenerator(
        mockModel,
        mockPromptBuilder,
        mockRateLimiter,
        mockLogger
    );

    beforeEach(() => {
        jest.clearAllMocks();
        mockRateLimiter.canProceed.mockReturnValue(true);
    });

    test('should generate content successfully', async () => {
        const templateId = 'statementAnalysis';
        const params = { statement: 'test statement' };
        const prompt = 'built prompt';
        const expectedResponse = { text: 'generated content' };

        mockPromptBuilder.build.mockReturnValue(success(prompt));
        mockModel.generateContent.mockResolvedValue(expectedResponse);

        const result = await generator.generate(templateId, params);

        expect(result.success).toBe(true);
        expect(result.data).toEqual(expectedResponse);
        expect(mockPromptBuilder.build).toHaveBeenCalledWith(templateId, params);
        expect(mockModel.generateContent).toHaveBeenCalled();
    });

    test('should handle rate limiting', async () => {
        mockRateLimiter.canProceed.mockReturnValue(false);

        const result = await generator.generate('templateId', {});

        expect(result.success).toBe(false);
        expect(result.error).toBeInstanceOf(RateLimitError);
        expect(mockModel.generateContent).not.toHaveBeenCalled();
    });
});