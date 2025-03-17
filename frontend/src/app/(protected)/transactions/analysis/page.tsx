'use client';

import React, { useState } from 'react';
import { 
  AdjustmentsHorizontalIcon,
  ChevronDownIcon, 
  ChevronUpIcon,
  ArrowPathIcon,
  BanknotesIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Treemap
} from 'recharts';

// Tipo de dados para transações
type TransactionType = 'income' | 'expense' | 'transfer';
type TransactionCategory = string;

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  accountId: string;
  accountName: string;
  targetAccountId?: string;
  targetAccountName?: string;
  tags?: string[];
}

interface CategoryData {
  name: string;
  value: number;
  percentage: number;
  transactions: number;
  color: string;
}

interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}

// Dados de exemplo
const sampleTransactions: Transaction[] = [
  // Receitas
  {
    id: '1',
    date: '2025-03-01',
    description: 'Salário',
    amount: 5500,
    type: 'income',
    category: 'Salário',
    accountId: 'acc1',
    accountName: 'Itaú Corrente',
  },
  {
    id: '2',
    date: '2025-03-10',
    description: 'Freelance Website',
    amount: 1800,
    type: 'income',
    category: 'Renda Extra',
    accountId: 'acc2',
    accountName: 'Nubank',
  },
  {
    id: '3',
    date: '2025-03-25',
    description: 'Rendimentos',
    amount: 320,
    type: 'income',
    category: 'Investimentos',
    accountId: 'acc1',
    accountName: 'Itaú Corrente',
  },
  
  // Despesas
  {
    id: '4',
    date: '2025-03-05',
    description: 'Aluguel',
    amount: -1800,
    type: 'expense',
    category: 'Moradia',
    accountId: 'acc1',
    accountName: 'Itaú Corrente',
  },
  {
    id: '5',
    date: '2025-03-08',
    description: 'Supermercado',
    amount: -650,
    type: 'expense',
    category: 'Alimentação',
    accountId: 'acc2',
    accountName: 'Nubank',
  },
  {
    id: '6',
    date: '2025-03-12',
    description: 'Restaurante',
    amount: -180,
    type: 'expense',
    category: 'Alimentação',
    accountId: 'acc2',
    accountName: 'Nubank',
  },
  {
    id: '7',
    date: '2025-03-15',
    description: 'Uber',
    amount: -45,
    type: 'expense',
    category: 'Transporte',
    accountId: 'acc2',
    accountName: 'Nubank',
  },
  {
    id: '8',
    date: '2025-03-17',
    description: 'Gasolina',
    amount: -200,
    type: 'expense',
    category: 'Transporte',
    accountId: 'acc1',
    accountName: 'Itaú Corrente',
  },
  {
    id: '9',
    date: '2025-03-18',
    description: 'Netflix',
    amount: -39.90,
    type: 'expense',
    category: 'Lazer',
    accountId: 'acc2',
    accountName: 'Nubank',
  },
  {
    id: '10',
    date: '2025-03-19',
    description: 'Spotify',
    amount: -19.90,
    type: 'expense',
    category: 'Lazer',
    accountId: 'acc2',
    accountName: 'Nubank',
  },
  {
    id: '11',
    date: '2025-03-20',
    description: 'Internet',
    amount: -120,
    type: 'expense',
    category: 'Moradia',
    accountId: 'acc1',
    accountName: 'Itaú Corrente',
  },
  {
    id: '12',
    date: '2025-03-21',
    description: 'Energia Elétrica',
    amount: -180,
    type: 'expense',
    category: 'Moradia',
    accountId: 'acc1',
    accountName: 'Itaú Corrente',
  },
  {
    id: '13',
    date: '2025-03-22',
    description: 'Água',
    amount: -90,
    type: 'expense',
    category: 'Moradia',
    accountId: 'acc1',
    accountName: 'Itaú Corrente',
  },
  {
    id: '14',
    date: '2025-03-23',
    description: 'Academia',
    amount: -110,
    type: 'expense',
    category: 'Saúde',
    accountId: 'acc2',
    accountName: 'Nubank',
  },
  {
    id: '15',
    date: '2025-03-24',
    description: 'Remédios',
    amount: -75,
    type: 'expense',
    category: 'Saúde',
    accountId: 'acc1',
    accountName: 'Itaú Corrente',
  },
  {
    id: '16',
    date: '2025-03-26',
    description: 'Presente Aniversário',
    amount: -150,
    type: 'expense',
    category: 'Outros',
    accountId: 'acc2',
    accountName: 'Nubank',
  },
  {
    id: '17',
    date: '2025-03-28',
    description: 'Corte de Cabelo',
    amount: -60,
    type: 'expense',
    category: 'Pessoal',
    accountId: 'acc2',
    accountName: 'Nubank',
  },
  
  // Transferências
  {
    id: '18',
    date: '2025-03-03',
    description: 'Transferência para Poupança',
    amount: -1000,
    type: 'transfer',
    category: 'Transferência',
    accountId: 'acc1',
    accountName: 'Itaú Corrente',
    targetAccountId: 'acc3',
    targetAccountName: 'Itaú Poupança',
  },
  {
    id: '19',
    date: '2025-03-30',
    description: 'Transferência para Investimentos',
    amount: -500,
    type: 'transfer',
    category: 'Transferência',
    accountId: 'acc2',
    accountName: 'Nubank',
    targetAccountId: 'acc4',
    targetAccountName: 'XP Investimentos',
  },
];

