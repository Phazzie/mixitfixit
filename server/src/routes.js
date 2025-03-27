/**
 * @module routes
 */
/**
 * @external GenerativeModel
 * @see module:@google-ai/generativelanguage
 */
const { validateInput, validateJsonStructure } = require('./validation');
const express = require('express');
/**
 * Sets up the API routes for the Express app.
 *
 * @function module.exports
 * @param {express.Application} app - The Express app instance.
 * @param {object} geminiClient - The Gemini API client instance.
 * @returns {void}
 */
function setupRoutes(app, geminiClient) {
  const model = geminiClient.getGenerativeModel({ model: "gemini-2.0-flash" });
  const router = express.Router(); 

  // This file handles:
  // 1. Route setup
  // 2. Model initialization
  // 3. Request handling
  // 4. Error handling
  // 5. Response formatting
  // 6. Prompt generation
  /**
   * Handles POST requests to /api/ai-summarize.
   * Takes user submitted statements and returns an AI generated summary.
   * Responds with status 400 for bad inputs, 500 for AI errors, 403 for permission errors and 200 for successful requests.
   *
   * @async
   * @function /api/ai-summarize
   * @param {express.Request} req - Express request object
   * @param {express.Response} res - Express response object.
   * @returns {Promise<void>}
   * @throws {Error} Throws an error if there is a problem summarizing the statements.
   * @async
   */
  router.post('/api/ai-summarize', async (req, res) => { 
    /**
     * @type {object}
     * @property {string} user1Statement - The user 1 statement.
     * @property {string} user2Statement - The user 2 statement.
     */
    const { user1Statement, user2Statement } = req.body; 
    const expectedJsonStructure = ['user1Statement', 'user2Statement']; 

    if (!user1Statement || !user2Statement) {
      return res.status(400).json({
        error: "Missing input",
        errorMessage: "Both user1Statement and user2Statement are required."
      });
    }
    if (!validateJsonStructure(req.body, expectedJsonStructure)) {
      return res.status(400).json({
        error: "Invalid request body.",
        errorMessage: `The request body must be a JSON object with 'user1Statement' and 'user2Statement' properties.`
      });
    }
    if (!validateInput(user1Statement)) {
      return res.status(400).json({ error: "Participant 1's statement cannot be empty." }); 
    }

    // Check if the user2Statement is valid (not empty).
    if (!validateInput(user2Statement)) {
      return res.status(400).json({ error: "Participant 2's statement cannot be empty." });
    }

    /**
     * @type {string}
     */
    const prompt = `Analyze these two statements for logical fallacies: Statement 1: ${user1Statement}, Statement 2: ${user2Statement}. If there are any logical fallacies, describe them and explain why they are fallacies.`;
    try {
      const result = await model.generateContent(prompt); 
      if (!result.response) {
        console.error('Gemini API failed to generate a response.', result);
        return res.status(500).json({ error: 'The AI was unable to generate a response to the provided statements.', errorMessage: 'The Gemini API did not return a valid response. Please try again later.', details: result });
      } 
      const aiResponse = result.response.text(); 
      return res.status(200).json({ aiResponse });
    } catch (error) {
       /**
        * @type {object} 
        */
       const genModel = error;
      if (error.details && error.details.length > 0 && error.details[0].metadata && error.details[0].metadata.includes('HarmBlockThreshold')) {
        return res.status(400).json({ error: "The AI rejected one of the statements.", errorMessage: "The AI determined that one of the statements violates the acceptable content policy." });
      }

      if (error.message && error.message.includes('Permission denied')) {
        return res.status(403).json({ error: "Permission denied.", errorMessage: "The API key does not have permission to access the Gemini API. Please check your API key." });
      }

      console.error('Error summarizing statements:', error);
      return res.status(500).json({ error: 'An unexpected error occurred while processing the statements.', errorMessage: error.message });
    }
  }); 
  app.use(router);
};
