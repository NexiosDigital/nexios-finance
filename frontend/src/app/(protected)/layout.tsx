'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase-client'
import { Sidebar, MobileHeader, MobileMenu } from '@/components/layout'

// Verificar se estamos no cliente
const isBrowser = typeof window !== 'undefined';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<any>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Verificação rigorosa de autenticação
    const checkAuth = async () => {
      try {
        console.log('Verificando autenticação no layout protegido...')
        
        // Obter sessão do Supabase
        const { data, error } = await supabase.auth.getSession()
        
        // Verificar se temos um usuário válido com ID e token válido
        if (data?.session?.user?.id && data.session.access_token) {
          console.log('✅ Usuário autenticado:', data.session.user.id)
          setUser(data.session.user)
          setIsAuthenticated(true)
        } else {
          console.log('❌ Usuário não autenticado, redirecionando para login')
          setIsAuthenticated(false)
          
          // Limpar qualquer resquício de sessão
          if (isBrowser) {
            localStorage.removeItem('supabase.auth.token')
            localStorage.removeItem('supabase.auth.user')
            
            // Redirecionar para login
            window.location.href = '/login'
          }
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        setIsAuthenticated(false)
        
        // Redirecionar em caso de erro
        if (isBrowser) {
          window.location.href = '/login'
        }
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
    
    // Listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(`Evento de autenticação: ${event}`)
      
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user)
        setIsAuthenticated(true)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setIsAuthenticated(false)
        
        if (isBrowser) {
          window.location.href = '/login'
        }
      }
    })
    
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Função de logout
  const handleSignOut = async () => {
    try {
      // Limpar armazenamento local
      if (isBrowser) {
        localStorage.removeItem('supabase.auth.token')
        localStorage.removeItem('supabase.auth.user')
      }
      
      // Fazer logout no Supabase
      await supabase.auth.signOut()
      
      // Redirecionar para login
      if (isBrowser) {
        window.location.href = '/login'
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  // Mostrar carregamento
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-950">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mb-4"></div>
          <p className="text-gray-400">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  // Se não estiver autenticado, mostrar página de redirecionamento
  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-950 flex-col">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mb-4"></div>
        <p className="text-gray-400">Redirecionando para o login...</p>
      </div>
    )
  }

  // Layout principal
  return (
    <div className="flex h-screen bg-gray-950 text-white">
      <div className="hidden md:flex">
        <Sidebar 
          user={user} 
          onSignOut={handleSignOut}
          darkMode={true}
        />
      </div>
      
      <div className="md:hidden">
        <MobileHeader 
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        
        <MobileMenu
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          user={user}
          onSignOut={handleSignOut}
          darkMode={true}
          toggleDarkMode={() => {}}
        />
      </div>
      
      <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
    </div>
  )
}