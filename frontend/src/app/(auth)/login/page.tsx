'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      console.log('🔐 Tentando fazer login com email:', email)
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (loginError) {
        console.error('❌ Erro no login:', loginError.message)
        setError('Email ou senha incorretos')
        return
      }

      console.log('✅ Login bem-sucedido:', data.user?.id)
      
      // Redirecionar após login bem-sucedido
      router.push('/dashboard')
    } catch (err: any) {
      console.error('❌ Erro inesperado no login:', err)
      setError('Ocorreu um erro ao fazer login. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-emerald-900/30 to-gray-900 p-4">
      <div className="w-full max-w-md">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              N
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Bem-vindo de Volta</h1>
          <p className="text-gray-300">Faça login para acessar sua conta</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl overflow-hidden">
          {error && (
            <div className="bg-red-500/20 text-red-300 p-4 border-l-4 border-red-500">
              <p className="font-medium">Erro</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-gray-700/70 border border-gray-600 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-gray-300">Senha</label>
                <a href="#" className="text-xs text-emerald-400 hover:text-emerald-300">
                  Esqueceu a senha?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 rounded-lg bg-gray-700/70 border border-gray-600 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                />
                <button 
                  type="button" 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Lembrar de mim
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-medium hover:from-emerald-700 hover:to-emerald-600 transition-all shadow-lg flex justify-center items-center disabled:opacity-70"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-300">
            Não tem uma conta?{' '}
            <Link href="/register" className="text-emerald-400 hover:text-emerald-300 font-medium">
              Criar Conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}