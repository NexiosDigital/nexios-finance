import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/lib/auth';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { getUserTransactions, Transaction } from '@/lib/supabase';
import { 
  WalletIcon, 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  BanknotesIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CreditCardIcon,
  LightBulbIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {
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
  ResponsiveContainer,
  Legend
} from 'recharts';
import { format, parseISO, isThisMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Interface para as estatísticas financeiras
interface FinancialStats {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpense: number;
  monthlyBalance: number;
  incomeChange: number;
  expenseChange: number;
  balanceChange: number;
}

// Cores para os gráficos
const COLORS = ['#0EAE7B', '#034D2D', '#108765', '#00C49F', '#0A321E'];

export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<FinancialStats>({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpense: 0,
    monthlyBalance: 0,
    incomeChange: 0,
    expenseChange: 0,
    balanceChange: 0,
  });

  // Dados de exemplo para os gráficos (serão substituídos por dados reais)
  const monthlyData = [
    { name: 'Jan', receitas: 8000, despesas: 6200, saldo: 1800 },
    { name: 'Fev', receitas: 7500, despesas: 5800, saldo: 1700 },
    { name: 'Mar', receitas: 9000, despesas: 6400, saldo: 2600 },
    { name: 'Abr', receitas: 8200, despesas: 7000, saldo: 1200 },
    { name: 'Mai', receitas: 8800, despesas: 6500, saldo: 2300 },
    { name: 'Jun', receitas: 9500, despesas: 7200, saldo: 2300 },
  ];
  
  const categoryData = [
    { name: 'Alimentação', value: 2200 },
    { name: 'Moradia', value: 2800 },
    { name: 'Transporte', value: 1200 },
    { name: 'Lazer', value: 800 },
    { name: 'Outros', value: 1500 },
  ];

  // Buscar transações e estatísticas
  useEffect(() => {
    async function fetchData() {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Buscar transações do usuário
        const userTransactions = await getUserTransactions(user.id, {}, { 
          limit: 10,
          sortBy: 'date',
          sortOrder: 'desc'
        });
        
        setTransactions(userTransactions);
        
        // Calcular estatísticas
        calculateFinancialStats(userTransactions);
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [user]);

  // Calcular estatísticas financeiras com base nas transações
  const calculateFinancialStats = (transactions: Transaction[]) => {
    let totalBalance = 0;
    let monthlyIncome = 0;
    let monthlyExpense = 0;
    
    // Filtrar transações do mês atual
    const currentMonthTransactions = transactions.filter(transaction => 
      isThisMonth(parseISO(transaction.date))
    );
    
    // Calcular totais
    currentMonthTransactions.forEach(transaction => {
      if (transaction.amount > 0) {
        monthlyIncome += transaction.amount;
      } else {
        monthlyExpense += Math.abs(transaction.amount);
      }
    });
    
    const monthlyBalance = monthlyIncome - monthlyExpense;
    
    // Simular mudanças percentuais (em um sistema real, isso seria calculado comparando com meses anteriores)
    const incomeChange = 5.2;
    const expenseChange = -2.8;
    const balanceChange = 8.7;
    
    setStats({
      totalBalance: 12500, // Valor de exemplo (seria calculado considerando saldo de contas)
      monthlyIncome,
      monthlyExpense,
      monthlyBalance,
      incomeChange,
      expenseChange,
      balanceChange
    });
  };

  // Formatar valor monetário
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Componente para cartão de estatística
  const StatCard = ({ 
    title, 
    value, 
    icon, 
    change = null,
    isNegativeGood = false
  }: { 
    title: string; 
    value: number | string;
    icon: React.ReactNode;
    change?: number | null;
    isNegativeGood?: boolean;
  }) => {
    const isPositive = change !== null && change > 0;
    const isNegative = change !== null && change < 0;
    
    // Determinar se a mudança é "boa" ou "ruim"
    const isGoodChange = (isPositive && !isNegativeGood) || (isNegative && isNegativeGood);
    const isBadChange = (isPositive && isNegativeGood) || (isNegative && !isNegativeGood);
    
    return (
      <Card className="animate-fade-in">
        <CardContent className="p-5">
          <div className="flex items-start">
            <div className="p-3 rounded-xl bg-primary-light/10 text-primary">
              {icon}
            </div>
            <div className="ml-4">
              <p className="text-sm dark:text-text-secondary text-gray-500">{title}</p>
              <p className="text-2xl font-semibold mt-1">
                {typeof value === 'number' ? formatCurrency(value) : value}
              </p>
              
              {change !== null && (
                <div className="flex items-center mt-1">
                  <div 
                    className={`flex items-center text-xs ${
                      isGoodChange ? 'text-green-500' : 
                      isBadChange ? 'text-red-500' : 
                      'text-gray-500 dark:text-text-secondary'
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpIcon className="w-3 h-3 mr-1" />
                    ) : isNegative ? (
                      <ArrowDownIcon className="w-3 h-3 mr-1" />
                    ) : null}
                    <span>{Math.abs(change).toFixed(1)}% vs. mês anterior</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Componente para renderizar transações recentes
  const TransactionList = () => {
    return (
      <Card className="h-full animate-fade-in">
        <CardHeader
          title="Transações Recentes"
          subtitle="Suas últimas movimentações financeiras"
          icon={<CreditCardIcon className="w-5 h-5" />}
        />
        <CardContent noPadding>
          <div className="divide-y dark:divide-dark-border">
            {transactions.length > 0 ? (
              transactions.slice(0, 5).map((transaction) => (
                <div 
                  key={transaction.id}
                  className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors"
                >
                  <div className="flex items-center">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center mr-3" 
                      style={{ 
                        backgroundColor: transaction.categories?.color 
                          ? `${transaction.categories.color}20` 
                          : transaction.amount > 0 
                            ? '#0EAE7B20' 
                            : '#FF525220'
                      }}
                    >
                      <span 
                        className="text-sm" 
                        style={{ 
                          color: transaction.categories?.color 
                            ? transaction.categories.color 
                            : transaction.amount > 0 
                              ? '#0EAE7B' 
                              : '#FF5252'
                        }}
                      >
                        {transaction.categories?.icon || (transaction.amount > 0 ? '+' : '-')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description || 'Sem descrição'}</p>
                      <p className="text-xs dark:text-text-secondary text-gray-500">
                        {format(parseISO(transaction.date), "d 'de' MMMM", { locale: ptBR })}
                      </p>
                    </div>
                  </div>
                  <div 
                    className={`font-medium ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}
                  >
                    {formatCurrency(transaction.amount)}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-4 text-center dark:text-text-secondary text-gray-500">
                {loading ? 'Carregando transações...' : 'Não há transações para exibir.'}
              </div>
            )}
          </div>
        </CardContent>
        
        {transactions.length > 0 && (
          <CardFooter className="text-center">
            <Link href="/transactions">
              <Button variant="ghost">
                Ver todas as transações
              </Button>
            </Link>
          </CardFooter>
        )}
      </Card>
    );
  };

  // Componente para renderizar insights
  const InsightsList = () => {
    // Exemplos de insights (seriam gerados pelo backend com IA)
    const insights = [
      {
        id: '1',
        title: 'Economia em alimentação',
        description: 'Você gastou 15% menos em alimentação este mês comparado à média dos últimos 3 meses.',
        icon: <LightBulbIcon className="w-5 h-5" />,
        priority: 'low',
        actionText: 'Ver detalhes',
        actionLink: '/insights/1',
      },
      {
        id: '2',
        title: 'Alerta de orçamento',
        description: 'Seu gasto em transporte está 80% acima do orçamento definido.',
        icon: <ExclamationTriangleIcon className="w-5 h-5" />,
        priority: 'high',
        actionText: 'Ajustar orçamento',
        actionLink: '/budgets',
      },
    ];
    
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold px-1">Insights Personalizados</h3>
        
        {insights.map((insight) => (
          <Card key={insight.id} className="animate-fade-in">
            <CardContent>
              <div className="flex">
                <div className={`p-2 rounded-xl mr-4 ${
                  insight.priority === 'low' ? 'bg-blue-500/10 text-blue-500' :
                  insight.priority === 'medium' ? 'bg-amber-500/10 text-amber-500' : 
                  'bg-red-500/10 text-red-500'
                }`}>
                  {insight.icon}
                </div>
                <div>
                  <h4 className="font-semibold">{insight.title}</h4>
                  <p className="text-sm dark:text-text-secondary text-gray-500 mt-1">
                    {insight.description}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link 
                href={insight.actionLink}
                className="text-sm text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors"
              >
                {insight.actionText} →
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <Layout title="Dashboard">
      <div className="space-y-6">
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold mb-1">Olá, {user?.name || 'Usuário'}</h1>
          <p className="text-gray-500 dark:text-text-secondary">
            Aqui está o resumo das suas finanças
          </p>
        </div>
        
        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Saldo Total"
            value={stats.totalBalance}
            icon={<WalletIcon className="w-5 h-5" />}
          />
          <StatCard
            title="Receitas do Mês"
            value={stats.monthlyIncome}
            icon={<ArrowTrendingUpIcon className="w-5 h-5" />}
            change={stats.incomeChange}
          />
          <StatCard
            title="Despesas do Mês"
            value={stats.monthlyExpense}
            icon={<ArrowTrendingDownIcon className="w-5 h-5" />}
            change={stats.expenseChange}
            isNegativeGood={true}
          />
          <StatCard
            title="Saldo Mensal"
            value={stats.monthlyBalance}
            icon={<BanknotesIcon className="w-5 h-5" />}
            change={stats.balanceChange}
          />
        </div>
        
        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Fluxo de Caixa */}
          <Card className="lg:col-span-2 animate-fade-in">
            <CardHeader
              title="Fluxo de Caixa"
              subtitle="Últimos 6 meses"
              icon={<ChartBarIcon className="w-5 h-5" />}
            />
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorReceitas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0EAE7B" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#0EAE7B" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF5252" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#FF5252" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.75)', 
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="receitas" 
                      stroke="#0EAE7B" 
                      fillOpacity={1} 
                      fill="url(#colorReceitas)" 
                      name="Receitas"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="despesas" 
                      stroke="#FF5252" 
                      fillOpacity={1} 
                      fill="url(#colorDespesas)" 
                      name="Despesas"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Distribuição de Despesas */}
          <Card className="animate-fade-in">
            <CardHeader
              title="Despesas por Categoria"
              subtitle="Mês atual"
              icon={<ChartBarIcon className="w-5 h-5" />}
            />
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      nameKey="name"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.75)', 
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Transações e Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TransactionList />
          </div>
          <div>
            <InsightsList />
          </div>
        </div>
      </div>
    </Layout>
  );
}