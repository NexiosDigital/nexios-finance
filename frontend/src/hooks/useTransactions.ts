import { useState, useEffect, useCallback } from 'react';
import { Transaction } from '@/types/transaction';
import { transactionService } from '@/services/api';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await transactionService.getAll();
      setTransactions(data);
    } catch (err) {
      setError('Failed to fetch transactions. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const addTransaction = async (newTransaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const addedTransaction = await transactionService.create(newTransaction);
      setTransactions(prev => [...prev, addedTransaction]);
      return addedTransaction;
    } catch (err) {
      setError('Failed to add transaction. Please try again.');
      console.error(err);
      throw err;
    }
  };

  const updateTransaction = async (id: string, updatedData: Partial<Transaction>) => {
    try {
      const updatedTransaction = await transactionService.update(id, updatedData);
      setTransactions(prev => 
        prev.map(transaction => 
          transaction.id === id ? updatedTransaction : transaction
        )
      );
      return updatedTransaction;
    } catch (err) {
      setError('Failed to update transaction. Please try again.');
      console.error(err);
      throw err;
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await transactionService.delete(id);
      setTransactions(prev => prev.filter(transaction => transaction.id !== id));
    } catch (err) {
      setError('Failed to delete transaction. Please try again.');
      console.error(err);
      throw err;
    }
  };

  return {
    transactions,
    isLoading,
    error,
    fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction
  };
}