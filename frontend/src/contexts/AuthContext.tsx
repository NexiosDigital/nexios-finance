'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Session, User, AuthError } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'


type AuthContextType = {
  session: Session | null
  user: User | null
  isLoading: boolean
  signUp: (email: string, password: string, fullName: string) => Promise<{
    error: AuthError | null
    data: any
  }>
  signIn: (email: string, password: string) => Promise<{
    error: AuthError | null
    data: any
  }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{
    error: AuthError | null
    data: any
  }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    // Obtém a sessão atual ao carregar
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      setIsLoading(false)
    }

    getSession()

    // Configura o listener para mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setIsLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Registrar um novo usuário
  const signUp = async (email: string, password: string, fullName: string) => {
    const result = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: fullName,
        },
      },
    })

    // Se o cadastro for bem-sucedido, cria o registro do usuário na tabela users
    if (result.data.user) {
      const { error } = await supabase.from('users').insert({
        id: result.data.user.id,
        email: email,
        name: fullName,
        membership_level: 'basic',
        settings: {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (error) console.error('Erro ao criar usuário:', error)
    }

    return result
  }

  // Login de usuário
  const signIn = async (email: string, password: string) => {
    return supabase.auth.signInWithPassword({
      email,
      password,
    })
  }

  // Logout de usuário
  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  // Resetar senha
  const resetPassword = async (email: string) => {
    return supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
  }

  const value = {
    session,
    user,
    isLoading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}