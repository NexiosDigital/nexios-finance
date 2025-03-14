// src/app/(protected)/dashboard/components/DashboardSummary.tsx
import React from 'react';
import { Card } from '@/components/ui/Card';

type DashboardSummaryProps = {
  balance: number;
  income: number;
  expenses: number;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export default function DashboardSummary({ balance, income, expenses }: DashboardSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card>
        <div className="p-4">
          <div className="text-gray-400 mb-2">Saldo Total</div>
          <div className="text-2xl font-bold text-white">{formatCurrency(balance)}</div>
        </div>
      </Card>
      
      <Card>
        <div className="p-4">
          <div className="text-gray-400 mb-2">Receitas</div>
          <div className="text-2xl font-bold text-emerald-500">{formatCurrency(income)}</div>
        </div>
      </Card>
      
      <Card>
        <div className="p-4">
          <div className="text-gray-400 mb-2">Despesas</div>
          <div className="text-2xl font-bold text-red-500">{formatCurrency(expenses)}</div>
        </div>
      </Card>
    </div>
  );
}

// src/app/(protected)/dashboard/components/TransactionsList.tsx
import React from 'react';

type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  category?: {
    name: string;
    color: string;
    icon?: string;
  };
};

type TransactionsListProps = {
  transactions: Transaction[];
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR').format(date);
};

export default function TransactionsList({ transactions }: TransactionsListProps) {
  if (transactions.length === 0) {
    return <div className="text-center py-4 text-gray-400">Nenhuma transação encontrada</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left py-2 px-4">Data</th>
            <th className="text-left py-2 px-4">Descrição</th>
            <th className="text-left py-2 px-4">Categoria</th>
            <th className="text-right py-2 px-4">Valor</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b border-gray-800 hover:bg-gray-800/50">
              <td className="py-3 px-4">{formatDate(transaction.date)}</td>
              <td className="py-3 px-4">{transaction.description}</td>
              <td className="py-3 px-4">
                {transaction.category ? (
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: transaction.category.color }}
                    ></div>
                    {transaction.category.name}
                  </div>
                ) : (
                  'Sem categoria'
                )}
              </td>
              <td
                className={`py-3 px-4 text-right ${
                  transaction.amount >= 0 ? 'text-emerald-500' : 'text-red-500'
                }`}
              >
                {formatCurrency(transaction.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// src/app/(protected)/dashboard/components/IncomeExpenseChart.tsx
'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

type IncomeExpenseChartProps = {
  income: number;
  expenses: number;
};

export default function IncomeExpenseChart({ income, expenses }: IncomeExpenseChartProps) {
  const data = [
    { name: 'Receitas', value: income },
    { name: 'Despesas', value: expenses },
  ];

  const COLORS = ['#0EAE7B', '#ef4444'];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 border border-gray-700 shadow-lg rounded">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// src/app/(protected)/dashboard/components/SpendingByCategoryChart.tsx
'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

type SpendingByCategoryProps = {
  data: {
    category: string;
    amount: number;
    color: string;
  }[];
};

export default function SpendingByCategoryChart({ data }: SpendingByCategoryProps) {
  if (data.length === 0) {
    return <div className="h-64 flex items-center justify-center text-gray-400">Sem dados disponíveis</div>;
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 border border-gray-700 shadow-lg rounded">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="amount"
            nameKey="category"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// src/app/(protected)/dashboard/components/BudgetProgress.tsx
import React from 'react';
import { Card } from '@/components/ui/Card';

type BudgetProgressProps = {
  category: string;
  spent: number;
  limit: number;
  color: string;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export default function BudgetProgress({ category, spent, limit, color }: BudgetProgressProps) {
  const percentage = Math.min(Math.round((spent / limit) * 100), 100);
  const isOverBudget = spent > limit;

  return (
    <Card>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="font-medium">{category}</div>
          <div className={`text-sm ${isOverBudget ? 'text-red-500' : 'text-gray-400'}`}>
            {formatCurrency(spent)} / {formatCurrency(limit)}
          </div>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${isOverBudget ? 'bg-red-500' : ''}`}
            style={{
              width: `${percentage}%`,
              backgroundColor: isOverBudget ? undefined : color
            }}
          ></div>
        </div>
        
        <div className="text-right mt-1 text-sm text-gray-400">
          {percentage}%
        </div>
      </div>
    </Card>
  );
}