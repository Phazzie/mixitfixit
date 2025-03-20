const request = require('supertest');
const express = require('express');
const routes = require('./routes');

// Define a mock geminiAPI object
global.geminiAPI = {
  generateContent: jest.fn().mockResolvedValue({
    response: {
      text: 'Mock Gemini Summary'
    }
  })
};

const app = express();
app.use(express.json());
app.use('/', routes);

describe('POST /api/ai-summarize', () => {
  it('should return a 200 status code and a response when the request is correct', async () => {
    const response = await request(app)
      .post('/api/ai-summarize')
      .send({
        user1Statement: 'User 1 statement',
        user2Statement: 'User 2 statement',
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('summary');
  });

  it('should return a 400 error code when user1Statement is missing', async () => {
    const response = await request(app)
      .post('/api/ai-summarize')
      .send({
        user2Statement: 'User 2 statement',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should return a 400 error code when user2Statement is missing', async () => {
    const response = await request(app)
      .post('/api/ai-summarize')
      .send({
        user1Statement: 'User 1 statement',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should return a 500 error code when there is an internal server error', async () => {

    const originalGeminiAPI = global.geminiAPI;

    global.geminiAPI = {
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
    expect(response.body).toHaveProperty('error');
    global.geminiAPI = originalGeminiAPI;
  });
});