// Dados de exemplo para gráficos históricos
const historicalData: MonthlyData[] = [
  { month: 'Out/24', income: 7100, expenses: 5200, balance: 1900 },
  { month: 'Nov/24', income: 7300, expenses: 5500, balance: 1800 },
  { month: 'Dez/24', income: 9500, expenses: 7200, balance: 2300 },
  { month: 'Jan/25', income: 7000, expenses: 5100, balance: 1900 },
  { month: 'Fev/25', income: 7200, expenses: 5300, balance: 1900 },
  { month: 'Mar/25', income: 7620, expenses: 5219.80, balance: 2400.20 }
];

const categoryColors: Record<string, string> = {
  'Moradia': '#3B82F6',
  'Alimentação': '#10B981',
  'Transporte': '#8B5CF6',
  'Lazer': '#F59E0B',
  'Saúde': '#EC4899',
  'Pessoal': '#6366F1',
  'Salário': '#10B981',
  'Renda Extra': '#22C55E',
  'Investimentos': '#0EA5E9',
  'Transferência': '#94A3B8',
  'Outros': '#64748B'
};

// Funções Utilitárias
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const formatPercentage = (value: number) => {
  return `${value.toFixed(2)}%`;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', { 
    day: '2-digit', 
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

// Tratamento de dados para gráficos e análises
const processTransactions = (transactions: Transaction[]) => {
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const incomeTransactions = transactions.filter(t => t.type === 'income');
  
  // Total de receitas e despesas
  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = Math.abs(expenseTransactions.reduce((sum, t) => sum + t.amount, 0));
  
  // Categorização de despesas
  const expensesByCategory = expenseTransactions.reduce((acc, t) => {
    const category = t.category;
    if (!acc[category]) {
      acc[category] = {
        name: category,
        value: 0,
        percentage: 0,
        transactions: 0,
        color: categoryColors[category] || '#64748B'
      };
    }
    acc[category].value += Math.abs(t.amount);
    acc[category].transactions += 1;
    return acc;
  }, {} as Record<string, CategoryData>);
  
  // Calcular percentuais
  Object.values(expensesByCategory).forEach(category => {
    category.percentage = (category.value / totalExpenses) * 100;
  });
  
  // Categorização de receitas
  const incomeByCategory = incomeTransactions.reduce((acc, t) => {
    const category = t.category;
    if (!acc[category]) {
      acc[category] = {
        name: category,
        value: 0,
        percentage: 0,
        transactions: 0,
        color: categoryColors[category] || '#64748B'
      };
    }
    acc[category].value += t.amount;
    acc[category].transactions += 1;
    return acc;
  }, {} as Record<string, CategoryData>);
  
  // Calcular percentuais
  Object.values(incomeByCategory).forEach(category => {
    category.percentage = (category.value / totalIncome) * 100;
  });
  
  return {
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
    expensesByCategory: Object.values(expensesByCategory).sort((a, b) => b.value - a.value),
    incomeByCategory: Object.values(incomeByCategory).sort((a, b) => b.value - a.value),
    expenseTransactions,
    incomeTransactions
  };
};

// Componente de Card padrão
const Card = ({ 
  children, 
  className = '',
  title,
  action
}: { 
  children: React.ReactNode; 
  className?: string;
  title?: string;
  action?: React.ReactNode;
}) => {
  return (
    <div className={`bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl ${className}`}>
      {(title || action) && (
        <div className="flex justify-between items-center p-4 border-b border-gray-700/50">
          {title && <h3 className="font-medium text-white">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

// Tooltip personalizado para gráficos
const CustomTooltip = ({ active, payload, label, formatter }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-3 border border-gray-700 rounded-lg shadow-lg">
        {label && <p className="text-xs text-gray-300 mb-1">{label}</p>}
        {payload.map((entry: any, index: number) => (
          <p 
            key={`item-${index}`} 
            className="text-sm"
            style={{ color: entry.color || entry.fill || entry.stroke }}
          >
            {entry.name}: {formatter ? formatter(entry.value) : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Componente Principal para Análise de Transações
const TransactionAnalysis = () => {
  const [transactions] = useState<Transaction[]>(sampleTransactions);
  const [activeView, setActiveView] = useState<'overview' | 'expenses' | 'income'>('overview');
  const [selectedMonth, setSelectedMonth] = useState<string>('Mar/25');
  const [showFilters, setShowFilters] = useState(false);
  
  const processedData = processTransactions(transactions);
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
            Análise de Transações
          </h1>
          <p className="text-gray-400 mt-1">Entenda para onde seu dinheiro está indo</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 flex">
            <button 
              className={`px-4 py-2 text-sm rounded-lg ${activeView === 'overview' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveView('overview')}
            >
              Visão Geral
            </button>
            <button 
              className={`px-4 py-2 text-sm rounded-lg ${activeView === 'expenses' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveView('expenses')}
            >
              Despesas
            </button>
            <button 
              className={`px-4 py-2 text-sm rounded-lg ${activeView === 'income' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveView('income')}
            >
              Receitas
            </button>
          </div>
          
          <button 
            className="bg-gray-800/60 hover:bg-gray-700/80 text-white px-3 py-2 rounded-lg text-sm flex items-center shadow-md transition-colors border border-gray-700/50"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FunnelIcon className="w-4 h-4 mr-1.5" />
            Filtros
            {showFilters ? (
              <ChevronUpIcon className="w-4 h-4 ml-1.5" />
            ) : (
              <ChevronDownIcon className="w-4 h-4 ml-1.5" />
            )}
          </button>
        </div>
      </div>
      
      {/* Filtros Expandidos */}
      {showFilters && (
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Período</label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="relative">
                    <input
                      type="date"
                      className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-white text-sm"
                      placeholder="De:"
                    />
                    <CalendarIcon className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <input
                      type="date"
                      className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-white text-sm"
                      placeholder="Até:"
                    />
                    <CalendarIcon className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                <button className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-xs rounded text-white">Hoje</button>
                <button className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-xs rounded text-white">Ontem</button>
                <button className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-xs rounded text-white">7 dias</button>
                <button className="px-2 py-1 bg-emerald-600 text-xs rounded text-white">Este mês</button>
                <button className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-xs rounded text-white">Mês anterior</button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Categorias</label>
              <div className="h-24 overflow-y-auto pr-2 space-y-1.5">
                {Object.keys(categoryColors).map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      id={`category-${category}`}
                      type="checkbox"
                      className="h-3.5 w-3.5 rounded border-gray-600 text-emerald-600 focus:ring-emerald-500"
                    />
                    <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-300 flex items-center">
                      <div 
                        className="w-2.5 h-2.5 rounded-full mr-1.5"
                        style={{ backgroundColor: categoryColors[category] }}
                      ></div>
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Transação</label>
              <div className="space-y-1.5">
                <div className="flex items-center">
                  <input
                    id="type-all"
                    type="radio"
                    name="transaction-type"
                    checked
                    className="h-3.5 w-3.5 border-gray-600 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label htmlFor="type-all" className="ml-2 text-sm text-gray-300">
                    Todas
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="type-income"
                    type="radio"
                    name="transaction-type"
                    className="h-3.5 w-3.5 border-gray-600 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label htmlFor="type-income" className="ml-2 text-sm text-gray-300">
                    Receitas
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="type-expense"
                    type="radio"
                    name="transaction-type"
                    className="h-3.5 w-3.5 border-gray-600 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label htmlFor="type-expense" className="ml-2 text-sm text-gray-300">
                    Despesas
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="type-transfer"
                    type="radio"
                    name="transaction-type"
                    className="h-3.5 w-3.5 border-gray-600 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label htmlFor="type-transfer" className="ml-2 text-sm text-gray-300">
                    Transferências
                  </label>
                </div>
              </div>
              
              <div className="mt-3 flex space-x-2">
                <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-sm rounded text-white flex-1">
                  Aplicar Filtros
                </button>
                <button className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-sm rounded text-white">
                  Limpar
                </button>
              </div>
            </div>
          </div>
        </Card>
      )}
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Receitas</p>
              <h3 className="text-2xl font-bold mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                {formatCurrency(processedData.totalIncome)}
              </h3>
              <p className="text-xs text-emerald-400 mt-1">
                + 5.8% vs. mês anterior
              </p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-700 text-white">
              <ArrowUpIcon className="w-5 h-5" />
            </div>
          </div>
        </Card>
        
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Despesas</p>
              <h3 className="text-2xl font-bold mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                {formatCurrency(processedData.totalExpenses)}
              </h3>
              <p className="text-xs text-red-400 mt-1">
                + 1.6% vs. mês anterior
              </p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-red-500 to-rose-700 text-white">
              <ArrowDownIcon className="w-5 h-5" />
            </div>
          </div>
        </Card>
        
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Saldo</p>
              <h3 className="text-2xl font-bold mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                {formatCurrency(processedData.balance)}
              </h3>
              <p className="text-xs text-emerald-400 mt-1">
                + 26.3% vs. mês anterior
              </p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-700 text-white">
              <BanknotesIcon className="w-5 h-5" />
            </div>
          </div>
        </Card>
        
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Principal Despesa</p>
              <h3 className="text-xl font-bold mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                {processedData.expensesByCategory[0]?.name || 'N/A'}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {processedData.expensesByCategory[0] ? formatCurrency(processedData.expensesByCategory[0].value) : ''}
                {processedData.expensesByCategory[0] ? ` (${formatPercentage(processedData.expensesByCategory[0].percentage)})` : ''}
              </p>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: processedData.expensesByCategory[0]?.color || '#64748B' }}>
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Visão Geral */}
      {activeView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfico de Evolução Mensal */}
          <Card 
            className="lg:col-span-3"
            title="Evolução Mensal"
            action={
              <div className="flex items-center space-x-2">
                <select className="bg-gray-700 border border-gray-600 text-white text-xs rounded-lg focus:ring-emerald-500 focus:border-emerald-500 p-1.5">
                  <option>Últimos 6 meses</option>
                  <option>Este ano</option>
                  <option>12 meses</option>
                </select>
                <button className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300">
                  <ArrowPathIcon className="w-4 h-4" />
                </button>
              </div>
            }
          >
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={historicalData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: '#9CA3AF' }} />
                  <YAxis tick={{ fill: '#9CA3AF' }} />
                  <Tooltip content={<CustomTooltip formatter={(value: number) => formatCurrency(value)} />} />
                  <Area
                    type="monotone"
                    dataKey="income"
                    name="Receitas"
                    stroke="#10B981"
                    fill="url(#colorIncome)"
                    activeDot={{ r: 6 }}
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    name="Despesas"
                    stroke="#EF4444"
                    fill="url(#colorExpenses)"
                    activeDot={{ r: 6 }}
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    name="Saldo"
                    stroke="#3B82F6"
                    fill="url(#colorBalance)"
                    activeDot={{ r: 6 }}
                    strokeWidth={2}
                  />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          {/* Despesas por Categoria */}
          <Card
            title="Despesas por Categoria"
            action={
              <button className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center">
                Ver Detalhes
                <ChevronRightIcon className="w-4 h-4 ml-0.5" />
              </button>
            }
          >
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={processedData.expensesByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                  >
                    {processedData.expensesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip formatter={(value: number) => formatCurrency(value)} />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 space-y-2 max-h-36 overflow-y-auto pr-1">
              {processedData.expensesByCategory.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-2.5 h-2.5 rounded-full mr-2"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{formatCurrency(category.value)}</div>
                    <div className="text-xs text-gray-400">{formatPercentage(category.percentage)}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Receitas por Categoria */}
          <Card
            title="Receitas por Categoria"
            action={
              <button className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center">
                Ver Detalhes
                <ChevronRightIcon className="w-4 h-4 ml-0.5" />
              </button>
            }
          >
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={processedData.incomeByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                  >
                    {processedData.incomeByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip formatter={(value: number) => formatCurrency(value)} />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 space-y-2">
              {processedData.incomeByCategory.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-2.5 h-2.5 rounded-full mr-2"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{formatCurrency(category.value)}</div>
                    <div className="text-xs text-gray-400">{formatPercentage(category.percentage)}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Heatmap de Gastos */}
          <Card
            title="Análise de Gastos por Categoria"
            action={
              <div className="text-xs bg-gray-800/70 text-gray-400 px-2 py-1 rounded-md flex items-center">
                <CalendarIcon className="w-3 h-3 mr-1" />
                Março 2025
              </div>
            }
          >
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <Treemap
                  data={processedData.expensesByCategory.map(cat => ({
                    name: cat.name,
                    size: cat.value,
                    color: cat.color
                  }))}
                  dataKey="size"
                  nameKey="name"
                  stroke="#1f2937"
                  strokeWidth={2}
                  content={({ root, depth, x, y, width, height, index, payload, name, value, color }) => {
                    if (width < 20 || height < 20) {
                      return null;
                    }
                    return (
                      <g>
                        <rect
                          x={x}
                          y={y}
                          width={width}
                          height={height}
                          fill={color}
                          className="recharts-treemap-tile cursor-pointer hover:opacity-80 transition-opacity"
                        />
                        <text
                          x={x + width / 2}
                          y={y + height / 2 - 8}
                          textAnchor="middle"
                          fill="#fff"
                          className="recharts-treemap-label text-xs font-medium"
                        >
                          {name}
                        </text>
                        <text
                          x={x + width / 2}
                          y={y + height / 2 + 8}
                          textAnchor="middle"
                          fill="#fff"
                          className="recharts-treemap-label text-xs"
                        >
                          {formatCurrency(value)}
                        </text>
                      </g>
                    );
                  }}
                >
                  <Tooltip content={<CustomTooltip formatter={(value: number) => formatCurrency(value)} />} />
                </Treemap>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}
      
      {/* Análise de Despesas */}
      {activeView === 'expenses' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Despesas por Categoria (Detalhado) */}
          <Card className="lg:col-span-2" title="Despesas por Categoria">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700/50">
                    <th className="text-left py-2 px-4 text-xs font-medium text-gray-400">Categoria</th>
                    <th className="text-right py-2 px-4 text-xs font-medium text-gray-400">Valor</th>
                    <th className="text-right py-2 px-4 text-xs font-medium text-gray-400">% do Total</th>
                    <th className="text-right py-2 px-4 text-xs font-medium text-gray-400">Transações</th>
                    <th className="text-right py-2 px-4 text-xs font-medium text-gray-400">Média por Trans.</th>
                  </tr>
                </thead>
                <tbody>
                  {processedData.expensesByCategory.map((category, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-gray-800/30 hover:bg-gray-800/20 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div
                            className="w-2.5 h-2.5 rounded-full mr-2"
                            style={{ backgroundColor: category.color }}
                          ></div>
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right font-medium">
                        {formatCurrency(category.value)}
                      </td>
                      <td className="py-3 px-4 text-right text-sm">
                        {formatPercentage(category.percentage)}
                      </td>
                      <td className="py-3 px-4 text-right text-sm">
                        {category.transactions}
                      </td>
                      <td className="py-3 px-4 text-right text-sm">
                        {formatCurrency(category.value / category.transactions)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-800/50">
                    <td className="py-3 px-4 font-medium">Total</td>
                    <td className="py-3 px-4 text-right font-medium">
                      {formatCurrency(processedData.totalExpenses)}
                    </td>
                    <td className="py-3 px-4 text-right">100%</td>
                    <td className="py-3 px-4 text-right">
                      {processedData.expenseTransactions.length}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {formatCurrency(processedData.totalExpenses / processedData.expenseTransactions.length)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
          
          {/* Gráfico de Barras Despesas por Categoria */}
          <Card title="Visualização de Despesas">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={processedData.expensesByCategory}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={true} vertical={false} />
                  <XAxis type="number" tick={{ fill: '#9CA3AF' }} />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={{ fill: '#9CA3AF' }} 
                    width={80}
                  />
                  <Tooltip content={<CustomTooltip formatter={(value: number) => formatCurrency(value)} />} />
                  <Bar dataKey="value" name="Valor">
                    {processedData.expensesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          {/* Lista de Transações */}
          <Card className="lg:col-span-3" title="Transações de Despesas">
            <div className="flex justify-between items-center mb-4">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Buscar transações..."
                  className="pl-9 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-white text-sm w-full"
                />
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-sm rounded text-white flex items-center">
                  <ArrowPathIcon className="w-4 h-4 mr-1.5" />
                  Atualizar
                </button>
                <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-sm rounded text-white flex items-center">
                  <PlusIcon className="w-4 h-4 mr-1.5" />
                  Nova Transação
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700/50">
                    <th className="text-left py-2 px-4 text-xs font-medium text-gray-400">Data</th>
                    <th className="text-left py-2 px-4 text-xs font-medium text-gray-400">Descrição</th>
                    <th className="text-left py-2 px-4 text-xs font-medium text-gray-400">Categoria</th>
                    <th className="text-left py-2 px-4 text-xs font-medium text-gray-400">Conta</th>
                    <th className="text-right py-2 px-4 text-xs font-medium text-gray-400">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {processedData.expenseTransactions.map((transaction) => (
                    <tr 
                      key={transaction.id} 
                      className="border-b border-gray-800/30 hover:bg-gray-800/20 transition-colors cursor-pointer"
                    >
                      <td className="py-3 px-4 text-sm">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm font-medium">{transaction.description}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div
                            className="w-2.5 h-2.5 rounded-full mr-2"
                            style={{ backgroundColor: categoryColors[transaction.category] || '#64748B' }}
                          ></div>
                          <span className="text-sm">{transaction.category}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {transaction.accountName}
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-red-400">
                        {formatCurrency(Math.abs(transaction.amount))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
      
      {/* Análise de Receitas */}
      {activeView === 'income' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Receitas por Categoria (Detalhado) */}
          <Card className="lg:col-span-2" title="Receitas por Categoria">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700/50">
                    <th className="text-left py-2 px-4 text-xs font-medium text-gray-400">Categoria</th>
                    <th className="text-right py-2 px-4 text-xs font-medium text-gray-400">Valor</th>
                    <th className="text-right py-2 px-4 text-xs font-medium text-gray-400">% do Total</th>
                    <th className="text-right py-2 px-4 text-xs font-medium text-gray-400">Transações</th>
                  </tr>
                </thead>
                <tbody>
                  {processedData.incomeByCategory.map((category, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-gray-800/30 hover:bg-gray-800/20 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div
                            className="w-2.5 h-2.5 rounded-full mr-2"
                            style={{ backgroundColor: category.color }}
                          ></div>
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-emerald-400">
                        {formatCurrency(category.value)}
                      </td>
                      <td className="py-3 px-4 text-right text-sm">
                        {formatPercentage(category.percentage)}
                      </td>
                      <td className="py-3 px-4 text-right text-sm">
                        {category.transactions}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-800/50">
                    <td className="py-3 px-4 font-medium">Total</td>
                    <td className="py-3 px-4 text-right font-medium text-emerald-400">
                      {formatCurrency(processedData.totalIncome)}
                    </td>
                    <td className="py-3 px-4 text-right">100%</td>
                    <td className="py-3 px-4 text-right">
                      {processedData.incomeTransactions.length}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
          
          {/* Gráfico de Barras Receitas por Categoria */}
          <Card title="Distribuição de Receitas">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={processedData.incomeByCategory}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    dataKey="value"
                    nameKey="name"
                  >
                    {processedData.incomeByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip formatter={(value: number) => formatCurrency(value)} />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          {/* Tendência de Receitas */}
          <Card className="lg:col-span-3" title="Tendência de Receitas">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={historicalData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: '#9CA3AF' }} />
                  <YAxis tick={{ fill: '#9CA3AF' }} />
                  <Tooltip content={<CustomTooltip formatter={(value: number) => formatCurrency(value)} />} />
                  <Line
                    type="monotone"
                    dataKey="income"
                    name="Receitas"
                    stroke="#10B981"
                    fill="#10B981"
                    activeDot={{ r: 6 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          {/* Lista de Transações */}
          <Card className="lg:col-span-3" title="Transações de Receitas">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700/50">
                    <th className="text-left py-2 px-4 text-xs font-medium text-gray-400">Data</th>
                    <th className="text-left py-2 px-4 text-xs font-medium text-gray-400">Descrição</th>
                    <th className="text-left py-2 px-4 text-xs font-medium text-gray-400">Categoria</th>
                    <th className="text-left py-2 px-4 text-xs font-medium text-gray-400">Conta</th>
                    <th className="text-right py-2 px-4 text-xs font-medium text-gray-400">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {processedData.incomeTransactions.map((transaction) => (
                    <tr 
                      key={transaction.id} 
                      className="border-b border-gray-800/30 hover:bg-gray-800/20 transition-colors cursor-pointer"
                    >
                      <td className="py-3 px-4 text-sm">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm font-medium">{transaction.description}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div
                            className="w-2.5 h-2.5 rounded-full mr-2"
                            style={{ backgroundColor: categoryColors[transaction.category] || '#64748B' }}
                          ></div>
                          <span className="text-sm">{transaction.category}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {transaction.accountName}
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-emerald-400">
                        {formatCurrency(transaction.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TransactionAnalysis;