'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Home,
  CreditCard, 
  PieChart, 
  Wallet, 
  Target, 
  CalendarCheck, 
  Settings, 
  LogOut
} from 'lucide-react'

// Lista de links da navegação
const navLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'Transações', path: '/transactions', icon: CreditCard },
  { name: 'Orçamentos', path: '/budgets', icon: PieChart },
  { name: 'Investimentos', path: '/investments', icon: Wallet },
  { name: 'Metas', path: '/goals', icon: Target },
  { name: 'Contas a Pagar', path: '/bills', icon: CalendarCheck },
]

export default function Sidebar() {
  const { profile, signOut } = useAuth()
  const pathname = usePathname()
  
  // Verificar se um link está ativo
  const isActiveLink = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }
  
  return (
    <aside className="w-64 h-full bg-gray-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Link href="/dashboard" className="text-xl font-bold">
          Nexios <span className="text-emerald-500">FINANCE</span>
        </Link>
      </div>
      
      {/* Menu de navegação */}
      <nav className="flex-1 px-4 mt-6">
        <ul className="space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = isActiveLink(link.path)
            
            return (
              <li key={link.path}>
                <Link 
                  href={link.path}
                  className={`flex items-center px-3 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-emerald-600 text-white' 
                      : 'hover:bg-gray-800'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <span>{link.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      
      {/* Informações do usuário */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center">
            {profile?.name?.charAt(0) || 'U'}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">{profile?.name || 'Usuário'}</p>
            <p className="text-xs text-gray-400">{profile?.email}</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Link
            href="/settings"
            className="flex-1 flex items-center justify-center p-2 text-sm rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </Link>
          <button
            onClick={() => signOut()}
            className="flex-1 flex items-center justify-center p-2 text-sm rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </button>
        </div>
      </div>
    </aside>
  )
}