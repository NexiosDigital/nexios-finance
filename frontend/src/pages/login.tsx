import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { signIn } = useAuth();
  
  // Manipular envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        // Mensagens de erro personalizadas com base no código de erro
        if (error.message.includes('Invalid login credentials')) {
          setError('Email ou senha incorretos. Por favor, verifique suas credenciais.');
        } else if (error.message.includes('Email not confirmed')) {
          setError('Email não confirmado. Por favor, verifique sua caixa de entrada.');
        } else {
          setError(error.message || 'Ocorreu um erro ao fazer login. Por favor, tente novamente.');
        }
      } else {
        // Redirecionar para o dashboard após login bem-sucedido
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Erro no login:', err);
      setError('Ocorreu um erro inesperado. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-primary-reverse dark:bg-gradient-dark p-4">
      <Head>
        <title>Login | Nexios Finance</title>
        <meta name="description" content="Acesse sua conta Nexios Finance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white font-display">
            Nexios <span className="text-primary-light">FINANCE</span>
          </h1>
          <p className="mt-2 text-white/70">
            Faça login para acessar sua conta
          </p>
        </div>
        
        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert 
                variant="error" 
                description={error}
                onClose={() => setError(null)}
                className="mb-6"
              />
            )}
            
            <Input
              id="email"
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              leftIcon={<EnvelopeIcon className="w-5 h-5" />}
            />
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium dark:text-text-primary text-gray-700">
                  Senha
                </label>
                <Link 
                  href="/forgot-password"
                  className="text-sm text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                leftIcon={<LockClosedIcon className="w-5 h-5" />}
              />
            </div>
            
            <div>
              <Button
                type="submit"
                isLoading={loading}
                isFullWidth
                size="lg"
              >
                Entrar
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm dark:text-text-secondary text-gray-600">
              Ainda não tem uma conta?{' '}
              <Link
                href="/signup"
                className="text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}