const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');
const webhookHandlers = require('./webhooks');
const eventHandlers = require('./handlers');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.WHATSAPP_SERVICE_PORT || 3003;

// Middleware
app.use(bodyParser.json());

// WhatsApp webhook endpoint
app.post('/webhook', webhookHandlers.handleIncomingMessage);

// Verification endpoint for WhatsApp API
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  // Check if a token and mode is in the query string
  if (mode && token) {
    // Check the mode and token
    if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
      // Respond with the challenge token
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Listen for incoming requests
app.listen(PORT, () => {
  console.log(`WhatsApp integration service running on port ${PORT}`);
});

// Export for testing
module.exports = app;