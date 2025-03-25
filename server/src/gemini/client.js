const { GoogleGenerativeAI } = require("@google/generative-ai");
const { validateApiKey } = require('./validation');

/**
 * Creates a Gemini API client
 * @param {string} apiKey - The API key for Gemini
 * @returns {GoogleGenerativeAI|null} The initialized client or null if invalid
 */
const createClient = (apiKey) => {
  const validation = validateApiKey(apiKey);
  
  if (!validation.isValid) {
    console.error(`Error: ${validation.error}`);
    return null;
  }
  
  return new GoogleGenerativeAI(apiKey);
};

module.exports = { createClient };