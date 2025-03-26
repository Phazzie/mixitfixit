describe('AIAnalyzer', () => {
    const mockValidator = {
        validate: jest.fn()
    };
    const mockMetrics = {
        getMetrics: jest.fn()
    };
    const mockLogger = {
        error: jest.fn()
    };

    const analyzer = new AIAnalyzer(mockValidator, mockMetrics, mockLogger);

    test('should return success result for valid analysis', async () => {
        const content = 'test content';
        const expectedAnalysis = {
            sentiment: 'positive',
            constructiveness: 0.8,
            suggestions: ['suggestion1']
        };

        mockValidator.validate.mockResolvedValue({
            success: true,
            data: expectedAnalysis
        });

        const result = await analyzer.analyze(content);
        
        expect(result.success).toBe(true);
        expect(result.data).toEqual(expectedAnalysis);
    });
});