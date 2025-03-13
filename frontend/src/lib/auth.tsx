import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthError, Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase, User } from './supabase';

// Tipos para o contexto de autenticação
type AuthContextType = {
  user: User | null;
  session: Session | null;
  supabaseUser: SupabaseUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ 
    data: Session | null;
    error: AuthError | null;
  }>;
  signUp: (email: string, password: string, name: string) => Promise<{ 
    data: Session | null;
    error: AuthError | null;
  }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ 
    data: {} | null;
    error: AuthError | null;
  }>;
};

// Valor padrão para o contexto quando não houver provider
const defaultContextValue: AuthContextType = {
  user: null,
  session: null,
  supabaseUser: null,
  loading: true,
  signIn: async () => ({ data: null, error: null }),
  signUp: async () => ({ data: null, error: null }),
  signOut: async () => {},
  resetPassword: async () => ({ data: null, error: null }),
};

// Criação do contexto de autenticação
const AuthContext = createContext<AuthContextType>(defaultContextValue);

// Hook personalizado para acessar o contexto de autenticação
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

// Props para o AuthProvider
type AuthProviderProps = {
  children: ReactNode;
};

// Provider de autenticação
export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Efeito para carregar a sessão no carregamento inicial
  useEffect(() => {
    async function loadSession() {
      try {
        // Obter a sessão atual
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        
        if (session?.user) {
          setSupabaseUser(session.user);
          const userData = await loadUserProfile(session.user.id);
          setUser(userData);
        }
      } catch (error) {
        console.error('Erro ao carregar sessão:', error);
      } finally {
        setLoading(false);
      }
    }

    loadSession();
    
    // Configurar listener para mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (session?.user) {
          setSupabaseUser(session.user);
          const userData = await loadUserProfile(session.user.id);
          setUser(userData);
        } else {
          setSupabaseUser(null);
          setUser(null);
        }
      }
    );

    // Cleanup do listener
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Função para carregar o perfil do usuário
  async function loadUserProfile(userId: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Erro ao buscar perfil do usuário:', error);
        return null;
      }
      
      return data as User;
    } catch (error) {
      console.error('Erro ao carregar perfil do usuário:', error);
      return null;
    }
  }

  // Função de login
  async function signIn(email: string, password: string) {
    try {
      const response = await supabase.auth.signInWithPassword({ email, password });
      return response;
    } catch (error) {
      console.error('Erro no login:', error);
      return { data: null, error: error as AuthError };
    }
  }

  // Função de cadastro
  async function signUp(email: string, password: string, name: string) {
    try {
      // Criar o usuário no auth
      const response = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }
        }
      });
      
      if (response.data?.user) {
        // Criar o perfil do usuário na tabela users
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: response.data.user.id,
              email,
              name,
              membership_level: 'basic',
              settings: {}
            }
          ]);
        
        if (profileError) {
          console.error('Erro ao criar perfil do usuário:', profileError);
        }
      }
      
      return response;
    } catch (error) {
      console.error('Erro no cadastro:', error);
      return { data: null, error: error as AuthError };
    }
  }

  // Função de logout
  async function signOut() {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setSupabaseUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

  // Função de redefinição de senha
  async function resetPassword(email: string) {
    try {
      return await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      return { data: null, error: error as AuthError };
    }
  }

  // Valor do contexto
  const value: AuthContextType = {
    user,
    session,
    supabaseUser,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  // Renderizar o provider com o valor do contexto
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}