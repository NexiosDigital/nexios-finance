// src/app/(protected)/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';
import DashboardSummary from './components/DashboardSummary';
import TransactionsList from './components/TransactionsList';
import IncomeExpenseChart from './components/IncomeExpenseChart';
import SpendingByCategoryChart from './components/SpendingByCategoryChart';
import BudgetProgress from './components/BudgetProgress';

type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  category_id: string;
  category?: {
    name: string;
    color: string;
    icon: string;
  };
};

type DashboardData = {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  transactions: Transaction[];
  spendingByCategory: {
    category: string;
    amount: number;
    color: string;
  }[];
  budgetProgress: {
    category: string;
    spent: number;
    limit: number;
    color: string;
  }[];
};

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [timeRange, setTimeRange] = useState<'month' | 'year'>('month');
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setIsLoading(true);
        
        // Fetch user accounts and their balances
        const { data: accounts, error: accountsError } = await supabase
          .from('accounts')
          .select('*');
          
        if (accountsError) throw new Error(accountsError.message);
        
        // Calculate total balance from all accounts
        const totalBalance = accounts?.reduce((sum, account) => sum + Number(account.balance), 0) || 0;
        
        // Get current date and first day of current month/year for filtering
        const now = new Date();
        const startDate = timeRange === 'month' 
          ? new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
          : new Date(now.getFullYear(), 0, 1).toISOString().split('T')[0];
          
        // Fetch recent transactions with their categories
        const { data: transactions, error: transactionsError } = await supabase
          .from('transactions')
          .select(`
            *,
            category:categories(name, color, icon)
          `)
          .gte('date', startDate)
          .order('date', { ascending: false })
          .limit(10);
          
        if (transactionsError) throw new Error(transactionsError.message);
        
        // Separate income and expenses for calculations
        const income = transactions?.filter(t => Number(t.amount) > 0) || [];
        const expenses = transactions?.filter(t => Number(t.amount) < 0) || [];
        
        const totalIncome = income.reduce((sum, t) => sum + Number(t.amount), 0);
        const totalExpenses = Math.abs(expenses.reduce((sum, t) => sum + Number(t.amount), 0));
        
        // Calculate spending by category
        const categoryMap = new Map();
        expenses.forEach(transaction => {
          if (!transaction.category) return;
          
          const categoryName = transaction.category.name;
          if (!categoryMap.has(categoryName)) {
            categoryMap.set(categoryName, {
              category: categoryName, 
              amount: 0,
              color: transaction.category.color
            });
          }
          
          const item = categoryMap.get(categoryName);
          item.amount += Math.abs(Number(transaction.amount));
        });
        
        const spendingByCategory = Array.from(categoryMap.values());
        
        // Fetch budget data
        const { data: budgets, error: budgetsError } = await supabase
          .from('budgets')
          .select(`
            *,
            category:categories(name, color)
          `)
          .eq('period', timeRange === 'month' ? 'monthly' : 'yearly');
          
        if (budgetsError) throw new Error(budgetsError.message);
        
        // Calculate budget progress
        const budgetProgress = budgets?.map(budget => {
          const categorySpending = spendingByCategory.find(
            cat => cat.category === budget.category?.name
          );
          
          return {
            category: budget.category?.name || 'Outro',
            spent: categorySpending?.amount || 0,
            limit: Number(budget.amount),
            color: budget.category?.color || '#0EAE7B'
          };
        }) || [];
        
        setDashboardData({
          totalBalance,
          totalIncome,
          totalExpenses,
          transactions: transactions || [],
          spendingByCategory,
          budgetProgress,
        });
        
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Erro ao carregar dados do dashboard');
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, [supabase, timeRange]);

  if (isLoading) {
    return <div className="flex justify-center p-10">Carregando...</div>;
  }

  if (error) {
    return <Alert variant="error">{error}</Alert>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard Financeiro</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1 rounded ${
              timeRange === 'month' ? 'bg-emerald-600' : 'bg-gray-700'
            }`}
          >
            Mês Atual
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`px-3 py-1 rounded ${
              timeRange === 'year' ? 'bg-emerald-600' : 'bg-gray-700'
            }`}
          >
            Ano Atual
          </button>
        </div>
      </div>

      {dashboardData && (
        <>
          <DashboardSummary
            balance={dashboardData.totalBalance}
            income={dashboardData.totalIncome}
            expenses={dashboardData.totalExpenses}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card title="Receitas e Despesas">
              <IncomeExpenseChart
                income={dashboardData.totalIncome}
                expenses={dashboardData.totalExpenses}
              />
            </Card>
            <Card title="Gastos por Categoria">
              <SpendingByCategoryChart data={dashboardData.spendingByCategory} />
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {dashboardData.budgetProgress.map((budget, index) => (
              <BudgetProgress key={index} {...budget} />
            ))}
          </div>

          <Card title="Transações Recentes">
            <div className="mb-4 flex justify-end">
              <button
                onClick={() => router.push('/transactions')}
                className="text-sm text-emerald-500 hover:text-emerald-400"
              >
                Ver todas
              </button>
            </div>
            <TransactionsList transactions={dashboardData.transactions} />
          </Card>
        </>
      )}
    </div>
  );
}