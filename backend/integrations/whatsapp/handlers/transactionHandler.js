const axios = require('axios');

/**
 * Create a transaction in the system based on financial data
 * parsed from a WhatsApp message
 */
async function createTransaction(financialData, phoneNumber) {
  try {
    // First, get user ID based on phone number
    const userId = await getUserIdByPhone(phoneNumber);
    
    if (!userId) {
      console.error(`No user found with phone number: ${phoneNumber}`);
      return null;
    }
    
    // Get user's default account
    const account = await getDefaultAccount(userId);
    
    if (!account) {
      console.error(`No default account found for user: ${userId}`);
      return null;
    }
    
    // Prepare transaction data
    const transactionData = {
      userId,
      accountId: account.id,
      amount: financialData.type === 'expense' ? -Math.abs(financialData.amount) : financialData.amount,
      type: financialData.type,
      category: financialData.category,
      description: financialData.description,
      date: financialData.date,
      isRecurring: false
    };
    
    // Call Nexios API to create the transaction
    const response = await axios.post(
      `${process.env.API_BASE_URL}/api/transactions`,
      transactionData,
      {
        headers: {
          'Authorization': `Bearer ${process.env.API_SERVICE_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error creating transaction from WhatsApp message:', error);
    return null;
  }
}

/**
 * Get user ID based on their phone number
 */
async function getUserIdByPhone(phoneNumber) {
  try {
    const response = await axios.get(
      `${process.env.API_BASE_URL}/api/users/by-phone/${phoneNumber}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.API_SERVICE_TOKEN}`
        }
      }
    );
    
    return response.data.id;
  } catch (error) {
    console.error('Error getting user by phone:', error);
    return null;
  }
}

/**
 * Get user's default account
 */
async function getDefaultAccount(userId) {
  try {
    const response = await axios.get(
      `${process.env.API_BASE_URL}/api/accounts/default/${userId}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.API_SERVICE_TOKEN}`
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error getting default account:', error);
    return null;
  }
}

module.exports = {
  createTransaction
};