import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function LoginTest() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-primary-reverse p-4">
      <Head>
        <title>Login | Nexios Finance</title>
      </Head>
      
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white">
            Nexios <span className="text-primary-light">FINANCE</span>
          </h1>
          <p className="mt-2 text-white text-opacity-70">
            Faça login para acessar sua conta
          </p>
        </div>
        
        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8">
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                placeholder="seu@email.com"
                required
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <Link href="#" className="text-sm text-primary hover:text-primary-dark transition-colors">
                  Esqueceu a senha?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                placeholder="••••••••"
                required
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-primary text-white font-medium hover:shadow-lg transition-all"
              >
                Entrar
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Ainda não tem uma conta?{' '}
              <Link href="#" className="text-primary hover:text-primary-dark transition-colors">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}