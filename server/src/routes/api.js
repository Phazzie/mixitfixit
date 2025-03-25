const express = require('express');
const { validateInput } = require('../validation');
const GeminiService = require('../services/geminiService');

const router = express.Router();

/**
 * Sets up API routes
 * @param {object} geminiClient - Initialized Gemini client
 */
const setupApiRoutes = (geminiClient) => {
  const model = geminiClient.getGenerativeModel({ model: "gemini-2.0-flash" });
  const geminiService = new GeminiService(model);

  router.post('/ai-summarize', async (req, res, next) => {
    try {
      const { user1Statement, user2Statement } = validateInput(req.body);
      const analysis = await geminiService.analyzeStatements(
        user1Statement, 
        user2Statement
      );
      res.status(200).json({ aiResponse: analysis });
    } catch (error) {
      next(error);
    }
  });

  return router;
};

module.exports = setupApiRoutes;