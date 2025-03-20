// Import the GoogleGenerativeAI class from the @google/generative-ai package.
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Load environment variables
const express = require('express')
require('dotenv').config();

/**
 * @module gemini
 * @description This module provides functions to interact with the Google Gemini API.
 */

/**
 * Creates and exports the Gemini API client.
 * This function initializes the Gemini API client with the API key from the environment variables.
 * @function createGeminiAPIClient
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

/**
 * @constant {express.Router} router
 * @description An Express router instance for handling API routes.
 */
const router = express.Router()

/**
 * @function
 * @name logCodeRoute
 * @memberof module:gemini
 * @description Defines the route handler to log the code.
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @param {string} req.body.code - The code to be logged.
 * @returns {void}
 * @precondition The request body must contain a 'code' property.
 * @postcondition The code received is logged to the console, and a 200 status response is sent.
 */
router.post('/logcode', (req, res) => {
  /**
   * @type {string}
   * @description The code received in the request body.
   */
  const code = req.body.code;
  console.log(code);
  res.status(200).send('Code received and logged.');
});

// Export the createGeminiAPIClient function and the router.
module.exports = { createGeminiAPIClient, router };