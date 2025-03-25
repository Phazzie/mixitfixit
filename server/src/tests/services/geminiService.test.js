const GeminiService = require('../../services/geminiService');
const { PromptBuilder } = require('../../utils/promptBuilder');
const { ErrorHandler } = require('../../utils/errorHandler');
const { GeminiError } = require('../../errors/apiErrors');

describe('GeminiService', () => {
  let mockModel;
  let mockPromptBuilder;
  let mockErrorHandler;
  let service;

  beforeEach(() => {
    mockModel = {
      generateContent: jest.fn()
    };
    mockPromptBuilder = {
      buildAnalysisPrompt: jest.fn().mockReturnValue('mock prompt')
    };
    mockErrorHandler = {
      handleError: jest.fn(error => error)
    };
    service = new GeminiService(mockModel, mockPromptBuilder, mockErrorHandler);
  });

  describe('analyzeStatements', () => {
    test('successfully analyzes valid statements', async () => {
      const mockResponse = { response: { text: () => 'Analysis result' } };
      mockModel.generateContent.mockResolvedValue(mockResponse);

      const result = await service.analyzeStatements('statement1', 'statement2');

      expect(mockPromptBuilder.buildAnalysisPrompt).toHaveBeenCalledWith('statement1', 'statement2');
      expect(mockModel.generateContent).toHaveBeenCalledWith('mock prompt');
      expect(result).toBe('Analysis result');
    });

    test('validates input statements', async () => {
      await expect(service.analyzeStatements('', 'statement2'))
        .rejects
        .toThrow(GeminiError);

      await expect(service.analyzeStatements('statement1', '  '))
        .rejects
        .toThrow(GeminiError);
    });

    test('handles null response', async () => {
      mockModel.generateContent.mockResolvedValue({ response: null });

      await expect(service.analyzeStatements('statement1', 'statement2'))
        .rejects
        .toThrow(GeminiError);
    });

    test('uses error handler for API errors', async () => {
      const apiError = new Error('API Error');
      mockModel.generateContent.mockRejectedValue(apiError);

      await service.analyzeStatements('statement1', 'statement2').catch(() => {});

      expect(mockErrorHandler.handleError).toHaveBeenCalledWith(apiError);
    });
  });
});
