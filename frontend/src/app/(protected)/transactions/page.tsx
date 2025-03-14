// src/app/(protected)/transactions/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import TransactionFilters from './components/TransactionFilters';

type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  category_id: string;
  account_id: string;
  notes?: string;
  is_recurring: boolean;
  category?: {
    name: string;
    color: string;
    icon?: string;
  };
  account?: {
    name: string;
    type: string;
  };
};

type Account = {
  id: string;
  name: string;
  type: string;
};

type Category = {
  id: string;
  name: string;
  type: string;
  color: string;
  icon?: string;
};

type FiltersType = {
  dateRange: { startDate: string; endDate: string };
  accounts: string[];
  categories: string[];
  type: 'all' | 'income' | 'expense';
  search: string;
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [filters, setFilters] = useState<FiltersType>({
    dateRange: {
      startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
    },
    accounts: [],
    categories: [],
    type: 'all',
    search: '',
  });

  const supabase = createClientComponentClient();

  // Fetch categories and accounts for the forms
  useEffect(() => {
    async function fetchFormData() {
      try {
        const { data: accountsData, error: accountsError } = await supabase
          .from('accounts')
          .select('*')
          .eq('is_active', true);

        if (accountsError) throw new Error(accountsError.message);
        setAccounts(accountsData || []);

        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*');

        if (categoriesError) throw new Error(categoriesError.message);
        setCategories(categoriesData || []);
      } catch (err) {
        console.error('Error fetching form data:', err);
        setError('Erro ao carregar dados do formulário');
      }
    }

    fetchFormData();
  }, [supabase]);

  // Fetch transactions with applied filters
  useEffect(() => {
    async function fetchTransactions() {
      try {
        setIsLoading(true);
        setError(null);

        let query = supabase
          .from('transactions')
          .select(`
            *,
            category:categories(id, name, color, icon),
            account:accounts(id, name, type)
          `)
          .gte('date', filters.dateRange.startDate)
          .lte('date', filters.dateRange.endDate)
          .order('date', { ascending: false });

        // Apply account filter if selected
        if (filters.accounts.length > 0) {
          query = query.in('account_id', filters.accounts);
        }

        // Apply category filter if selected
        if (filters.categories.length > 0) {
          query = query.in('category_id', filters.categories);
        }

        // Apply transaction type filter (income/expense)
        if (filters.type === 'income') {
          query = query.gt('amount', 0);
        } else if (filters.type === 'expense') {
          query = query.lt('amount', 0);
        }

        // Apply search filter if provided
        if (filters.search) {
          query = query.ilike('description', `%${filters.search}%`);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw new Error(fetchError.message);
        setTransactions(data || []);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Erro ao carregar transações');
      } finally {
        setIsLoading(false);
      }
    }

    fetchTransactions();
  }, [supabase, filters]);

  const handleCreateTransaction = async (newTransaction: Omit<Transaction, 'id'>) => {
    try {
      setError(null);
      
      // Adjust amount for expenses (should be negative)
      if (
        categories.find(c => c.id === newTransaction.category_id)?.type === 'expense' &&
        newTransaction.amount > 0
      ) {
        newTransaction.amount = -Math.abs(newTransaction.amount);
      }
      
      const { data, error } = await supabase
        .from('transactions')
        .insert(newTransaction)
        .select();

      if (error) throw new Error(error.message);

      // Update account balance
      if (data && data.length > 0) {
        const { error: updateError } = await supabase
          .rpc('update_account_balance', {
            p_account_id: newTransaction.account_id,
            p_amount: newTransaction.amount
          });

        if (updateError) throw new Error(updateError.message);
      }

      // Refresh transactions list
      const updatedFilters = { ...filters };
      setFilters(updatedFilters);
      
      setShowForm(false);
    } catch (err) {
      console.error('Error creating transaction:', err);
      setError('Erro ao criar transação');
    }
  };

  const handleUpdateTransaction = async (
    id: string, 
    updatedTransaction: Partial<Transaction>,
    previousAmount: number
  ) => {
    try {
      setError(null);
      
      // Adjust amount for expenses (should be negative)
      if (
        updatedTransaction.category_id && 
        categories.find(c => c.id === updatedTransaction.category_id)?.type === 'expense' &&
        updatedTransaction.amount && updatedTransaction.amount > 0
      ) {
        updatedTransaction.amount = -Math.abs(updatedTransaction.amount);
      }
      
      const { error } = await supabase
        .from('transactions')
        .update(updatedTransaction)
        .eq('id', id);

      if (error) throw new Error(error.message);

      // Update account balance (if amount changed)
      if (
        updatedTransaction.amount !== undefined && 
        updatedTransaction.amount !== previousAmount
      ) {
        const amountDifference = updatedTransaction.amount - previousAmount;
        
        const { error: updateError } = await supabase
          .rpc('update_account_balance', {
            p_account_id: updatedTransaction.account_id || editingTransaction?.account_id,
            p_amount: amountDifference
          });

        if (updateError) throw new Error(updateError.message);
      }

      // Refresh transactions list
      const updatedFilters = { ...filters };
      setFilters(updatedFilters);
      
      setEditingTransaction(null);
      setShowForm(false);
    } catch (err) {
      console.error('Error updating transaction:', err);
      setError('Erro ao atualizar transação');
    }
  };

  const handleDeleteTransaction = async (id: string, amount: number, accountId: string) => {
    if (!window.confirm('Tem certeza que deseja excluir esta transação?')) {
      return;
    }

    try {
      setError(null);
      
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);

      if (error) throw new Error(error.message);

      // Update account balance (reverse the transaction amount)
      const { error: updateError } = await supabase
        .rpc('update_account_balance', {
          p_account_id: accountId,
          p_amount: -amount // Invert the amount to reverse the effect
        });

      if (updateError) throw new Error(updateError.message);

      // Refresh transactions list
      setTransactions(transactions.filter(t => t.id !== id));
    } catch (err) {
      console.error('Error deleting transaction:', err);
      setError('Erro ao excluir transação');
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transações</h1>
        <Button 
          onClick={() => {
            setEditingTransaction(null);
            setShowForm(!showForm);