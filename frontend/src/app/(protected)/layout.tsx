'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import MobileHeader from '@/components/MobileHeader'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    // Verificar autenticação e redirecionar se necessário
    if (!isLoading && !user && !isRedirecting) {
      console.log('🚫 Usuário não autenticado, redirecionando para login...')
      setIsRedirecting(true)
      router.push('/login')
    }
    
    // Logar quando autenticado com sucesso
    if (!isLoading && user) {
      console.log('✅ Usuário autenticado no layout protegido:', user.id)
    }
  }, [isLoading, user, router, isRedirecting])

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  // Mostra tela de redirecionamento em vez de tela em branco
  if (!user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-950 flex-col">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mb-4"></div>
        <p className="text-gray-400">Redirecionando para o login...</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-950">
      {/* Sidebar para Desktop */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      
      {/* Mobile Header */}
      <div className="md:hidden">
        <MobileHeader />
      </div>
      
      {/* Conteúdo principal */}
      <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
    </div>
  )
}