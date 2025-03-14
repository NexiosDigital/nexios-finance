'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'
import { Sidebar, MobileHeader } from '@/components/layout'

// Verificar se estamos no cliente
const isBrowser = typeof window !== 'undefined';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Verificar autenticação ao carregar o componente
    const checkAuth = async () => {
      try {
        // Verificar se há token no localStorage (nossa solução de contorno)
        const localToken = isBrowser ? localStorage.getItem('supabase.auth.token') : null;
        
        // Tentar pegar a sessão do Supabase
        const { data } = await supabase.auth.getSession()
        
        if (data.session || localToken) {
          console.log('✅ Usuário autenticado no layout protegido')
          setIsAuthenticated(true)
        } else {
          console.log('🔒 Usuário não autenticado, redirecionando...')
          setIsAuthenticated(false)
          
          // Usar redirecionamento direto do navegador
          if (isBrowser) {
            window.location.replace('/login')
          }
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        setIsAuthenticated(false)
        
        // Usar redirecionamento direto do navegador
        if (isBrowser) {
          window.location.replace('/login')
        }
      }
    }
    
    checkAuth()
  }, [router])

  // Mostre loading enquanto verifica a autenticação
  if (isAuthenticated === null) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  // Se não estiver autenticado, não renderize nada (o redirecionamento já foi acionado)
  if (isAuthenticated === false) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-950 flex-col">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mb-4"></div>
        <p className="text-gray-400">Redirecionando para o login...</p>
      </div>
    )
  }

  // Se estiver autenticado, renderize o layout normalmente
  return (
    <div className="flex h-screen bg-gray-950">
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      
      <div className="md:hidden">
        <MobileHeader />
      </div>
      
      <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
    </div>
  )
}