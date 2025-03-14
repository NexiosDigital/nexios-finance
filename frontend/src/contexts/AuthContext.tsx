'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Session, User, AuthError } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'
import { User as UserType } from '@/lib/database.types'

// Função utilitária para verificar se estamos no navegador
const isBrowser = typeof window !== 'undefined';

// Função para inicializar a autenticação no cliente
const initializeAuth = async () => {
  if (!isBrowser) return;
  
  try {
    const token = localStorage.getItem('supabase.auth.token');
    if (token) {
      console.log('🔄 Tentando restaurar sessão do token armazenado...');
      await supabase.auth.setSession({ access_token: token, refresh_token: '' });
    }
  } catch (error) {
    console.error('❌ Erro ao inicializar autenticação:', error);
  }
};

type AuthContextType = {
  session: Session | null
  user: User | null
  profile: UserType | null
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserType | null>(null)
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

      return data as UserType
    } catch (error) {
      console.error('Erro ao carregar perfil:', error)
      return null
    }
  }

  useEffect(() => {
    // Inicializar a autenticação apenas no cliente
    if (isBrowser) {
      initializeAuth();
    }
    
    // Obtém a sessão atual ao carregar
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      
      if (session?.user) {
        setUser(session.user)
        const userProfile = await loadUserProfile(session.user.id)
        setProfile(userProfile)
      } else if (isBrowser) {
        // Tentar recuperar do localStorage (nossa solução de contorno)
        const token = localStorage.getItem('supabase.auth.token');
        const storedUser = localStorage.getItem('supabase.auth.user');
        
        if (token && storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            const userProfile = await loadUserProfile(parsedUser.id);
            setProfile(userProfile);
          } catch (e) {
            console.error('Erro ao recuperar usuário do localStorage:', e);
          }
        }
      }
      
      setIsLoading(false)
    }

    getSession()

    // Configura o listener para mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`🔄 Evento de autenticação: ${event}`);
        setSession(session)
        
        if (session?.user) {
          setUser(session.user)
          const userProfile = await loadUserProfile(session.user.id)
          setProfile(userProfile)
          
          // Armazenar manualmente para contingência
          if (isBrowser) {
            localStorage.setItem('supabase.auth.token', session.access_token);
            localStorage.setItem('supabase.auth.user', JSON.stringify(session.user));
          }
        } else {
          setUser(null)
          setProfile(null)
          
          // Limpar armazenamento manual
          if (isBrowser) {
            localStorage.removeItem('supabase.auth.token');
            localStorage.removeItem('supabase.auth.user');
          }
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
      setIsLoading(true);
      
      // Primeiro, limpar qualquer sessão antiga
      await supabase.auth.signOut();
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      // Salvar token manualmente
      if (data.session && isBrowser) {
        localStorage.setItem('supabase.auth.token', data.session.access_token);
        
        // Armazenar informações do usuário para uso offline
        localStorage.setItem('supabase.auth.user', JSON.stringify(data.user));
      }
      
      console.log('✅ Login bem-sucedido no AuthContext, redirecionando...');
      
      // Redirecionamento direto após login bem-sucedido
      window.location.replace('/dashboard');
      
      return { error: null, data };
    } catch (error: any) {
      console.error('❌ Erro no login:', error);
      return { error, data: null };
    } finally {
      setIsLoading(false);
    }
  }

  // Logout de usuário
  const signOut = async () => {
    // Limpar localStorage primeiro
    if (isBrowser) {
      localStorage.removeItem('supabase.auth.token');
      localStorage.removeItem('supabase.auth.user');
    }
    
    // Fazer logout no Supabase
    await supabase.auth.signOut()
    
    // Redirecionar para login
    window.location.href = '/login'
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