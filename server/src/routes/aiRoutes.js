const { validateAiRequest } = require('../validators/requestValidator');

function aiRoutes(router, geminiService) {
  router.post('/ai-summarize', async (req, res, next) => {
    try {
      const validatedData = validateAiRequest(req.body);
      const result = await geminiService.analyzeStatements(
        validatedData.user1Statement,
        validatedData.user2Statement
      );
      res.json({ aiResponse: result });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = { aiRoutes };