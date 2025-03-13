/**
 * Parse a text message to identify if it contains financial transaction information
 * Returns financial data if found, null otherwise
 */
function parseFinancialMessage(messageText) {
  const text = messageText.toLowerCase();
  
  // Check for transaction type
  let type = null;
  if (text.includes('spent') || text.includes('paid') || text.includes('bought') || text.includes('purchased')) {
    type = 'expense';
  } else if (text.includes('received') || text.includes('earned') || text.includes('got paid') || text.includes('income')) {
    type = 'income';
  } else if (text.includes('transfer') || text.includes('moved') || text.includes('sent')) {
    type = 'transfer';
  }
  
  // If no transaction type identified, return null
  if (!type) {
    return null;
  }
  
  // Extract amount
  const amountMatch = text.match(/[$€£]?\s?(\d+(?:\.\d{1,2})?)/);
  if (!amountMatch) {
    return null;
  }
  
  const amount = parseFloat(amountMatch[1]);
  
  // Determine category based on keywords
  let category = 'other';
  
  // Income categories
  if (text.includes('salary') || text.includes('wage') || text.includes('paycheck')) {
    category = 'salary';
  } else if (text.includes('dividend') || text.includes('interest') || text.includes('investment')) {
    category = 'investment';
  } else if (text.includes('sold') || text.includes('sale')) {
    category = 'sale';
  } else if (text.includes('gift') || text.includes('present')) {
    category = 'gift';
  }
  
  // Expense categories
  else if (text.includes('rent') || text.includes('mortgage') || text.includes('housing')) {
    category = 'housing';
  } else if (text.includes('gas') || text.includes('fuel') || text.includes('uber') || 
           text.includes('lyft') || text.includes('taxi') || text.includes('bus') || 
           text.includes('train') || text.includes('transportation')) {
    category = 'transportation';
  } else if (text.includes('groceries') || text.includes('food') || text.includes('restaurant') || 
           text.includes('cafe') || text.includes('coffee') || text.includes('meal')) {
    category = 'food';
  } else if (text.includes('electricity') || text.includes('water') || text.includes('gas bill') || 
           text.includes('utility') || text.includes('internet') || text.includes('phone')) {
    category = 'utilities';
  } else if (text.includes('doctor') || text.includes('hospital') || text.includes('medical') || 
           text.includes('healthcare') || text.includes('pharmacy') || text.includes('medicine')) {
    category = 'healthcare';
  } else if (text.includes('movie') || text.includes('entertainment') || text.includes('concert') || 
           text.includes('netflix') || text.includes('spotify') || text.includes('subscription')) {
    category = 'entertainment';
  }
  
  // Extract description - everything after the amount
  let description = '';
  const words = messageText.split(' ');
  let foundAmount = false;
  
  for (const word of words) {
    if (foundAmount) {
      description += word + ' ';
    }
    if (word.match(/[$€£]?\s?\d+(?:\.\d{1,2})?/)) {
      foundAmount = true;
    }
  }
  
  // If no description was found, use the category
  description = description.trim() || category;
  
  return {
    type,
    amount,
    category,
    description,
    date: new Date().toISOString().split('T')[0]  // Current date in YYYY-MM-DD format
  };
}

module.exports = {
  parseFinancialMessage
};