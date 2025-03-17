'use client';

import React, { useState, useEffect } from 'react';
import { 
  ArrowUpIcon, 
  ArrowDownIcon,
  BanknotesIcon,
  CreditCardIcon,
  ChartBarIcon,
  EyeIcon,
  PresentationChartLineIcon,
  ClockIcon,
  BellIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Dados de exemplo
const monthlyData = [
  { name: 'Jan', income: 5200, expenses: 3800, balance: 1400 },
  { name: 'Fev', income: 5500, expenses: 4200, balance: 1300 },
  { name: 'Mar', income: 5700, expenses: 4100, balance: 1600 },
  { name: 'Abr', income: 5300, expenses: 4300, balance: 1000 },
  { name: 'Mai', income: 6800, expenses: 4600, balance: 2200 },
  { name: 'Jun', income: 7200, expenses: 4800, balance: 2400 },
];

const spendingByCategory = [
  { name: 'Moradia', value: 1800, color: '#0EA5E9' },
  { name: 'Alimentação', value: 1200, color: '#22C55E' },
  { name: 'Transporte', value: 800, color: '#A855F7' },
  { name: 'Lazer', value: 500, color: '#F59E0B' },
  { name: 'Outros', value: 600, color: '#64748B' },
];

const recentTransactions = [
  { id: 1, description: 'Salário', amount: 5200, type: 'income', date: '2025-03-10', category: { name: 'Salário', color: '#22C55E' } },
  { id: 2, description: 'Aluguel', amount: -1500, type: 'expense', date: '2025-03-05', category: { name: 'Moradia', color: '#0EA5E9' } },
  { id: 3, description: 'Supermercado', amount: -350, type: 'expense', date: '2025-03-08', category: { name: 'Alimentação', color: '#A855F7' } },
  { id: 4, description: 'Freelance', amount: 1200, type: 'income', date: '2025-03-15', category: { name: 'Renda Extra', color: '#22C55E' } },
  { id: 5, description: 'Assinatura Netflix', amount: -55, type: 'expense', date: '2025-03-07', category: { name: 'Lazer', color: '#F59E0B' } },
];

const budgets = [
  { id: 1, category: 'Moradia', spent: 1500, limit: 1800, color: '#0EA5E9' },
  { id: 2, category: 'Alimentação', spent: 950, limit: 1200, color: '#22C55E' },
  { id: 3, category: 'Transporte', spent: 420, limit: 800, color: '#A855F7' },
  { id: 4, category: 'Lazer', spent: 520, limit: 500, color: '#F59E0B' },
];

const insights = [
  { 
    id: 1, 
    title: 'Gasto acima do orçamento em Lazer', 
    description: 'Você gastou 104% do orçamento para Lazer este mês', 
    type: 'warning',
    actionText: 'Ver detalhes'
  },
  { 
    id: 2, 
    title: 'Oportunidade de investimento', 
    description: 'Considerando seu perfil e saldo, você poderia investir R$1.500 em um CDB de baixo risco', 
    type: 'opportunity',
    actionText: 'Explorar opções'
  },
  { 
    id: 3, 
    title: 'Economia potencial',
    description: 'Suas despesas com delivery aumentaram 35% neste mês',
    type: 'info',
    actionText: 'Ver análise'
  }
];

// Funções de formatação
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit' }).format(date);
};

// Componentes
const Card = ({ 
  children, 
  className = '', 
  hoverEffect = false 
}: { 
  children: React.ReactNode; 
  className?: string;
  hoverEffect?: boolean;
}) => {
  return (
    <div className={`bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl ${hoverEffect ? 'transition-all hover:shadow-emerald-900/10 hover:border-emerald-500/20 hover:-translate-y-1' : ''} ${className}`}>
      {children}
    </div>
  );
};

