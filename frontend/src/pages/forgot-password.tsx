import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { resetPassword } = useAuth();
  
  // Manipular envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await resetPassword(email);
      
      if (error) {
        setError('Não foi possível enviar o email de redefinição. Verifique o endereço e tente novamente.');
      } else {
        setSuccess(true);
      }
    } catch (err) {
      console.error('Erro ao resetar senha:', err);
      setError('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-primary-reverse dark:bg-gradient-dark p-4">
      <Head>
        <title>Esqueci a Senha | Nexios Finance</title>
        <meta name="description" content="Recupere o acesso à sua conta Nexios Finance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white font-display">
            Nexios <span className="text-primary-light">FINANCE</span>
          </h1>
          <p className="mt-2 text-white/70">
            Recupere o acesso à sua conta
          </p>
        </div>
        
        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-bold mb-4 dark:text-text-primary">Esqueceu sua senha?</h2>
          
          {success ? (
            <div className="text-center">
              <Alert
                variant="success"
                title="Email enviado!"
                description="Verifique sua caixa de entrada para redefinir sua senha."
                className="mb-6"
              />
              
              <p className="mb-6 dark:text-text-secondary text-gray-600">
                Enviamos um email com instruções para redefinir sua senha. 
                Se não encontrar o email, verifique também sua pasta de spam.
              </p>
              
              <Button
                variant="secondary"
                onClick={() => {
                  setSuccess(false);
                  setEmail('');
                }}
                className="mb-4"
              >
                Enviar novamente
              </Button>
              
              <div>
                <Link
                  href="/login"
                  className="text-sm text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors"
                >
                  Voltar para o login
                </Link>
              </div>
            </div>
          ) : (
            <>
              <p className="mb-6 text-sm dark:text-text-secondary text-gray-600">
                Informe seu email e enviaremos instruções para redefinir sua senha.
              </p>
              
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
                  <Button
                    type="submit"
                    isLoading={loading}
                    isFullWidth
                    size="lg"
                  >
                    Enviar instruções
                  </Button>
                </div>
                
                <div className="text-center mt-4">
                  <Link
                    href="/login"
                    className="text-sm text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors"
                  >
                    Voltar para o login
                  </Link>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}