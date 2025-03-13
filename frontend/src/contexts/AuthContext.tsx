'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Session, User, AuthError } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { User } from '@/lib/database.types'

type AuthContextType = {
  session: Session | null
  user: SupabaseUser | null
  profile: User | null
  isLoading: boolean
  signUp: (email: string, password: string, name: string) => Promise<{
    error: Error | null;
    data: any;
  }>
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
    data: any;
  }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{
    error: Error | null;
    data: any;
  }>
}

// Valor padrão do contexto
const defaultContextValue: AuthContextType = {
  session: null,
  user: null,
  profile: null,
  isLoading: true,
  signUp: async () => ({ error: null, data: null }),
  signIn: async () => ({ error: null, data: null }),
  signOut: async () => {},
  resetPassword: async () => ({ error: null, data: null }),
}

const AuthContext = createContext<AuthContextType>(defaultContextValue)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [profile, setProfile] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()

  // Carregar dados do usuário pelo ID
  const loadUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Erro ao buscar perfil:', error)
        return null
      }

      return data as User
    } catch (error) {
      console.error('Erro ao carregar perfil:', error)
      return null
    }
  }

  useEffect(() => {
    // Obtém a sessão atual ao carregar
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      
      if (session?.user) {
        setUser(session.user)
        const userProfile = await loadUserProfile(session.user.id)
        setProfile(userProfile)
      }
      
      setIsLoading(false)
    }

    getSession()

    // Configura o listener para mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session)
        
        if (session?.user) {
          setUser(session.user)
          const userProfile = await loadUserProfile(session.user.id)
          setProfile(userProfile)
        } else {
          setUser(null)
          setProfile(null)
        }
        
        setIsLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Registrar um novo usuário
  const signUp = async (email: string, password: string, name: string) => {
    try {
      // Criar conta de autenticação
      const result = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      })

      if (result.error) {
        throw result.error
      }

      // Se o cadastro for bem-sucedido, cria o registro do usuário na tabela users
      if (result.data.user) {
        const { error } = await supabase.from('users').insert({
          id: result.data.user.id,
          email: email,
          name: name,
          membership_level: 'basic',
          settings: {},
        })

        if (error) {
          console.error('Erro ao criar usuário:', error)
          return { error, data: null }
        }
      }

      return { error: null, data: result.data }
    } catch (error: any) {
      console.error('Erro no cadastro:', error)
      return { error, data: null }
    }
  }

  // Login de usuário
  const signIn = async (email: string, password: string) => {
    try {
      const result = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (result.error) {
        throw result.error
      }
      
      return { error: null, data: result.data }
    } catch (error: any) {
      console.error('Erro no login:', error)
      return { error, data: null }
    }
  }

  // Logout de usuário
  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  // Resetar senha
  const resetPassword = async (email: string) => {
    try {
      const result = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      
      if (result.error) {
        throw result.error
      }
      
      return { error: null, data: result.data }
    } catch (error: any) {
      console.error('Erro ao resetar senha:', error)
      return { error, data: null }
    }
  }

  const value = {
    session,
    user,
    profile,
    isLoading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook para usar o contexto de autenticação
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}