// Import the GoogleGenerativeAI class from the @google/generative-ai package.
const { GoogleGenerativeAI } = require("@google/generative-ai");
// Load environment variables
const express = require('express')
require('dotenv').config();

/**
 * Creates and exports the Gemini API client.
 * This function initializes the Gemini API client with the API key from the environment variables.
 * @returns {GoogleGenerativeAI} The initialized Gemini API client.
 */
function createGeminiAPIClient() {
  // Get the API Key from the environment variables.
  const apiKey = process.env.GEMINI_API_KEY;
  // Check if the API key is set, if not log an error and return null.
  if (!apiKey) {
    // Updated this function to handle missing or invalid API keys more gracefully.
    // Instead of throwing an error, we log the error and return null.
    console.error("Error: GEMINI_API_KEY environment variable not set.");
    return null;
  }
  // Check if the API key is invalid.
  if (apiKey.trim() === "") {
    // Updated this function to handle missing or invalid API keys more gracefully.
    // Instead of throwing an error, we log the error and return null.
    console.error("Error: GEMINI_API_KEY environment variable is invalid.");
    return null;
  }
  // Initialize the Gemini API client with the key and return it.
  return new GoogleGenerativeAI(apiKey);
}

// Create an express router.
// This router is used to handle the /logcode route.
const router = express.Router()

// Define the route handler to log the code.
router.post('/logcode', (req, res) => {
  const code = req.body.code;
  console.log(code);
  res.status(200).send('Code received and logged.');
});

// Export the createGeminiAPIClient function and the router.
module.exports = { createGeminiAPIClient, router };