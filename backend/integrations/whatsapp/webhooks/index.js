const axios = require('axios');
const { parseFinancialMessage } = require('../handlers/messageParser');
const { createTransaction } = require('../handlers/transactionHandler');

/**
 * Handle incoming messages from WhatsApp
 */
async function handleIncomingMessage(req, res) {
  try {
    // Return a 200 OK response immediately to acknowledge receipt
    res.status(200).send('EVENT_RECEIVED');
    
    const body = req.body;
    
    // Check if this is a WhatsApp message event
    if (body.object === 'whatsapp_business_account') {
      // Process each entry
      for (const entry of body.entry) {
        // Process each message within the entry
        for (const change of entry.changes) {
          if (change.field === 'messages') {
            for (const message of change.value.messages || []) {
              if (message.type === 'text') {
                await processTextMessage(message, change.value.contacts[0]);
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Error handling WhatsApp webhook:', error);
  }
}

/**
 * Process text messages received from WhatsApp
 */
async function processTextMessage(message, contact) {
  try {
    const phoneNumber = contact.wa_id;
    const userName = contact.profile.name;
    const messageText = message.text.body;
    
    console.log(`Message from ${userName} (${phoneNumber}): ${messageText}`);
    
    // Check if message might be a financial transaction
    const financialData = parseFinancialMessage(messageText);
    
    if (financialData) {
      // If it's a financial transaction message, create a transaction
      const transaction = await createTransaction(financialData, phoneNumber);
      
      // Send confirmation message back to the user
      await sendWhatsAppMessage(
        phoneNumber,
        `Transaction recorded! Amount: $${financialData.amount}, Category: ${financialData.category}`
      );
    } else {
      // If not a financial message, send a help message
      await sendWhatsAppMessage(
        phoneNumber,
        "I can help you track your finances. Try sending something like: 'Spent $45 on groceries' or 'Received $1000 salary'"
      );
    }
  } catch (error) {
    console.error('Error processing WhatsApp message:', error);
  }
}

/**
 * Send message back to user on WhatsApp
 */
async function sendWhatsAppMessage(recipient, message) {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: recipient,
        type: 'text',
        text: { body: message }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    return null;
  }
}

module.exports = {
  handleIncomingMessage
};