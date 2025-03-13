import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const { signUp } = useAuth();
  
  // Verificar força da senha
  const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
    // Senha vazia é considerada fraca
    if (!password) return 'weak';
    
    let strength = 0;
    
    // Verificar comprimento
    if (password.length >= 8) strength += 1;
    
    // Verificar letras minúsculas
    if (/[a-z]/.test(password)) strength += 1;
    
    // Verificar letras maiúsculas
    if (/[A-Z]/.test(password)) strength += 1;
    
    // Verificar números
    if (/[0-9]/.test(password)) strength += 1;
    
    // Verificar caracteres especiais
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
    
    // Classificar força da senha
    if (strength <= 2) return 'weak';
    if (strength <= 4) return 'medium';
    return 'strong';
  };
  
  const passwordStrength = getPasswordStrength(password);
  
  // Manipular envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar senha
    if (passwordStrength === 'weak') {
      setError('A senha é muito fraca. Use pelo menos 8 caracteres com letras, números e caracteres especiais.');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const { error, data } = await signUp(email, password, name);
      
      if (error) {
        // Mensagens de erro personalizadas
        if (error.message.includes('already registered')) {
          setError('Este email já está registrado. Tente fazer login ou recuperar sua senha.');
        } else {
          setError(error.message || 'Ocorreu um erro ao criar sua conta. Por favor, tente novamente.');
        }
      } else {
        // Verificar se é necessário confirmar o email
        if (data?.user && !data.session) {
          setSuccess('Conta criada com sucesso! Verifique seu email para confirmar o cadastro.');
        } else {
          // Redirecionar para o dashboard se o login for automático
          router.push('/dashboard');
        }
      }
    } catch (err) {
      console.error('Erro no cadastro:', err);
      setError('Ocorreu um erro inesperado. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-primary-reverse dark:bg-gradient-dark p-4">
      <Head>
        <title>Cadastro | Nexios Finance</title>
        <meta name="description" content="Crie sua conta Nexios Finance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white font-display">
            Nexios <span className="text-primary-light">FINANCE</span>
          </h1>
          <p className="mt-2 text-white/70">
            Crie sua conta e comece a gerenciar suas finanças
          </p>
        </div>
        
        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8">
          {success ? (
            <div className="text-center">
              <Alert 
                variant="success" 
                title="Cadastro realizado!"
                description={success}
                className="mb-6"
              />
              
              <p className="mb-6 dark:text-text-secondary text-gray-600">
                Verifique seu email para confirmar o cadastro e ativar sua conta.
              </p>
              
              <Link href="/login">
                <Button variant="primary" isFullWidth>
                  Ir para o login
                </Button>
              </Link>
            </div>
          ) : (
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
                id="name"
                type="text"
                label="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                required
                leftIcon={<UserIcon className="w-5 h-5" />}
              />
              
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
                <Input
                  id="password"
                  type="password"
                  label="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo de 8 caracteres"
                  required
                  leftIcon={<LockClosedIcon className="w-5 h-5" />}
                  hint="Use uma combinação de letras, números e símbolos."
                />
                
                {password && (
                  <div className="mt-2">
                    <div className="flex items-center">
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden">
                        <div 
                          className={classNames(
                            "h-full", 
                            {
                              'w-1/3 bg-red-500': passwordStrength === 'weak',
                              'w-2/3 bg-amber-500': passwordStrength === 'medium',
                              'w-full bg-green-500': passwordStrength === 'strong',
                            }
                          )}
                        />
                      </div>
                      <span 
                        className={classNames(
                          "ml-2 text-xs", 
                          {
                            'text-red-500': passwordStrength === 'weak',
                            'text-amber-500': passwordStrength === 'medium',
                            'text-green-500': passwordStrength === 'strong',
                          }
                        )}
                      >
                        {passwordStrength === 'weak' && 'Fraca'}
                        {passwordStrength === 'medium' && 'Média'}
                        {passwordStrength === 'strong' && 'Forte'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <Button
                  type="submit"
                  isLoading={loading}
                  isFullWidth
                  size="lg"
                >
                  Criar conta
                </Button>
              </div>
              
              <div className="text-center">
                <p className="text-sm dark:text-text-secondary text-gray-600">
                  Já possui uma conta?{' '}
                  <Link
                    href="/login"
                    className="text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors"
                  >
                    Entrar
                  </Link>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// Utility function for class names
function classNames(...classes: (string | Record<string, boolean>)[]) {
  return classes
    .filter(Boolean)
    .map((cls) => {
      if (typeof cls === 'string') return cls;
      return Object.entries(cls)
        .filter(([_, value]) => value)
        .map(([key]) => key)
        .join(' ');
    })
    .join(' ');
}