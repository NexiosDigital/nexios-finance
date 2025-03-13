'use client'

import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Nexios Finance</h1>
          <nav className="space-x-4">
            <Link href="/dashboard" className="text-emerald-400">
              Dashboard
            </Link>
            <Link href="/" className="text-gray-300 hover:text-white">
              Sair
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-6">Painel Financeiro</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Saldo Total</h3>
            <p className="text-2xl text-emerald-400">R$ 12.580,45</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Receitas</h3>
            <p className="text-2xl text-emerald-400">R$ 8.950,00</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Despesas</h3>
            <p className="text-2xl text-red-400">R$ 5.372,55</p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
          <div className="flex space-x-4">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded">
              Nova Transação
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded">
              Ver Relatório
            </button>
          </div>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Transações Recentes</h3>
          <p className="text-gray-400">Suas transações aparecerão aqui.</p>
        </div>
      </main>
    </div>
  )
}