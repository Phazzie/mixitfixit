/**
 * Loads environment variables from a .env file.
 * This is needed to use variables defined in the .env file.
 */
require('dotenv').config();

/**
 * Imports the express module to create the express application.
 */
const express = require('express');
/**
 * Imports the routes module to handle application routes.
 */
const routes = require('./routes');
/**
 * Imports the Gemini API client creation function.
 */
const { createGeminiAPIClient } = require('./gemini');

/**
 * Creates the express application.
 */
const app = express();
/**
 * Defines the port number the server will listen on.
 */
const port = 3001;



/**
 * Enables the express.json middleware to parse JSON request bodies.
 * This is necessary for handling JSON data sent in requests.
 */
app.use(express.json());

/**
 * Creates the Gemini API client.
 * @returns {object|null} The Gemini API client, or null if creation fails.
 */
const geminiClient = createGeminiAPIClient();
/**
 * Checks if the Gemini API client was created successfully.
 * If the client creation fails, it logs an error and exits the process.
 * @pre The geminiClient should be created.
 */
if (!geminiClient) {
    // If the client is null, log an error to the console.
    console.error('Failed to create Gemini API client. Exiting.');
    // Exit the process.
    process.exit(1);
}

/**
 * Sets up the application routes.
 * This uses the routes defined in the routes.js file and passes the geminiClient.
 * @param {object} app - The express application object.
 * @param {object} geminiClient - The Gemini API client.
 * @post The routes should be added to the app.
 */
routes(app, geminiClient);

/**
 * Starts the server and listens on the specified port.
 * Logs a message to the console when the server starts.
 * @param {number} port - The port number to listen on.
 * @post The server should be running.
 */
app.listen(port, () => {
    // Log to the console when the server starts.
    console.log(`Server listening on port ${port}`);
});