const StatCard = ({ 
  title, 
  value, 
  change, 
  icon, 
  trend = 'neutral',
  colorClass = 'from-emerald-500 to-teal-600'
}: { 
  title: string; 
  value: string; 
  change?: string; 
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  colorClass?: string;
}) => {
  const trendColor = 
    trend === 'up' ? 'text-emerald-400' : 
    trend === 'down' ? 'text-red-400' : 
    'text-gray-400';
  
  const trendIcon = 
    trend === 'up' ? <ArrowUpIcon className="w-3 h-3 mr-1" /> : 
    trend === 'down' ? <ArrowDownIcon className="w-3 h-3 mr-1" /> : 
    null;

  return (
    <Card className="p-6 h-full" hoverEffect>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
            {value}
          </h3>
          {change && (
            <div className={`flex items-center text-xs mt-1.5 ${trendColor}`}>
              {trendIcon}
              <span>{change}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClass} text-white`}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

const BudgetProgressBar = ({ 
  category, 
  spent, 
  limit, 
  color 
}: { 
  category: string; 
  spent: number; 
  limit: number; 
  color: string;
}) => {
  const percentage = Math.min(Math.round((spent / limit) * 100), 100);
  const isOverBudget = spent > limit;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: color }}></div>
          <span className="text-sm font-medium">{category}</span>
        </div>
        <div className="text-xs text-gray-400">
          {formatCurrency(spent)} / {formatCurrency(limit)}
        </div>
      </div>
      <div className="w-full bg-gray-700/50 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${isOverBudget ? 'bg-red-500' : ''}`}
          style={{ 
            width: `${percentage}%`,
            backgroundColor: isOverBudget ? undefined : color
          }}
        ></div>
      </div>
      <div className="flex justify-end mt-1">
        <span className={`text-xs ${isOverBudget ? 'text-red-400' : 'text-gray-400'}`}>
          {percentage}%
        </span>
      </div>
    </div>
  );
};

const InsightCard = ({ 
  title, 
  description, 
  type, 
  actionText 
}: { 
  title: string; 
  description: string; 
  type: 'warning' | 'opportunity' | 'info'; 
  actionText: string;
}) => {
  const typeConfig = {
    warning: {
      icon: <BellIcon className="w-5 h-5" />,
      color: 'text-amber-400 bg-amber-400/10'
    },
    opportunity: {
      icon: <PresentationChartLineIcon className="w-5 h-5" />,
      color: 'text-emerald-400 bg-emerald-400/10'
    },
    info: {
      icon: <EyeIcon className="w-5 h-5" />,
      color: 'text-blue-400 bg-blue-400/10'
    }
  };

  return (
    <Card className="p-4" hoverEffect>
      <div className="flex items-start">
        <div className={`p-2 rounded-lg mr-3 ${typeConfig[type].color}`}>
          {typeConfig[type].icon}
        </div>
        <div>
          <h4 className="font-medium text-sm">{title}</h4>
          <p className="text-xs text-gray-400 mt-1">{description}</p>
          <button className="text-xs text-emerald-400 mt-2 flex items-center hover:text-emerald-300 transition-colors">
            {actionText}
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </Card>
  );
};

