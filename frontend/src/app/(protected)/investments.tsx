'use client';

import React, { useState } from 'react';
import { 
  ArrowUpRightIcon, 
  ArrowDownRightIcon,
  PlusIcon,
  DocumentChartBarIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
  GlobeAmericasIcon,
  ShoppingBagIcon,
  HomeIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { 
  PieChart, 
  Pie, 
  Cell, 
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

// Tipos para os investimentos
type InvestmentType = 'stock' | 'etf' | 'bond' | 'mutual_fund' | 'crypto' | 'real_estate' | 'savings' | 'other';

interface Investment {
  id: string;
  name: string;
  type: InvestmentType;
  ticker?: string;
  institution: string;
  initialValue: number;
  currentValue: number;
  quantity?: number;
  purchaseDate: string;
  lastUpdated: string;
  returnPercentage: number;
  annualizedReturn?: number;
  notes?: string;
  color: string;
}

interface AssetAllocation {
  type: string;
  value: number;
  percentage: number;
  color: string;
}

interface PerformanceData {
  date: string;
  value: number;
  benchmark?: number;
}

// Dados de exemplo
const sampleInvestments: Investment[] = [
  {
    id: '1',
    name: 'Tesouro IPCA+ 2030',
    type: 'bond',
    ticker: 'IPCA+2030',
    institution: 'Tesouro Direto',
    initialValue: 10000,
    currentValue: 11850,
    purchaseDate: '2023-05-15',
    lastUpdated: '2025-03-14',
    returnPercentage: 18.5,
    annualizedReturn: 9.8,
    color: '#10B981'
  },
  {
    id: '2',
    name: 'ETF BOVA11',
    type: 'etf',
    ticker: 'BOVA11',
    institution: 'XP Investimentos',
    initialValue: 8000,
    currentValue: 8560,
    quantity: 80,
    purchaseDate: '2023-08-20',
    lastUpdated: '2025-03-14',
    returnPercentage: 7.0,
    annualizedReturn: 4.5,
    color: '#3B82F6'
  },
  {
    id: '3',
    name: 'Ações PETR4',
    type: 'stock',
    ticker: 'PETR4',
    institution: 'Clear',
    initialValue: 5000,
    currentValue: 5750,
    quantity: 200,
    purchaseDate: '2024-01-10',
    lastUpdated: '2025-03-14',
    returnPercentage: 15.0,
    annualizedReturn: 14.2,
    color: '#6366F1'
  },
  {
    id: '4',
    name: 'Fundo Imobiliário KNCR11',
    type: 'real_estate',
    ticker: 'KNCR11',
    institution: 'Modal Mais',
    initialValue: 6000,
    currentValue: 6360,
    quantity: 60,
    purchaseDate: '2023-10-05',
    lastUpdated: '2025-03-14',
    returnPercentage: 6.0,
    annualizedReturn: 4.2,
    color: '#F59E0B'
  },
  {
    id: '5',
    name: 'CDB Banco XYZ',
    type: 'bond',
    institution: 'Banco XYZ',
    initialValue: 15000,
    currentValue: 16350,
    purchaseDate: '2023-11-15',
    lastUpdated: '2025-03-14',
    returnPercentage: 9.0,
    annualizedReturn: 6.8,
    color: '#0EA5E9'
  },
  {
    id: '6',
    name: 'Bitcoin',
    type: 'crypto',
    ticker: 'BTC',
    institution: 'Binance',
    initialValue: 4000,
    currentValue: 6800,
    quantity: 0.05,
    purchaseDate: '2023-06-01',
    lastUpdated: '2025-03-14',
    returnPercentage: 70.0,
    annualizedReturn: 42.5,
    color: '#F97316'
  },
  {
    id: '7',
    name: 'Fundo de Investimento XP',
    type: 'mutual_fund',
    institution: 'XP Investimentos',
    initialValue: 12000,
    currentValue: 13560,
    purchaseDate: '2023-09-10',
    lastUpdated: '2025-03-14',
    returnPercentage: 13.0,
    annualizedReturn: 8.7,
    color: '#8B5CF6'
  },
  {
    id: '8',
    name: 'Poupança',
    type: 'savings',
    institution: 'Banco do Brasil',
    initialValue: 5000,
    currentValue: 5275,
    purchaseDate: '2023-12-01',
    lastUpdated: '2025-03-14',
    returnPercentage: 5.5,
    annualizedReturn: 4.5,
    color: '#94A3B8'
  }
];

const performanceHistory: PerformanceData[] = [
  { date: '2024-10', value: 55000, benchmark: 55000 },
  { date: '2024-11', value: 56200, benchmark: 55800 },
  { date: '2024-12', value: 57100, benchmark: 56900 },
  { date: '2025-01', value: 59800, benchmark: 58500 },
  { date: '2025-02', value: 63500, benchmark: 61200 },
  { date: '2025-03', value: 68500, benchmark: 62800 }
];

const monthlyReturns = [
  { month: 'Out', return: 2.1 },
  { month: 'Nov', return: 1.6 },
  { month: 'Dez', return: -0.3 },
  { month: 'Jan', return: 4.7 },
  { month: 'Fev', return: 6.2 },
  { month: 'Mar', return: 3.5 }
];

const riskMetrics = [
  { subject: 'Rentabilidade', A: 85, fullMark: 100 },
  { subject: 'Volatilidade', A: 65, fullMark: 100 },
  { subject: 'Sharpe', A: 70, fullMark: 100 },
  { subject: 'Drawdown', A: 80, fullMark: 100 },
  { subject: 'Correlação', A: 60, fullMark: 100 },
  { subject: 'Liquidez', A: 90, fullMark: 100 },
];

// Funções utilitárias para cálculos e formatação
const calculateTotalValue = (investments: Investment[]) => {
  return investments.reduce((total, investment) => total + investment.currentValue, 0);
};

const calculateTotalReturn = (investments: Investment[]) => {
  const totalInitial = investments.reduce((total, investment) => total + investment.initialValue, 0);
  const totalCurrent = investments.reduce((total, investment) => total + investment.currentValue, 0);
  
  return {
    value: totalCurrent - totalInitial,
    percentage: ((totalCurrent - totalInitial) / totalInitial) * 100
  };
};

const calculateAssetAllocation = (investments: Investment[]): AssetAllocation[] => {
  const totalValue = calculateTotalValue(investments);
  const allocationMap = new Map<string, { value: number, color: string }>();
  
  // Agrupar por tipo de investimento
  investments.forEach(investment => {
    const typeLabel = getInvestmentTypeLabel(investment.type);
    const current = allocationMap.get(typeLabel) || { value: 0, color: investment.color };
    allocationMap.set(typeLabel, {
      value: current.value + investment.currentValue,
      color: current.color
    });
  });
  
  // Converter para o formato necessário
  const allocation: AssetAllocation[] = [];
  allocationMap.forEach((data, type) => {
    allocation.push({
      type,
      value: data.value,
      percentage: (data.value / totalValue) * 100,
      color: data.color
    });
  });
  
  return allocation.sort((a, b) => b.value - a.value);
};

const getInvestmentTypeLabel = (type: InvestmentType): string => {
  const typeMap: Record<InvestmentType, string> = {
    stock: 'Ações',
    etf: 'ETFs',
    bond: 'Renda Fixa',
    mutual_fund: 'Fundos',
    crypto: 'Criptomoedas',
    real_estate: 'Fundos Imobiliários',
    savings: 'Poupança',
    other: 'Outros'
  };
  
  return typeMap[type] || type;
};

const getInvestmentTypeIcon = (type: InvestmentType) => {
  const iconMap: Record<InvestmentType, React.ReactNode> = {
    stock: <ChartBarIcon className="w-5 h-5" />,
    etf: <GlobeAmericasIcon className="w-5 h-5" />,
    bond: <BuildingLibraryIcon className="w-5 h-5" />,
    mutual_fund: <DocumentChartBarIcon className="w-5 h-5" />,
    crypto: <CurrencyDollarIcon className="w-5 h-5" />,
    real_estate: <HomeIcon className="w-5 h-5" />,
    savings: <BanknotesIcon className="w-5 h-5" />,
    other: <ShoppingBagIcon className="w-5 h-5" />
  };
  
  return iconMap[type] || <DocumentChartBarIcon className="w-5 h-5" />;
};

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

// Componentes
const Card = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => {
  return (
    <div className={`bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl ${className}`}>
      {children}
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
            style={{ color: entry.color || entry.stroke }}
          >
            {entry.name}: {formatter ? formatter(entry.value) : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Componente principal
const InvestmentPortfolio = () => {
  const [investments] = useState<Investment[]>(sampleInvestments);
  const [selectedView, setSelectedView] = useState<'overview' | 'details' | 'performance'>('overview');
  
  const totalValue = calculateTotalValue(investments);
  const totalReturn = calculateTotalReturn(investments);
  const assetAllocation = calculateAssetAllocation(investments);
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
            Carteira de Investimentos
          </h1>
          <p className="text-gray-400 mt-1">Acompanhe e analise seus investimentos</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 flex">
            <button 
              className={`px-4 py-2 text-sm rounded-lg ${selectedView === 'overview' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setSelectedView('overview')}
            >
              Visão Geral
            </button>
            <button 
              className={`px-4 py-2 text-sm rounded-lg ${selectedView === 'details' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setSelectedView('details')}
            >
              Ativos
            </button>
            <button 
              className={`px-4 py-2 text-sm rounded-lg ${selectedView === 'performance' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setSelectedView('performance')}
            >
              Performance
            </button>
          </div>
          
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm flex items-center shadow-md shadow-emerald-900/10 transition-colors">
            <PlusIcon className="w-4 h-4 mr-1" />
            Novo Investimento
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Valor Total</p>
              <h3 className="text-2xl font-bold mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                {formatCurrency(totalValue)}
              </h3>
              <p className="text-xs text-gray-400 mt-1">Atualizado em {formatDate(new Date().toISOString())}</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-700 text-white">
              <BanknotesIcon className="w-5 h-5" />
            </div>
          </div>
        </Card>
        
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Retorno Total</p>
              <h3 className="text-2xl font-bold mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                {formatCurrency(totalReturn.value)}
              </h3>
              <div className={`flex items-center text-xs mt-1 ${totalReturn.percentage >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {totalReturn.percentage >= 0 ? (
                  <ArrowUpRightIcon className="w-3 h-3 mr-1" />
                ) : (
                  <ArrowDownRightIcon className="w-3 h-3 mr-1" />
                )}
                <span>{formatPercentage(totalReturn.percentage)}</span>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${totalReturn.percentage >= 0 ? 'bg-gradient-to-br from-emerald-500 to-emerald-700' : 'bg-gradient-to-br from-red-500 to-red-700'} text-white`}>
              {totalReturn.percentage >= 0 ? (
                <ArrowUpRightIcon className="w-5 h-5" />
              ) : (
                <ArrowDownRightIcon className="w-5 h-5" />
              )}
            </div>
          </div>
        </Card>
        
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Ativos</p>
              <h3 className="text-2xl font-bold mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                {investments.length}
              </h3>
              <p className="text-xs text-gray-400 mt-1">{assetAllocation.length} classes de ativos</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-700 text-white">
              <DocumentChartBarIcon className="w-5 h-5" />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Visão Geral da Carteira */}
      {selectedView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alocação de Ativos */}
          <Card className="lg:col-span-2 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Alocação de Ativos</h3>
              <button className="text-emerald-400 hover:text-emerald-300 text-xs flex items-center transition-colors">
                <ArrowPathIcon className="w-3 h-3 mr-1" />
                Atualizar
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={assetAllocation}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="type"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {assetAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      content={<CustomTooltip formatter={(value: number) => formatCurrency(value)} />} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {assetAllocation.map((asset, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: asset.color }}
                      ></div>
                      <span className="text-sm">{asset.type}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{formatCurrency(asset.value)}</div>
                      <div className="text-xs text-gray-400">{formatPercentage(asset.percentage)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          
          {/* Performance Histórica */}
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Performance</h3>
              <div className="text-xs bg-gray-800/70 text-gray-400 px-2 py-1 rounded-md">
                6 meses
              </div>
            </div>
            <div className="h-48 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceHistory}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                  <XAxis dataKey="date" tick={{ fill: '#9CA3AF' }} />
                  <YAxis tick={{ fill: '#9CA3AF' }} />
                  <Tooltip content={<CustomTooltip formatter={(value: number) => formatCurrency(value)} />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    name="Carteira"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="benchmark"
                    name="Benchmark"
                    stroke="#94A3B8"
                    strokeDasharray="4 2"
                    strokeWidth={2}
                    dot={{ r: 3, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-gray-800/70 rounded-lg p-3">
              <div className="text-sm mb-2">Melhores Ativos</div>
              {investments
                .sort((a, b) => b.returnPercentage - a.returnPercentage)
                .slice(0, 3)
                .map((investment, index) => (
                  <div key={index} className="flex items-center justify-between py-1">
                    <div className="flex items-center">
                      <div
                        className="w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: investment.color }}
                      ></div>
                      <span className="text-sm truncate max-w-28">{investment.name}</span>
                    </div>
                    <div className="text-emerald-400 text-sm font-medium">
                      +{formatPercentage(investment.returnPercentage)}
                    </div>
                  </div>
                ))}
            </div>
          </Card>
          
          {/* Detalhes dos Investimentos */}
          <Card className="lg:col-span-3 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Seus Investimentos</h3>
              <button 
                className="text-emerald-400 hover:text-emerald-300 text-xs flex items-center transition-colors"
                onClick={() => setSelectedView('details')}
              >
                Ver todos
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700/50">
                    <th className="text-left py-2 px-4 text-xs font-medium text-gray-400">Nome</th>
                    <th className="text-left py-2 px-4 text-xs font-medium text-gray-400">Tipo</th>
                    <th className="text-right py-2 px-4 text-xs font-medium text-gray-400">Valor Inicial</th>
                    <th className="text-right py-2 px-4 text-xs font-medium text-gray-400">Valor Atual</th>
                    <th className="text-right py-2 px-4 text-xs font-medium text-gray-400">Retorno</th>
                  </tr>
                </thead>
                <tbody>
                  {investments.slice(0, 5).map((investment) => (
                    <tr 
                      key={investment.id} 
                      className="border-b border-gray-800/30 hover:bg-gray-800/20 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div
                            className="w-2 h-2 rounded-full mr-2"
                            style={{ backgroundColor: investment.color }}
                          ></div>
                          <span className="text-sm">{investment.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {getInvestmentTypeLabel(investment.type)}
                      </td>
                      <td className="py-3 px-4 text-right text-sm">
                        {formatCurrency(investment.initialValue)}
                      </td>
                      <td className="py-3 px-4 text-right text-sm">
                        {formatCurrency(investment.currentValue)}
                      </td>
                      <td className={`py-3 px-4 text-right font-medium ${
                        investment.returnPercentage >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {investment.returnPercentage >= 0 ? '+' : ''}
                        {formatPercentage(investment.returnPercentage)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
      
      {/* Detalhes dos Investimentos */}
      {selectedView === 'details' && (
        <div>
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Todos os Investimentos</h3>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar investimento..."
                    className="py-1.5 px-3 pr-8 text-sm rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-emerald-500"
                  />
                  <svg className="w-4 h-4 text-gray-400 absolute right-2.5 top-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <select className="py-1.5 px-3 text-sm rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-emerald-500">
                  <option value="">Todos os Tipos</option>
                  <option value="stock">Ações</option>
                  <option value="etf">ETFs</option>
                  <option value="bond">Renda Fixa</option>
                  <option value="mutual_fund">Fundos</option>
                  <option value="crypto">Criptomoedas</option>
                  <option value="real_estate">Fundos Imobiliários</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700/50">
                    <th className="text-left py-2 px-4 text-xs font-medium text-gray-400">Nome</th>
                    <th className="text-left py-2 px-4 text-xs font-medium text-gray-400">Tipo</th>
                    <th className="text-left py-2 px-4 text-xs font-medium text-gray-400">Instituição</th>
                    <th className="text-right py-2 px-4 text-xs font-medium text-gray-400">Valor Inicial</th>
                    <th className="text-right py-2 px-4 text-xs font-medium text-gray-400">Valor Atual</th>
                    <th className="text-right py-2 px-4 text-xs font-medium text-gray-400">Retorno</th>
                    <th className="text-right py-2 px-4 text-xs font-medium text-gray-400">Retorno Anual</th>
                    <th className="text-center py-2 px-4 text-xs font-medium text-gray-400">Data de Compra</th>
                  </tr>
                </thead>
                <tbody>
                  {investments.map((investment) => (
                    <tr 
                      key={investment.id} 
                      className="border-b border-gray-800/30 hover:bg-gray-800/20 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div
                            className="w-2 h-2 rounded-full mr-2"
                            style={{ backgroundColor: investment.color }}
                          ></div>
                          <span className="text-sm font-medium">{investment.name}</span>
                          {investment.ticker && (
                            <span className="text-xs text-gray-400 ml-2">({investment.ticker})</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="p-1 rounded-md bg-gray-700/80 mr-2 text-gray-300">
                            {getInvestmentTypeIcon(investment.type)}
                          </div>
                          <span className="text-sm">{getInvestmentTypeLabel(investment.type)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{investment.institution}</td>
                      <td className="py-3 px-4 text-right text-sm">
                        {formatCurrency(investment.initialValue)}
                      </td>
                      <td className="py-3 px-4 text-right text-sm">
                        {formatCurrency(investment.currentValue)}
                      </td>
                      <td className={`py-3 px-4 text-right font-medium ${
                        investment.returnPercentage >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {investment.returnPercentage >= 0 ? '+' : ''}
                        {formatPercentage(investment.returnPercentage)}
                      </td>
                      <td className={`py-3 px-4 text-right text-sm ${
                        (investment.annualizedReturn || 0) >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {investment.annualizedReturn ? (
                          <>
                            {investment.annualizedReturn >= 0 ? '+' : ''}
                            {formatPercentage(investment.annualizedReturn)}
                          </>
                        ) : '-'}
                      </td>
                      <td className="py-3 px-4 text-center text-sm">
                        {formatDate(investment.purchaseDate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
      
      {/* Análise de Performance */}
      {selectedView === 'performance' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfico de Evolução Patrimonial */}
          <Card className="lg:col-span-2 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Evolução Patrimonial</h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-1 bg-emerald-500"></div>
                  <span className="text-xs text-gray-400">Carteira</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-1 bg-gray-500"></div>
                  <span className="text-xs text-gray-400">Benchmark</span>
                </div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceHistory}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                  <XAxis dataKey="date" tick={{ fill: '#9CA3AF' }} />
                  <YAxis tick={{ fill: '#9CA3AF' }} />
                  <Tooltip content={<CustomTooltip formatter={(value: number) => formatCurrency(value)} />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    name="Carteira"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="benchmark"
                    name="Benchmark"
                    stroke="#94A3B8"
                    strokeDasharray="4 2"
                    strokeWidth={2}
                    dot={{ r: 3, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          {/* Retornos Mensais */}
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Retornos Mensais</h3>
              <div className="text-xs bg-gray-800/70 text-gray-400 px-2 py-1 rounded-md">
                Últimos 6 meses
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyReturns}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: '#9CA3AF' }} />
                  <YAxis tick={{ fill: '#9CA3AF' }} />
                  <Tooltip 
                    content={<CustomTooltip formatter={(value: number) => `${value.toFixed(2)}%`} />} 
                  />
                  <Bar 
                    dataKey="return" 
                    name="Retorno" 
                    radius={[4, 4, 0, 0]}
                  >
                    {monthlyReturns.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.return >= 0 ? '#10B981' : '#EF4444'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          {/* Métricas de Risco */}
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Métricas de Risco e Retorno</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart 
                  cx="50%" 
                  cy="50%" 
                  outerRadius="80%" 
                  data={riskMetrics}
                >
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#9CA3AF' }} />
                  <Radar
                    name="Carteira"
                    dataKey="A"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.6}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          {/* Detalhes de Performance por Tipo de Ativo */}
          <Card className="lg:col-span-2 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Performance por Classe de Ativo</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700/50">
                    <th className="text-left py-2 px-4 text-xs font-medium text-gray-400">Tipo de Ativo</th>
                    <th className="text-right py-2 px-4 text-xs font-medium text-gray-400">Alocação</th>
                    <th className="text-right py-2 px-4 text-xs font-medium text-gray-400">Valor Total</th>
                    <th className="text-right py-2 px-4 text-xs font-medium text-gray-400">Retorno Médio</th>
                    <th className="text-right py-2 px-4 text-xs font-medium text-gray-400">Contribuição</th>
                  </tr>
                </thead>
                <tbody>
                  {assetAllocation.map((asset, index) => {
                    // Calcular retorno médio por tipo de ativo
                    const assetsOfType = investments.filter(
                      inv => getInvestmentTypeLabel(inv.type) === asset.type
                    );
                    const avgReturn = assetsOfType.reduce(
                      (acc, inv) => acc + inv.returnPercentage, 
                      0
                    ) / assetsOfType.length;
                    
                    // Contribuição para o retorno total (proporcional à alocação)
                    const contribution = (avgReturn * asset.percentage) / 100;
                    
                    return (
                      <tr 
                        key={index} 
                        className="border-b border-gray-800/30 hover:bg-gray-800/20 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div
                              className="w-2 h-2 rounded-full mr-2"
                              style={{ backgroundColor: asset.color }}
                            ></div>
                            <span className="text-sm">{asset.type}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right text-sm">
                          {formatPercentage(asset.percentage)}
                        </td>
                        <td className="py-3 px-4 text-right text-sm">
                          {formatCurrency(asset.value)}
                        </td>
                        <td className={`py-3 px-4 text-right font-medium ${
                          avgReturn >= 0 ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {avgReturn >= 0 ? '+' : ''}
                          {formatPercentage(avgReturn)}
                        </td>
                        <td className={`py-3 px-4 text-right text-sm ${
                          contribution >= 0 ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {contribution >= 0 ? '+' : ''}
                          {formatPercentage(contribution)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InvestmentPortfolio;