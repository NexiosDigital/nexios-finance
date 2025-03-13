'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    
    // Validação simples
    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      setLoading(false)
      return
    }
    
    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres')
      setLoading(false)
      return
    }
    
    try {
      // 1. Criar a conta de autenticação
      console.log('🔐 Tentando criar usuário com email:', email)
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      })

      if (authError) {
        setError(authError.message)
        console.error('❌ Erro na autenticação:', authError.message)
        return
      }

      console.log('✅ Autenticação criada com sucesso:', data.user?.id)
      
      // 2. Criar o registro do usuário na tabela users
      if (data.user) {
        try {
          console.log('📝 Criando registro na tabela users para o usuário:', data.user.id)
          const { error: dbError } = await supabase.from('users').insert({
            id: data.user.id,
            email,
            name,
            membership_level: 'basic',
            settings: {},
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          
          if (dbError) {
            console.error('❌ Erro ao criar registro de usuário:', dbError)
            setError('Erro ao criar perfil do usuário: ' + dbError.message)
            return
          }
          
          console.log('✅ Registro de usuário criado com sucesso')
          setSuccess('Conta criada com sucesso! Redirecionando para o login...')
          
          // Redirecionar após sucesso
          setTimeout(() => {
            router.push('/login')
          }, 2000)
        } catch (err: any) {
          console.error('❌ Exceção ao criar registro de usuário:', err)
          setError('Erro ao criar perfil: ' + err.message)
        }
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao criar sua conta')
      console.error('❌ Erro inesperado:', err)
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
          <h1 className="text-3xl font-bold text-white mb-2">Crie sua Conta</h1>
          <p className="text-gray-300">Comece sua jornada financeira agora mesmo</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl overflow-hidden">
          {error && (
            <div className="bg-red-500/20 text-red-300 p-4 border-l-4 border-red-500">
              <p className="font-medium">Erro</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-emerald-500/20 text-emerald-300 p-4 border-l-4 border-emerald-500">
              <p className="font-medium">Sucesso</p>
              <p className="text-sm">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Nome Completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-gray-700/70 border border-gray-600 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                placeholder="Seu nome completo"
              />
            </div>

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
              <label className="block text-sm font-medium text-gray-300 mb-1">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full p-3 rounded-lg bg-gray-700/70 border border-gray-600 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                placeholder="••••••••"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Confirmar Senha</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-gray-700/70 border border-gray-600 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                placeholder="••••••••"
              />
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
                  Processando...
                </>
              ) : (
                'Criar Conta'
              )}
            </button>
            
            <div className="pt-3 border-t border-gray-700">
              <p className="text-center text-sm text-gray-400">
                Ao criar uma conta, você concorda com nossos{' '}
                <a href="#" className="text-emerald-400 hover:text-emerald-300">Termos de Serviço</a> e{' '}
                <a href="#" className="text-emerald-400 hover:text-emerald-300">Política de Privacidade</a>.
              </p>
            </div>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-300">
            Já tem uma conta?{' '}
            <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}