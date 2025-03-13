export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
  TRANSFER = 'transfer'
}

export enum TransactionCategory {
  // Income categories
  SALARY = 'salary',
  INVESTMENT = 'investment',
  SALE = 'sale',
  GIFT = 'gift',
  OTHER_INCOME = 'other_income',
  
  // Expense categories
  HOUSING = 'housing',
  TRANSPORTATION = 'transportation',
  FOOD = 'food',
  UTILITIES = 'utilities',
  HEALTHCARE = 'healthcare',
  PERSONAL = 'personal',
  ENTERTAINMENT = 'entertainment',
  DEBT = 'debt',
  EDUCATION = 'education',
  SHOPPING = 'shopping',
  OTHER_EXPENSE = 'other_expense'
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  description: string;
  date: string;
  accountId: string;
  targetAccountId?: string;
  isRecurring: boolean;
  recurringId?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}