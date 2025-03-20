// routes.js
// This file defines the API routes for the server.
// It handles requests to summarize user statements using the Gemini API and
// defines how the server interacts with the Gemini API to generate responses.
const { validateInput, validateJsonStructure } = require('./validation');
// Import the express module to create routes.
const express = require('express');

/**
 * @function setupRoutes
 * @description Sets up the API routes for the Express app.
 * This function configures the /api/ai-summarize route, which handles POST requests for summarizing user statements.
 * It also initializes the Gemini generative model instance.
 * @param {object} app - The Express app instance.
 * @param {object} geminiClient - The Gemini API client instance.
 * @returns {void}
 * @preconditions The app must be a valid express app. The geminiClient must be a valid gemini client.
 * @postconditions The app will have the route configured.
 */
function setupRoutes(app, geminiClient) {
  /**
   * @type {import("@google-ai/generativelanguage").GenerativeModel}
   * @description Get the Gemini generative model instance from the client.
   * We are using the gemini-2.0-flash model for this project.
   * It is defined here because we need the gemini client to define it.
   */
  const model = geminiClient.getGenerativeModel({ model: "gemini-2.0-flash" });

  /**
   * @type {express.Router}
   * @description Create a new router object to define the API routes.
   */
  const router = express.Router();

  /**
   * @function /api/ai-summarize
   * @description Handles POST requests to the /api/ai-summarize endpoint.
   * This route is responsible for receiving two user statements, validating them, sending them to the Gemini API for analysis,
   * and returning the AI-generated response to the client.
   * @async
   * @param {express.Request} req - The Express request object.
   * @param {express.Response} res - The Express response object.
   * @returns {Promise<void>}
   * @throws {Error} If there is an error summarizing statements.
   * @preconditions The request body must contain 'user1Statement' and 'user2Statement'.
   * @postconditions If successful, the response body will contain the aiResponse. If not successful, the response body will contain an error message.
   */
  router.post('/api/ai-summarize', async (req, res) => {
    /**
     * @type {object}
     * @property {string} user1Statement - The user 1 statement.
     * @property {string} user2Statement - The user 2 statement.
     * @description Extract the user's statements from the request body.
     * user1Statement and user2Statement will contain the user's text inputs.
     */
    const { user1Statement, user2Statement } = req.body;
    const expectedJsonStructure = ['user1Statement', 'user2Statement'];

    // Check if the required fields are present.
    if (!user1Statement || !user2Statement) {
      return res.status(400).json({
        error: "Missing input",
        errorMessage: "Both user1Statement and user2Statement are required.",
      });
    }
    // Validate that the data has the correct structure.
    if (!validateJsonStructure(req.body, expectedJsonStructure)) {
      return res.status(400).json({
        error: "Invalid request body.",
        errorMessage: `The request body must be a JSON object with 'user1Statement' and 'user2Statement' properties.`,
      });
    }

    // Validate input.
    // Check if the user1Statement is valid (not empty).
    if (!validateInput(user1Statement)) {
      return res.status(400).json({ error: "Participant 1's statement cannot be empty." });
    }

    // Check if the user2Statement is valid (not empty).
    if (!validateInput(user2Statement)) {
      return res.status(400).json({ error: "Participant 2's statement cannot be empty." });
    }
    /**
     * @type {string}
     * @description Construct the prompt for the Gemini API.
     * This prompt instructs the API to analyze the two statements for logical fallacies.
     */
    const prompt = `Analyze these two statements for logical fallacies: Statement 1: ${user1Statement}, Statement 2: ${user2Statement}. If there are any logical fallacies, describe them and explain why they are fallacies.`;

    // Use a try-catch block to handle potential errors during the Gemini API interaction.  
    try {  
      // Send the constructed prompt to the Gemini API and wait for the response.  
      const result = await model.generateContent(prompt);  

      // Check if the Gemini API failed to generate a response.  
      // This could happen if the API is down, the request is malformed, or the model is unable to process the request.  
      // if this occurs then we return a 500 error.  
      if (!result.response) {  
        console.error("Gemini API failed to generate a response.");  
        return res.status(500).json({ error: "The AI was unable to generate a response to the provided statements.", errorMessage: "The Gemini API did not return a valid response. Please try again later." });  
      }  
      // Extract the response object from the result if it exists.  
      const response = result.response;  

      // Extract the text content from the response.  
      // This will contain the AI's analysis of the statements.  
      const aiResponse = response.text();  

      // Send the AI-generated response back to the client as a JSON object.  
      return res.status(200).json({ aiResponse });  
    } catch (error) {  
      // If an error occurs during the API call, handle it here.  
      // Log the error to the console for debugging.  
      console.error("Error summarizing statements:", error);  

        // Handle different types of Gemini API errors.
        if (error.details && error.details.length > 0 && error.details[0].metadata && error.details[0].metadata.includes('HarmBlockThreshold')) {
             return res.status(400).json({ error: "The AI rejected one of the statements.", errorMessage: "The AI determined that one of the statements violates the acceptable content policy." });
        }
        if (error.message && error.message.includes('Permission denied')) {
                return res.status(403).json({ error: "Permission denied.", errorMessage: "The API key does not have permission to access the Gemini API. Please check your API key." });

        }


      // Respond to the client with a 500 Internal Server Error status code and an error message.  
      // The errorMessage field provides more details about the error.  
      return res.status(500).json({ error: "An unexpected error occurred while processing the statements.", errorMessage: error.message });  
    }  
  });  

  // Configure the route for AI summarization  
  app.use(router);  
}

module.exports = setupRoutes;