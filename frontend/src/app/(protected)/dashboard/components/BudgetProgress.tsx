'use client';

import React from 'react';

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
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
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
    </div>
  );
}