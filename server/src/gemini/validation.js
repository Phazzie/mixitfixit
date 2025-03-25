/**
 * Validates the Gemini API key
 * @param {string} apiKey - The API key to validate
 * @returns {object} Validation result with status and error message
 */
const validateApiKey = (apiKey) => {
  if (!apiKey) {
    return {
      isValid: false,
      error: "GEMINI_API_KEY environment variable not set"
    };
  }
  
  if (apiKey.trim() === "") {
    return {
      isValid: false,
      error: "GEMINI_API_KEY environment variable is invalid"
    };
  }

  return { isValid: true };
};

module.exports = { validateApiKey };