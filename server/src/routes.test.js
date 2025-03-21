/**
 * @fileoverview Test suite for the API routes.
 */
const request = require('supertest');
const express = require('express');
const routes = require('./routes');

/**
 * @global
 * @description Mock Gemini API object for testing purposes.
 */
global.geminiAPI = {
  generateContent: jest.fn().mockResolvedValue({
    response: {
      text: 'Mock AI Response'
    }
  })
}; 

const app = express();
app.use(express.json());
app.use('/', routes);

describe('POST /api/ai-summarize', () => {
  it('should return a 200 status code and a response when the request is correct', async () => {
    const response = await request(app)
      /**
       * @function post
       * @description Sends a POST request to the /api/ai-summarize endpoint with valid data.
       * @async
       * @param {object} send - The data to be sent in the request body.
       * @param {string} send.user1Statement - The statement from user 1.
       * @param {string} send.user2Statement - The statement from user 2.
       * @returns {Promise<object>} The response from the server.
       * @throws {Error} If there is an error sending the request.
       * @preconditions user1Statement and user2Statement should not be empty.
       * @postconditions The response status code should be 200 and the response body should have a summary property.
       */
      .post('/api/ai-summarize')
      .send({
        user1Statement: 'User 1 statement',
        user2Statement: 'User 2 statement',
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('summary');
    expect(response.body.summary).toBe('Mock AI Response');
  });

  /**
   * @function post
   * @description Sends a POST request to the /api/ai-summarize endpoint with missing user1Statement.
   * @async
   * @param {object} send - The data to be sent in the request body.
   * @param {string} send.user2Statement - The statement from user 2.
   * @returns {Promise<object>} The response from the server.
   * @throws {Error} If there is an error sending the request.
   * @preconditions user2Statement should not be empty.
   * @postconditions The response status code should be 400 and the response body should have an error property.
   */
  it('should return a 400 error code when user1Statement is missing', async () => {
    const response = await request(app)
      .post('/api/ai-summarize')
      .send({
        user2Statement: 'User 2 statement',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.errorMessage).toBe('Both user1Statement and user2Statement are required.');
  });

  /**
   * @function post
   * @description Sends a POST request to the /api/ai-summarize endpoint with missing user2Statement.
   * @async
   * @param {object} send - The data to be sent in the request body.
   * @param {string} send.user1Statement - The statement from user 1.
   * @returns {Promise<object>} The response from the server.
   * @throws {Error} If there is an error sending the request.
   * @preconditions user1Statement should not be empty.
   * @postconditions The response status code should be 400 and the response body should have an error property.
   */
  it('should return a 400 error code when user2Statement is missing', async () => {
    const response = await request(app)
      .post('/api/ai-summarize')
      .send({
        user1Statement: 'User 1 statement',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.errorMessage).toBe('Both user1Statement and user2Statement are required.');
  });

  it('should return a 400 error code when user1Statement is empty', async () => {
    const response = await request(app)
      .post('/api/ai-summarize')
      .send({
        user1Statement: '',
        user2Statement: 'User 2 statement',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Participant 1's statement cannot be empty.");
    expect(response.body).toHaveProperty('error');
  });

  it('should return a 400 error code when user2Statement is empty', async () => {
    const response = await request(app)
      .post('/api/ai-summarize')
      .send({
        user1Statement: 'User 1 statement',
        user2Statement: '',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Participant 2's statement cannot be empty.");
    expect(response.body).toHaveProperty('error');
  });

  it('should return a 400 error code when user1Statement is not a string', async () => {
    const response = await request(app)
      .post('/api/ai-summarize')
      .send({
        user1Statement: 123,
        user2Statement: 'User 2 statement',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Invalid input: user1Statement must be a string.");
    expect(response.body).toHaveProperty('error');
  });

  it('should return a 400 error code when user2Statement is not a string', async () => {
    const response = await request(app)
      .post('/api/ai-summarize')
      .send({
        user1Statement: 'User 1 statement',
        user2Statement: 123,
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Invalid input: user2Statement must be a string.");
    expect(response.body).toHaveProperty('error');
  });

  it('should return a 400 error code when the request body does not have the correct structure', async () => {
    const response = await request(app)
      .post('/api/ai-summarize')
      .send({
        wrongField: 'User 1 statement',
        anotherWrongField: 'User 2 statement',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Invalid JSON structure: missing user1Statement or user2Statement.");
    expect(response.body).toHaveProperty('error');
  });

  it('should return a 500 error code when the Gemini API does not return a response', async () => {
    const originalGeminiAPI = global.geminiAPI;
    global.geminiAPI = {
      generateContent: jest.fn().mockResolvedValue(null),
    };
    const response = await request(app)
      .post('/api/ai-summarize')
      .send({
        user1Statement: 'User 1 statement',
        user2Statement: 'User 2 statement',
      });
    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe('The AI did not respond.');
    expect(response.body).toHaveProperty('error');
    global.geminiAPI = originalGeminiAPI;
  });

  it('should return a 400 error code when the Gemini API returns a HarmBlockThreshold error', async () => {
    const originalGeminiAPI = global.geminiAPI;
    global.geminiAPI = {
      generateContent: jest.fn(() => {
        const error = new Error('HarmBlockThreshold');
        error.code = 'HarmBlockThreshold';
        throw error;
      }),
    };
    const response = await request(app)
      .post('/api/ai-summarize')
      .send({
        user1Statement: 'User 1 statement',
        user2Statement: 'User 2 statement',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('HarmBlockThreshold');
    expect(response.body).toHaveProperty('error');
    global.geminiAPI = originalGeminiAPI;
  });

  it('should return a 403 error code when the Gemini API returns a Permission denied error', async () => {
    const originalGeminiAPI = global.geminiAPI;
    global.geminiAPI = {
      generateContent: jest.fn(() => {
        const error = new Error('Permission denied');
        error.code = 'PERMISSION_DENIED';
        throw error;
      }),
    };
    const response = await request(app)
      .post('/api/ai-summarize')
      .send({
        user1Statement: 'User 1 statement',
        user2Statement: 'User 2 statement',
      });
    expect(response.statusCode).toBe(403);
    expect(response.body.error).toBe('Permission denied');
    expect(response.body).toHaveProperty('error');
    global.geminiAPI = originalGeminiAPI;
  });

  /**
   * @function post
   * @description Sends a POST request to the /api/ai-summarize endpoint and simulates an internal server error.
   * @async
   * @param {object} send - The data to be sent in the request body.
   * @param {string} send.user1Statement - The statement from user 1.
   * @param {string} send.user2Statement - The statement from user 2.
   * @returns {Promise<object>} The response from the server.
   * @throws {Error} If there is an error sending the request.
   * @preconditions user1Statement and user2Statement should not be empty.
   * @postconditions The response status code should be 500 and the response body should have an error property.
   */
  it('should return a 500 error code when there is an internal server error', async () => {
    const originalGeminiAPI = global.geminiAPI;
    global.geminiAPI = {
      /** @throws {Error} if there is an error in the api*/
      generateContent: jest.fn(() => {
        throw new Error('Gemini API error');
      }),
    };
    const response = await request(app)
      .post('/api/ai-summarize').send({
            user1Statement: 'User 1 statement',
            user2Statement: 'User 2 statement',
        });
    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe('Gemini API error');
    expect(response.body).toHaveProperty('error');
    global.geminiAPI = originalGeminiAPI;
  });
});