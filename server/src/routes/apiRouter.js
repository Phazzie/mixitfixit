const express = require('express');
const { RequestValidator } = require('../validation/requestValidator');
const { errorMiddleware } = require('../middleware/errorMiddleware');

/**
 * Handles API routing
 */
class ApiRouter {
  /**
   * @param {GeminiService} geminiService - Gemini service instance
   * @param {RequestValidator} validator - Request validator instance
   */
  constructor(geminiService, validator = new RequestValidator()) {
    this.router = express.Router();
    this.geminiService = geminiService;
    this.validator = validator;
    this.setupRoutes();
  }

  /**
   * @private
   */
  setupRoutes() {
    this.router.post('/ai-summarize', this.handleAnalysis.bind(this));
    this.router.use(errorMiddleware);
  }

  /**
   * @private
   */
  async handleAnalysis(req, res, next) {
    try {
      const { user1Statement, user2Statement } = 
        this.validator.validateAnalysisRequest(req.body);

      const analysis = await this.geminiService.analyzeStatements(
        user1Statement,
        user2Statement
      );

      res.status(200).json({ aiResponse: analysis });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Gets the configured router
   * @returns {express.Router}
   */
  getRouter() {
    return this.router;
  }
}

module.exports = { ApiRouter };