const { GeminiError } = require('../errors/apiErrors');

/**
 * Service for handling Gemini API operations
 */
class GeminiService {
  constructor(model) {
    this.model = model;
  }

  /**
   * Analyzes statements for logical fallacies
   * @param {string} statement1 - First statement
   * @param {string} statement2 - Second statement
   * @returns {Promise<string>} Analysis result
   */
  async analyzeStatements(statement1, statement2) {
    const prompt = this.buildPrompt(statement1, statement2);
    
    try {
      const result = await this.model.generateContent(prompt);
      
      if (!result.response) {
        throw new GeminiError('Failed to generate response');
      }
      
      return result.response.text();
    } catch (error) {
      this.handleGeminiError(error);
    }
  }

  /**
   * Builds the analysis prompt
   * @private
   */
  buildPrompt(statement1, statement2) {
    return `Analyze these two statements for logical fallacies: ` +
           `Statement 1: ${statement1}, Statement 2: ${statement2}. ` +
           `If there are any logical fallacies, describe them and explain why they are fallacies.`;
  }

  /**
   * Handles Gemini-specific errors
   * @private
   */
  handleGeminiError(error) {
    if (error.details?.[0]?.metadata?.includes('HarmBlockThreshold')) {
      throw new GeminiError('Content policy violation', 400);
    }
    if (error.message?.includes('Permission denied')) {
      throw new GeminiError('API permission denied', 403);
    }
    throw new GeminiError('Gemini API error', 500);
  }
}

module.exports = GeminiService;



