'use client';

import React from 'react';

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
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4">
          <div className="text-gray-400 mb-2">Saldo Total</div>
          <div className="text-2xl font-bold text-white">{formatCurrency(balance)}</div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4">
          <div className="text-gray-400 mb-2">Receitas</div>
          <div className="text-2xl font-bold text-emerald-500">{formatCurrency(income)}</div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4">
          <div className="text-gray-400 mb-2">Despesas</div>
          <div className="text-2xl font-bold text-red-500">{formatCurrency(expenses)}</div>
        </div>
      </div>
    </div>
  );
}