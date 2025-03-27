const express = require('express');
const { aiRoutes } = require('./aiRoutes');
const { healthRoutes } = require('./healthRoutes');

function setupRoutes(app, services) {
  const router = express.Router();
  
  aiRoutes(router, services.geminiService);
  healthRoutes(router);
  
  return router;
}

module.exports = { setupRoutes };