'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import MobileMenu from './MobileMenu'

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { profile } = useAuth()
  
  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-gray-900 z-10">
        <div className="flex items-center justify-between h-full px-4">
          <Link href="/dashboard" className="text-xl font-bold text-white">
            Nexios <span className="text-emerald-500">FINANCE</span>
          </Link>
          
          <div className="flex items-center">
            <span className="text-white text-sm mr-3 hidden sm:inline-block">
              {profile?.name?.split(' ')[0] || 'Usuário'}
            </span>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      {/* Espaçador para compensar o header fixo */}
      <div className="h-16 md:hidden"></div>
    </>
  )
}