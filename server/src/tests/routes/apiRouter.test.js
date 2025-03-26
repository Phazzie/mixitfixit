const request = require('supertest');
const express = require('express');
const { ApiRouter } = require('../../routes/apiRouter');
const { RequestValidator } = require('../../validation/requestValidator');
const { GeminiService } = require('../../services/geminiService');

describe('ApiRouter', () => {
  let app;
  let mockGeminiService;
  let mockValidator;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    mockGeminiService = {
      analyzeStatements: jest.fn()
    };

    mockValidator = {
      validateAnalysisRequest: jest.fn()
    };

    const apiRouter = new ApiRouter(mockGeminiService, mockValidator);
    app.use('/api', apiRouter.getRouter());
  });

  describe('POST /api/ai-summarize', () => {
    const validBody = {
      user1Statement: 'Statement 1',
      user2Statement: 'Statement 2'
    };

    test('handles successful analysis', async () => {
      mockValidator.validateAnalysisRequest.mockReturnValue(validBody);
      mockGeminiService.analyzeStatements.mockResolvedValue('Analysis result');

      const response = await request(app)
        .post('/api/ai-summarize')
        .send(validBody);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        aiResponse: 'Analysis result'
      });
    });

    test('handles validation errors', async () => {
      mockValidator.validateAnalysisRequest.mockImplementation(() => {
        throw new ValidationError('Invalid input');
      });

      const response = await request(app)
        .post('/api/ai-summarize')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation Error');
    });

    test('handles service errors', async () => {
      mockValidator.validateAnalysisRequest.mockReturnValue(validBody);
      mockGeminiService.analyzeStatements.mockRejectedValue(
        new Error('Service error')
      );

      const response = await request(app)
        .post('/api/ai-summarize')
        .send(validBody);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Internal Server Error');
    });
  });
});