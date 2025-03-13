import { Request, Response } from 'express';
import { TransactionService } from '../services/transaction.service';

const transactionService = new TransactionService();

export class TransactionController {
  async getAllTransactions(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const transactions = await transactionService.getAllByUser(userId);
      res.json(transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ message: 'Failed to fetch transactions' });
    }
  }

  async getTransactionById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      
      const transaction = await transactionService.getById(id, userId);
      
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      
      res.json(transaction);
    } catch (error) {
      console.error('Error fetching transaction:', error);
      res.status(500).json({ message: 'Failed to fetch transaction' });
    }
  }

  async createTransaction(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const transactionData = { ...req.body, userId };
      
      const newTransaction = await transactionService.create(transactionData);
      res.status(201).json(newTransaction);
    } catch (error) {
      console.error('Error creating transaction:', error);
      res.status(500).json({ message: 'Failed to create transaction' });
    }
  }

  async updateTransaction(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const transactionData = req.body;
      
      const updatedTransaction = await transactionService.update(id, userId, transactionData);
      
      if (!updatedTransaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      
      res.json(updatedTransaction);
    } catch (error) {
      console.error('Error updating transaction:', error);
      res.status(500).json({ message: 'Failed to update transaction' });
    }
  }

  async deleteTransaction(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      
      const success = await transactionService.delete(id, userId);
      
      if (!success) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      
      res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      console.error('Error deleting transaction:', error);
      res.status(500).json({ message: 'Failed to delete transaction' });
    }
  }
}