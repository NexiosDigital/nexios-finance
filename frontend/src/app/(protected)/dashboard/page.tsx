'use client';

import React from 'react';

export default function DashboardPage() {
  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      <p className="text-gray-300 mt-2">Bem-vindo ao Nexios Finance</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-white">Saldo Total</h2>
          <p className="text-2xl font-bold text-emerald-400 mt-2">R$ 12.580,45</p>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-white">Receitas</h2>
          <p className="text-2xl font-bold text-emerald-400 mt-2">R$ 8.950,00</p>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-white">Despesas</h2>
          <p className="text-2xl font-bold text-red-400 mt-2">R$ 5.372,55</p>
        </div>
      </div>
      
      <div className="mt-6 bg-gray-700 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-white mb-4">Transações Recentes</h2>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 bg-gray-600 rounded">
            <span>Salário</span>
            <span className="text-emerald-400">R$ 5.000,00</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-600 rounded">
            <span>Supermercado</span>
            <span className="text-red-400">R$ 350,25</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-600 rounded">
            <span>Internet</span>
            <span className="text-red-400">R$ 120,00</span>
          </div>
        </div>
      </div>
    </div>
  );
}