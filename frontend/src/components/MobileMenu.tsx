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

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

// Lista de links da navegação
const navLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'Transações', path: '/transactions', icon: CreditCard },
  { name: 'Orçamentos', path: '/budgets', icon: PieChart },
  { name: 'Investimentos', path: '/investments', icon: Wallet },
  { name: 'Metas', path: '/goals', icon: Target },
  { name: 'Contas a Pagar', path: '/bills', icon: CalendarCheck },
]

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { profile, signOut } = useAuth()
  const pathname = usePathname()
  
  // Verificar se um link está ativo
  const isActiveLink = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }
  
  if (!isOpen) return null
  
  return (
    <>
      {/* Overlay para fechar o menu ao clicar */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-20"
        onClick={onClose}
      />
      
      {/* Menu mobile */}
      <div className="fixed top-16 left-0 bottom-0 w-64 bg-gray-900 z-30 overflow-y-auto">
        {/* Menu de navegação */}
        <nav className="px-4 py-4">
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
                        : 'text-white hover:bg-gray-800'
                    }`}
                    onClick={onClose}
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
            <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center text-white">
              {profile?.name?.charAt(0) || 'U'}
            </div>
            <div className="ml-3 text-white">
              <p className="text-sm font-medium">{profile?.name || 'Usuário'}</p>
              <p className="text-xs text-gray-400">{profile?.email}</p>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Link
              href="/settings"
              className="flex items-center justify-center p-2 text-sm rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
              onClick={onClose}
            >
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Link>
            <button
              onClick={() => {
                signOut()
                onClose()
              }}
              className="flex items-center justify-center p-2 text-sm rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </button>
          </div>
        </div>
      </div>
    </>
  )
}