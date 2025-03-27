/**
 * Builds prompts for Gemini API
 */
class PromptBuilder {
  /**
   * Builds analysis prompt for statements
   * @param {string} statement1 - First statement
   * @param {string} statement2 - Second statement
   * @returns {string} Formatted prompt
   */
  buildAnalysisPrompt(statement1, statement2) {
    return [
      'Analyze these two statements for logical fallacies:',
      `Statement 1: ${statement1}`,
      `Statement 2: ${statement2}`,
      'If there are any logical fallacies, describe them and explain why they are fallacies.'
    ].join('\n');
  }
}

module.exports = { PromptBuilder };