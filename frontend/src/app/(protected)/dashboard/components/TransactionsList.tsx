'use client';

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