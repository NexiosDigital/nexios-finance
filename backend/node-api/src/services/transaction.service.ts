import { Transaction } from '../models/transaction.model';
import { supabase } from '../utils/supabase';

export class TransactionService {
  async getAllByUser(userId: string): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('userId', userId)
      .order('date', { ascending: false });
      
    if (error) {
      console.error('Error fetching transactions:', error);
      throw new Error('Failed to fetch transactions');
    }
    
    return data as Transaction[];
  }
  
  async getById(id: string, userId: string): Promise<Transaction | null> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', id)
      .eq('userId', userId)
      .single();
      
    if (error) {
      console.error('Error fetching transaction:', error);
      throw new Error('Failed to fetch transaction');
    }
    
    return data as Transaction;
  }
  
  async create(transactionData: Partial<Transaction>): Promise<Transaction> {
    const { data, error } = await supabase
      .from('transactions')
      .insert(transactionData)
      .select()
      .single();
      
    if (error) {
      console.error('Error creating transaction:', error);
      throw new Error('Failed to create transaction');
    }
    
    return data as Transaction;
  }
  
  async update(id: string, userId: string, transactionData: Partial<Transaction>): Promise<Transaction | null> {
    // First check if the transaction exists and belongs to the user
    const { data: existingTransaction } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', id)
      .eq('userId', userId)
      .single();
      
    if (!existingTransaction) {
      return null;
    }
    
    const { data, error } = await supabase
      .from('transactions')
      .update(transactionData)
      .eq('id', id)
      .eq('userId', userId)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating transaction:', error);
      throw new Error('Failed to update transaction');
    }
    
    return data as Transaction;
  }
  
  async delete(id: string, userId: string): Promise<boolean> {
    // First check if the transaction exists and belongs to the user
    const { data: existingTransaction } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', id)
      .eq('userId', userId)
      .single();
      
    if (!existingTransaction) {
      return false;
    }
    
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)
      .eq('userId', userId);
      
    if (error) {
      console.error('Error deleting transaction:', error);
      throw new Error('Failed to delete transaction');
    }
    
    return true;
  }
}