// Componente principal do Dashboard
const EnhancedDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeTimeRange, setActiveTimeRange] = useState('month');

  // Resumo financeiro
  const totalBalance = 12580.45;
  const totalIncome = 8950.00;
  const totalExpenses = 5372.55;
  
  // Custom tooltip para os gráficos
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 border border-gray-700 rounded-lg shadow-lg">
          <p className="text-xs text-gray-300 mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }} className="text-sm font-medium">
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
            Dashboard Financeiro
          </h1>
          <p className="text-gray-400 mt-1">Bem-vindo de volta, veja o resumo das suas finanças</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 flex">
            <button 
              className={`px-4 py-2 text-sm rounded-lg ${activeTimeRange === 'week' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTimeRange('week')}
            >
              Semana
            </button>
            <button 
              className={`px-4 py-2 text-sm rounded-lg ${activeTimeRange === 'month' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTimeRange('month')}
            >
              Mês
            </button>
            <button 
              className={`px-4 py-2 text-sm rounded-lg ${activeTimeRange === 'year' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTimeRange('year')}
            >
              Ano
            </button>
          </div>
          
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm flex items-center shadow-md shadow-emerald-900/10 transition-colors">
            <PlusIcon className="w-4 h-4 mr-1" />
            Nova Transação
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Saldo Total" 
          value={formatCurrency(totalBalance)}
          change="+ 8.5% este mês" 
          icon={<BanknotesIcon className="w-5 h-5" />}
          trend="up"
          colorClass="from-emerald-500 to-teal-700"
        />
        <StatCard 
          title="Receitas" 
          value={formatCurrency(totalIncome)}
          change="+ 12% este mês" 
          icon={<ArrowUpIcon className="w-5 h-5" />}
          trend="up"
          colorClass="from-blue-500 to-indigo-700"
        />
        <StatCard 
          title="Despesas" 
          value={formatCurrency(totalExpenses)}
          change="+ 5% este mês" 
          icon={<ArrowDownIcon className="w-5 h-5" />}
          trend="down"
          colorClass="from-red-500 to-rose-700"
        />
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-700/50">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`py-3 border-b-2 text-sm font-medium ${
              activeTab === 'overview'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Visão Geral
          </button>
          <button
            className={`py-3 border-b-2 text-sm font-medium ${
              activeTab === 'transactions'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
            }`}
            onClick={() => setActiveTab('transactions')}
          >
            Transações
          </button>
          <button
            className={`py-3 border-b-2 text-sm font-medium ${
              activeTab === 'budgets'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
            }`}
            onClick={() => setActiveTab('budgets')}
          >
            Orçamentos
          </button>
        </nav>
      </div>
      
      {/* Main Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cash Flow Chart */}
          <Card className="lg:col-span-2 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Fluxo de Caixa</h3>
              <div className="text-xs bg-gray-800/70 text-gray-400 px-2 py-1 rounded-md flex items-center">
                <ClockIcon className="w-3 h-3 mr-1" />
                Últimos 6 meses
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F87171" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#F87171" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: '#9CA3AF' }} />
                  <YAxis tick={{ fill: '#9CA3AF' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    wrapperStyle={{ paddingTop: '10px' }}
                    formatter={(value) => <span className="text-xs">{value}</span>} 
                  />
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
                    stroke="#F87171"
                    fill="url(#colorExpenses)"
                    activeDot={{ r: 6 }}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          {/* Spending by Category */}
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Despesas por Categoria</h3>
              <div className="text-xs bg-gray-800/70 text-gray-400 px-2 py-1 rounded-md">Mar 2025</div>
            </div>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendingByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {spendingByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {spendingByCategory.map((category) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <span className="text-sm">{formatCurrency(category.value)}</span>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Budgets */}
          <Card className="lg:col-span-2 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Orçamentos</h3>
              <button className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center">
                Ver todos
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              {budgets.map((budget) => (
                <BudgetProgressBar
                  key={budget.id}
                  category={budget.category}
                  spent={budget.spent}
                  limit={budget.limit}
                  color={budget.color}
                />
              ))}
            </div>
          </Card>
          
          {/* Insights and Financial Tips */}
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Insights</h3>
              <div className="text-xs bg-emerald-600 text-white px-2 py-1 rounded-full">
                Novo
              </div>
            </div>
            <div className="space-y-3">
              {insights.map((insight) => (
                <InsightCard
                  key={insight.id}
                  title={insight.title}
                  description={insight.description}
                  type={insight.type}
                  actionText={insight.actionText}
                />
              ))}
            </div>
          </Card>
          
          {/* Recent Transactions */}
          <Card className="lg:col-span-3 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Transações Recentes</h3>
              <button className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center">
                Ver todas
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700/50">
                    <th className="text-left py-2 px-4 text-xs font-medium text-gray-400">Data</th>
                    <th className="text-left py-2 px-4 text-xs font-medium text-gray-400">Descrição</th>
                    <th className="text-left py-2 px-4 text-xs font-medium text-gray-400">Categoria</th>
                    <th className="text-right py-2 px-4 text-xs font-medium text-gray-400">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction) => (
                    <tr 
                      key={transaction.id} 
                      className="border-b border-gray-800/30 hover:bg-gray-800/20 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm">{formatDate(transaction.date)}</td>
                      <td className="py-3 px-4 text-sm">{transaction.description}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div
                            className="w-2 h-2 rounded-full mr-2"
                            style={{ backgroundColor: transaction.category.color }}
                          ></div>
                          <span className="text-sm">{transaction.category.name}</span>
                        </div>
                      </td>
                      <td
                        className={`py-3 px-4 text-right font-medium ${
                          transaction.amount > 0 ? 'text-emerald-400' : 'text-red-400'
                        }`}
                      >
                        {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
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

export default EnhancedDashboard;