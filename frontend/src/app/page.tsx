'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase-client'

export default function HomePage() {
  const router = useRouter()
  const [checkingSession, setCheckingSession] = useState(true)
  
  // Verificar sessão ao carregar a página
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession()
        if (data.session) {
          // Se já estiver logado, redirecionar para o dashboard
          router.push('/dashboard')
        }
      } catch (error) {
        console.error('Erro ao verificar sessão:', error)
      } finally {
        setCheckingSession(false)
      }
    }
    
    checkSession()
  }, [router])
  
  // Mostrar carregamento enquanto verifica sessão
  if (checkingSession) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-emerald-900/30 to-gray-900">
        <div className="h-20 w-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg animate-pulse">
          N
        </div>
        <p className="mt-4 text-gray-300">Carregando...</p>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 z-10 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white text-xl font-bold">
                N
              </div>
              <span className="ml-2 text-xl font-bold text-white">Nexios Finance</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
              <Link href="/register" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Criar Conta
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-br from-gray-900 via-emerald-900/30 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Tome controle das suas finanças
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Nexios Finance oferece ferramentas inteligentes para você gerenciar suas finanças pessoais, com insights baseados em IA e uma interface premium.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/register" className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-medium px-6 py-3 rounded-lg shadow-lg transition-all text-center">
                  Começar Agora
                </Link>
                <Link href="#features" className="bg-gray-800 text-white hover:bg-gray-700 font-medium px-6 py-3 rounded-lg shadow transition-colors text-center">
                  Saiba Mais
                </Link>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 flex justify-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                <div className="relative">
                  <div className="p-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-4">Dashboard Financeiro</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <div className="h-4 w-3/4 bg-gray-600/70 rounded"></div>
                        <div className="mt-2 h-24 bg-emerald-900/30 rounded flex items-center justify-center">
                          <span className="text-emerald-400">Visualização de Gráficos</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-700/50 p-4 rounded-lg">
                          <div className="h-4 w-1/2 bg-gray-600/70 rounded"></div>
                          <div className="mt-2 h-10 w-3/4 bg-emerald-500/20 rounded"></div>
                        </div>
                        <div className="bg-gray-700/50 p-4 rounded-lg">
                          <div className="h-4 w-1/2 bg-gray-600/70 rounded"></div>
                          <div className="mt-2 h-10 w-3/4 bg-red-500/20 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Recursos Premium</h2>
            <p className="mt-4 text-xl text-gray-300">Desenvolvido para uma experiência excepcional</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Dashboard Intuitivo',
                description: 'Visualize suas finanças com gráficos e indicadores claros e objetivos.'
              },
              {
                title: 'Insights Baseados em IA',
                description: 'Receba recomendações personalizadas para melhorar sua vida financeira.'
              },
              {
                title: 'Design Premium',
                description: 'Interface sofisticada e elegante para uma experiência de usuário superior.'
              },
              {
                title: 'Gestão de Transações',
                description: 'Registre e categorize suas receitas e despesas com facilidade.'
              },
              {
                title: 'Metas Financeiras',
                description: 'Defina objetivos e acompanhe seu progresso com visualizações claras.'
              },
              {
                title: 'Integração com WhatsApp',
                description: 'Registre transações enviando mensagens simples pelo WhatsApp.'
              }
            ].map((feature, i) => (
              <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow hover:bg-gray-800/70">
                <div className="h-12 w-12 rounded-lg bg-emerald-900/50 flex items-center justify-center mb-4">
                  <div className="h-6 w-6 bg-emerald-500 rounded-md"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white text-xl font-bold">
                N
              </div>
              <span className="ml-2 text-xl font-bold text-white">Nexios Finance</span>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-400">© 2025 Nexios Finance. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Keyframes para animação blob */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}