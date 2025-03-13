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
  const [debugInfo, setDebugInfo] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    setDebugInfo('')
    
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
      // Log mais detalhado das tentativas
      console.log('🔐 Tentando criar usuário com email:', email)
      console.log('📄 Dados de registro:', { email, name, passwordLength: password.length })
      
      // Obter URL atual para redirecionamento
      const origin = window.location.origin
      console.log('🔗 URL de origem para redirecionamento:', origin)
      
      // Tentar registrar com opções detalhadas
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            full_name: name,
            preferred_name: name.split(' ')[0]
          },
          emailRedirectTo: `${origin}/auth/callback`
        },
      })

      // Log detalhado da resposta para depuração
      console.log('📊 Resposta do signUp:', JSON.stringify({
        user: data.user ? { 
          id: data.user.id,
          email: data.user.email,
          created_at: data.user.created_at 
        } : null,
        session: data.session ? 'Session Present' : 'No Session',
        hasError: authError ? true : false
      }))
      
      if (authError) {
        // Log completo do erro
        console.error('❌ Erro na autenticação:', authError.message)
        console.error('❌ Código do erro:', authError.status)
        console.error('❌ Detalhes completos do erro:', JSON.stringify(authError))
        
        // Mostrar erro detalhado para o usuário
        setError(`Erro no registro: ${authError.message}`)
        
        // Informações de debugging para desenvolvimento
        setDebugInfo(`Status: ${authError.status || 'N/A'}, Nome: ${authError.name || 'N/A'}, Detalhes: ${JSON.stringify(authError)}`)
        
        setLoading(false)
        return
      }

      // Verificar se temos dados de usuário
      if (!data.user) {
        setError('Não foi possível criar o usuário: dados de usuário ausentes na resposta')
        console.error('❌ Sem dados de usuário na resposta')
        setLoading(false)
        return
      }

      console.log('✅ Usuário criado com sucesso:', data.user.id)
      
      // Verificar se precisamos de confirmação de email
      if (!data.session) {
        console.log('📧 Email de confirmação enviado, aguardando verificação')
        
        // Tratativa específica para confirmação de email
        setSuccess('Conta criada! Por favor, verifique seu email para confirmar o cadastro.')
        
        // Capturar ID para debug
        setDebugInfo(`User ID: ${data.user.id}`)
      } else {
        console.log('✅ Login automático realizado com sucesso')
        setSuccess('Conta criada com sucesso! Redirecionando para o dashboard...')
        
        // Redirecionamento mais rápido quando temos sessão
        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
      }
      
    } catch (err: any) {
      // Captura de qualquer erro não previsto
      console.error('❌ Exceção não tratada:', err)
      console.error('❌ Stack trace:', err.stack)
      
      setError(`Erro inesperado: ${err.message || 'Desconhecido'}`)
      setDebugInfo(`Tipo: ${err.name || 'N/A'}, Stack: ${err.stack ? err.stack.substring(0, 100) + '...' : 'N/A'}`)
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
              {debugInfo && (
                <p className="text-xs mt-2 text-red-400 opacity-80">{debugInfo}</p>
              )}
            </div>
          )}

          {success && (
            <div className="bg-emerald-500/20 text-emerald-300 p-4 border-l-4 border-emerald-500">
              <p className="font-medium">Sucesso</p>
              <p className="text-sm">{success}</p>
              {debugInfo && (
                <p className="text-xs mt-2 opacity-80">{debugInfo}</p>
              )}
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