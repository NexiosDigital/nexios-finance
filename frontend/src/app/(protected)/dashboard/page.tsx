'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase-client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import DashboardSummary from './components/DashboardSummary';
import TransactionsList from './components/TransactionsList';
import IncomeExpenseChart from './components/IncomeExpenseChart';
import SpendingByCategoryChart from './components/SpendingByCategoryChart';
import BudgetProgress from './components/BudgetProgress';

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const [greeting, setGreeting] = useState('');
  const [dashboardData, setDashboardData] = useState({
    balance: 12580.45,
    income: 8950.00,
    expenses: 5372.55,
    transactions: [
      {
        id: '1',
        date: '2023-03-15',
        description: 'Salário',
        amount: 5000,
        category: { name: 'Salário', color: '#0EAE7B' }
      },
      {
        id: '2',
        date: '2023-03-16',
        description: 'Supermercado',
        amount: -350.25,
        category: { name: 'Alimentação', color: '#EF4444' }
      },
      {
        id: '3',
        date: '2023-03-18',
        description: 'Internet',
        amount: -120.00,
        category: { name: 'Serviços', color: '#3B82F6' }
      }
    ],
    spendingByCategory: [
      { category: 'Alimentação', amount: 1200, color: '#EF4444' },
      { category: 'Transporte', amount: 850, color: '#F59E0B' },
      { category: 'Moradia', amount: 2200, color: '#3B82F6' },
      { category: 'Lazer', amount: 650, color: '#EC4899' }
    ],
    budgetProgress: [
      { category: 'Alimentação', spent: 1200, limit: 1500, color: '#0EAE7B' },
      { category: 'Transporte', spent: 850, limit: 800, color: '#F59E0B' },
      { category: 'Lazer', spent: 650, limit: 500, color: '#EC4899' }
    ]
  });

  useEffect(() => {
    // Definir saudação baseada na hora do dia
    const hour = new Date().getHours();
    
    if (hour < 12) {
      setGreeting('Bom dia');
    } else if (hour < 18) {
      setGreeting('Boa tarde');
    } else {
      setGreeting('Boa noite');
    }

    // Aqui você pode adicionar a lógica para buscar os dados reais do dashboard
  }, []);

  return (
    <div>
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{greeting}, {profile?.name?.split(' ')[0] || user?.user_metadata?.name?.split(' ')[0] || 'usuário'}</h1>
        <p className="text-gray-400 mt-1">Aqui está um resumo das suas finanças</p>
      </div>

      {/* Resumo do Dashboard */}
      <DashboardSummary 
        balance={dashboardData.balance}
        income={dashboardData.income}
        expenses={dashboardData.expenses}
      />

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card title="Receitas e Despesas">
          <IncomeExpenseChart
            income={dashboardData.income}
            expenses={dashboardData.expenses}
          />
        </Card>
        <Card title="Gastos por Categoria">
          <SpendingByCategoryChart data={dashboardData.spendingByCategory} />
        </Card>
      </div>

      {/* Progresso do Orçamento */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {dashboardData.budgetProgress.map((budget, index) => (
          <BudgetProgress key={index} {...budget} />
        ))}
      </div>

      {/* Transações Recentes */}
      <Card title="Transações Recentes">
        <div className="mb-4 flex justify-end p-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/transactions')}
          >
            Ver todas
          </Button>
        </div>
        <TransactionsList transactions={dashboardData.transactions} />
      </Card>
    </div>
  );
}