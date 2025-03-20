// Load environment variables from .env file. This is needed to be able to use the .env file variables
require('dotenv').config();

// Import express to create the express app
const express = require('express');
// Import routes to handle the different routes in the app
const routes = require('./routes');
// Import the gemini functions to use the gemini api
const { createGeminiAPIClient } = require('./gemini');

// Create the express app
const app = express();
// Define the port the server will listen on.
const port = 3001;



// Enable express.json middleware to parse JSON bodies. This is needed to be able to use the request body.
app.use(express.json());

// Create the Gemini client.
const geminiClient = createGeminiAPIClient();
// Check if the gemini client was created properly.
if (!geminiClient) {
    // If the client is null, log an error to the console.
    console.error('Failed to create Gemini API client. Exiting.');
    // Exit the process.
    process.exit(1);
}

// Set up the routes.
// This uses the routes from the routes.js file.
// This also passes the geminiClient so the routes.js file can use it.
routes(app, geminiClient);

// Start the server and listen to the defined port.
app.listen(port, () => {
  // Log to the console when the server starts.
  console.log(`Server listening on port ${port}`);
});