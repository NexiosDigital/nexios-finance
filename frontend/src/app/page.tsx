'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase-client'
import { motion } from 'framer-motion'
import { 
  ArrowRightIcon,
  CheckCircleIcon, 
  ChartBarIcon, 
  CreditCardIcon, 
  CurrencyDollarIcon, 
  BellAlertIcon,
  PresentationChartLineIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  WalletIcon,
  ShieldCheckIcon,
  ArrowTrendingUpIcon,
  DevicePhoneMobileIcon,
  ClockIcon,
  LightBulbIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'

export default function HomePage() {
  const [checkingSession, setCheckingSession] = useState(true)
  
  // Verificação de autenticação
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Limpar qualquer token potencialmente inválido
        if (typeof window !== 'undefined') {
          // Verificar se existe um token expirado e removê-lo
          const expiresAt = localStorage.getItem('supabase.auth.expires_at');
          if (expiresAt && parseInt(expiresAt) < Date.now() / 1000) {
            localStorage.removeItem('supabase.auth.token');
            localStorage.removeItem('supabase.auth.refreshToken');
            localStorage.removeItem('supabase.auth.expires_at');
          }
        }
        
        // Obter a sessão atual
        const { data, error } = await supabase.auth.getSession()
        
        // Verificação mais rigorosa da autenticação
        const isTokenValid = data?.session?.expires_at 
          ? data.session.expires_at > Date.now() / 1000 
          : false;
          
        if (data?.session?.user?.id && data.session.access_token && isTokenValid) {
          console.log('Usuário autenticado, redirecionando para o dashboard')
          window.location.href = '/dashboard'
        } else {
          console.log('Usuário não autenticado, mostrando página inicial')
          setCheckingSession(false)
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        setCheckingSession(false)
      }
    }
    
    checkAuth()
  }, [])
  
  // Mostrar carregamento enquanto verifica sessão
  if (checkingSession) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-emerald-900/20 to-gray-900 text-white">
        <div className="flex flex-col items-center">
          <div className="h-20 w-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg animate-pulse">
            N
          </div>
          <p className="mt-6 text-xl font-medium tracking-wide">Nexios Finance</p>
          <p className="mt-2 text-gray-300 animate-pulse">Carregando...</p>
        </div>
      </div>
    )
  }
  
  // Variantes de animação para Framer Motion
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const featureCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.1), 0 10px 10px -5px rgba(16, 185, 129, 0.04)",
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-950 text-white antialiased font-sans overflow-hidden">
      {/* Header with glassmorphism effect */}
      <header className="fixed top-0 z-50 w-full backdrop-blur-md bg-gray-900/80 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center text-white text-xl font-extrabold shadow-md shadow-emerald-600/20">
                N
              </div>
              <span className="ml-2 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">Nexios</span>
              <span className="ml-1 text-xl font-light text-gray-200">Finance</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-300 hover:text-emerald-400 px-3 py-2 text-sm font-medium transition-colors flex items-center">
                Recursos
              </a>
              <a href="#how-it-works" className="text-gray-300 hover:text-emerald-400 px-3 py-2 text-sm font-medium transition-colors flex items-center">
                Como Funciona
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-emerald-400 px-3 py-2 text-sm font-medium transition-colors flex items-center">
                Planos
              </a>
              <a href="#testimonials" className="text-gray-300 hover:text-emerald-400 px-3 py-2 text-sm font-medium transition-colors flex items-center">
                Depoimentos
              </a>
              <a href="#faq" className="text-gray-300 hover:text-emerald-400 px-3 py-2 text-sm font-medium transition-colors flex items-center">
                FAQ
              </a>
            </nav>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Auth Buttons */}
            <div className="hidden md:flex space-x-3">
              <Link href="/login" className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium border border-gray-700 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all">
                Login
              </Link>
              <Link href="/register" className="bg-gradient-to-tr from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md shadow-emerald-900/20 hover:shadow-lg hover:shadow-emerald-900/30">
                Criar Conta
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content with header offset */}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative pt-20 md:pt-32 pb-20 md:pb-32 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
            <div className="absolute top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-40 left-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.15] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          </div>
          
          {/* Hero Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
              {/* Left Column - Text */}
              <motion.div 
                className="lg:col-span-6 text-center lg:text-left mb-10 lg:mb-0"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <div className="inline-block mb-4 py-1 px-3 bg-emerald-900/30 rounded-full">
                  <p className="text-sm text-emerald-400 font-medium">Finanças Pessoais Simplificadas</p>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-300">
                    Gestão financeira 
                  </span>
                  <span className="block mt-2 text-white">para sua vida moderna</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl lg:max-w-none mx-auto lg:mx-0 leading-relaxed">
                  Transforme sua relação com o dinheiro. Controle seus gastos, acompanhe seus investimentos e alcance seus objetivos financeiros com uma plataforma inteligente e intuitiva.
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
                  <Link href="/register" className="group flex items-center justify-center px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white font-medium shadow-lg shadow-emerald-900/20 transition-all">
                    Começar Grátis
                    <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <a href="#how-it-works" className="flex items-center justify-center px-6 py-4 rounded-xl bg-gray-800/60 hover:bg-gray-800 text-white font-medium border border-gray-700/80 hover:border-emerald-500/20 shadow transition-all">
                    Como Funciona
                  </a>
                </div>
                
                {/* Social Proof */}
                <motion.div 
                  className="bg-gray-800/40 border border-gray-700/50 rounded-2xl backdrop-blur-sm p-4 max-w-lg mx-auto lg:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-emerald-400 text-2xl font-bold">25mil+</p>
                      <p className="text-gray-400 text-sm mt-1">Usuários</p>
                    </div>
                    <div className="text-center">
                      <p className="text-emerald-400 text-2xl font-bold">R$150M</p>
                      <p className="text-gray-400 text-sm mt-1">Gerenciados</p>
                    </div>
                    <div className="text-center">
                      <p className="text-emerald-400 text-2xl font-bold">4.9/5</p>
                      <p className="text-gray-400 text-sm mt-1">Avaliação</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Right Column - Dashboard Mockup */}
              <motion.div 
                className="lg:col-span-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                  <div className="relative transform transition-all hover:-translate-y-2 duration-500">
                    <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/10 border border-gray-800/80">
                      {/* Browser Controls */}
                      <div className="bg-gray-800/80 backdrop-blur-sm p-3 rounded-t-2xl border-b border-gray-700/80">
                        <div className="flex items-center">
                          <div className="flex space-x-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                          </div>
                          <div className="mx-auto px-10 py-1 rounded-md bg-gray-700/50 text-xs text-gray-400 max-w-xs truncate">
                            app.nexiosfinance.com/dashboard
                          </div>
                        </div>
                      </div>
                      
                      {/* Dashboard Content */}
                      <div className="bg-gray-900 p-5">
                        <div className="rounded-xl overflow-hidden shadow-lg">
                          {/* Dashboard Header */}
                          <div className="bg-gray-800 p-4 rounded-t-xl border-b border-gray-700/80 flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-white">Dashboard Financeiro</h3>
                            <span className="text-xs text-gray-400 bg-gray-700/70 px-2 py-1 rounded-md">Tempo Real</span>
                          </div>
                          
                          {/* Dashboard Body */}
                          <div className="bg-gray-800/50 p-4 space-y-4">
                            {/* Summary Cards */}
                            <div className="grid grid-cols-3 gap-3">
                              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-xl border border-emerald-500/10 shadow-sm">
                                <p className="text-xs text-gray-400">Saldo Total</p>
                                <p className="text-emerald-400 text-xl font-bold mt-0.5">R$ 12.580</p>
                                <p className="text-green-400 text-xs mt-1 flex items-center">
                                  <span className="w-2 h-2 rounded-full bg-green-400 mr-1"></span>
                                  +2.4%
                                </p>
                              </div>
                              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-xl border border-emerald-500/10 shadow-sm">
                                <p className="text-xs text-gray-400">Receitas</p>
                                <p className="text-emerald-400 text-xl font-bold mt-0.5">R$ 8.950</p>
                                <p className="text-green-400 text-xs mt-1 flex items-center">
                                  <span className="w-2 h-2 rounded-full bg-green-400 mr-1"></span>
                                  +5.1%
                                </p>
                              </div>
                              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-xl border border-emerald-500/10 shadow-sm">
                                <p className="text-xs text-gray-400">Despesas</p>
                                <p className="text-red-400 text-xl font-bold mt-0.5">R$ 5.370</p>
                                <p className="text-red-400 text-xs mt-1 flex items-center">
                                  <span className="w-2 h-2 rounded-full bg-red-400 mr-1"></span>
                                  +1.2%
                                </p>
                              </div>
                            </div>
                            
                            {/* Charts */}
                            <div className="bg-gray-800/80 p-4 rounded-xl border border-gray-700/80 shadow-sm">
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="text-sm font-medium text-white">Balanço Mensal</h4>
                                <div className="text-xs bg-gray-700/70 text-gray-300 px-2 py-0.5 rounded-md">2025</div>
                              </div>
                              <div className="h-40 px-2">
                                <div className="h-full w-full flex items-end space-x-2">
                                  {[60, 70, 45, 90, 110, 80].map((height, i) => (
                                    <div key={i} className="group flex-1 flex flex-col items-center">
                                      <div 
                                        className="w-full rounded-t bg-emerald-500/70 hover:bg-emerald-500 transition-all relative overflow-hidden"
                                        style={{ height: `${height}%` }}
                                      >
                                        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-emerald-600/80 to-transparent"></div>
                                      </div>
                                      <span className="text-xs text-gray-400 mt-1">{['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'][i]}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            {/* Transactions */}
                            <div className="space-y-2">
                              <div className="flex justify-between items-center p-3 bg-gray-800/80 rounded-lg shadow-sm border border-gray-700/50 hover:border-emerald-500/20 transition-all">
                                <div className="flex items-center">
                                  <div className="w-7 h-7 rounded-full bg-emerald-400/20 flex items-center justify-center text-emerald-400 mr-3">
                                    +
                                  </div>
                                  <span>Salário</span>
                                </div>
                                <span className="text-emerald-400">R$ 5.000,00</span>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-gray-800/80 rounded-lg shadow-sm border border-gray-700/50 hover:border-emerald-500/20 transition-all">
                                <div className="flex items-center">
                                  <div className="w-7 h-7 rounded-full bg-red-400/20 flex items-center justify-center text-red-400 mr-3">
                                    -
                                  </div>
                                  <span>Aluguel</span>
                                </div>
                                <span className="text-red-400">R$ 1.800,00</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating UI Elements */}
                    <div className="absolute -top-5 -right-5 bg-gray-800/90 p-3 rounded-xl shadow-xl border border-emerald-500/10 hidden md:block backdrop-blur-sm transform hover:-translate-y-1 transition-all">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                          <CurrencyDollarIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-300">Insight de IA</p>
                          <p className="text-emerald-400 text-sm font-bold">Economia de R$ 850 possível</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute -bottom-5 -left-5 bg-gray-800/90 p-3 rounded-xl shadow-xl border border-emerald-500/10 hidden md:block backdrop-blur-sm transform hover:-translate-y-1 transition-all">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                          <BellAlertIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-300">Alerta Orçamento</p>
                          <p className="text-gray-400 text-xs">Lazer: 92% utilizado</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile App Preview */}
                  <motion.div 
                    className="absolute -bottom-10 -right-10 hidden md:block"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <div className="w-60 h-auto relative bg-gray-800 rounded-xl p-2 shadow-2xl rotate-6 border border-gray-700">
                      <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden shadow-inner">
                        {/* Mobile Status Bar */}
                        <div className="bg-gray-800 p-2 flex justify-between items-center">
                          <span className="text-xs text-gray-400">9:41</span>
                          <div className="flex space-x-1">
                            <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 2h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm10 3H6v2h8V5zm0 4H6v2h8V9zm0 4H6v2h8v-2z" clipRule="evenodd" />
                            </svg>
                            <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5 5a5 5 0 0110 0v2A5 5 0 015 7V5zM0 16.68A19.9 19.9 0 0110 14c3.64 0 7.06.97 10 2.68V20H0v-3.32z" clipRule="evenodd" />
                            </svg>
                            <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 15a7 7 0 100-14 7 7 0 000 14z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        
                        {/* Mobile Content */}
                        <div className="p-3 space-y-3">
                          <div className="flex justify-between items-center">
                            <h5 className="text-sm font-medium text-white">App Nexios</h5>
                            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-xs text-white">N</div>
                          </div>
                          
                          <div className="bg-gray-800 rounded-lg p-2">
                            <p className="text-xs text-emerald-400">Saldo Atual</p>
                            <p className="text-base font-bold text-white">R$ 12.580,45</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-gray-800 p-2 rounded-lg">
                              <p className="text-[10px] text-gray-400">Receitas</p>
                              <p className="text-xs font-medium text-emerald-400">R$ 8.950</p>
                            </div>
                            <div className="bg-gray-800 p-2 rounded-lg">
                              <p className="text-[10px] text-gray-400">Despesas</p>
                              <p className="text-xs font-medium text-red-400">R$ 5.370</p>
                            </div>
                          </div>
                          
                          <div className="bg-gray-800 rounded-lg p-2">
                            <div className="flex justify-between items-center mb-1">
                              <p className="text-[10px] text-gray-400">Metas</p>
                              <span className="text-[10px] text-emerald-400">2/4</span>
                            </div>
                            <div className="w-full bg-gray-700 h-1.5 rounded-full">
                              <div className="bg-emerald-500 h-1.5 rounded-full w-1/2"></div>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2 justify-between">
                            <div className="w-8 h-8 flex items-center justify-center bg-emerald-900/30 rounded-lg text-emerald-400">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </div>
                            <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-lg text-gray-400">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                              </svg>
                            </div>
                            <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-lg text-gray-400">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                            </div>
                            <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-lg text-gray-400">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-24 bg-gray-900 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-40 -left-20 w-80 h-80 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-4000"></div>
            <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="inline-block bg-emerald-900/30 px-3 py-1 rounded-full text-emerald-400 text-sm font-medium mb-3">
                Recursos Poderosos
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                Controle financeiro completo
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Ferramentas avançadas desenvolvidas para oferecer a melhor experiência de gestão financeira pessoal.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl overflow-hidden"
                  variants={featureCardVariants}
                  whileHover="hover"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/5 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 relative">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed relative">{feature.description}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 bg-gray-950 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-40 -right-20 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
            <div className="absolute bottom-40 -left-20 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="inline-block bg-emerald-900/30 px-3 py-1 rounded-full text-emerald-400 text-sm font-medium mb-3">
                Processo Simples
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                Como o Nexios funciona
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Comece a transformar sua vida financeira em apenas quatro passos
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {steps.map((step, index) => (
                <motion.div 
                  key={index} 
                  className="relative"
                  variants={featureCardVariants}
                >
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all hover:bg-gray-800/70 hover:border-emerald-500/20 h-full group">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-white flex items-center justify-center font-bold mb-5 group-hover:scale-110 transition-transform">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{step.description}</p>
                  </div>
                  
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-emerald-500/30"></div>
                  )}
                </motion.div>
              ))}
            </motion.div>
            
            <div className="mt-16 text-center">
              <Link href="/register" className="group inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white font-medium shadow-lg shadow-emerald-900/20 transition-all">
                Comece agora mesmo
                <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* App Screenshots / Features Showcase Section */}
        <section className="py-24 bg-gray-900 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="inline-block bg-emerald-900/30 px-3 py-1 rounded-full text-emerald-400 text-sm font-medium mb-3">
                Interface Intuitiva
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                Uma experiência de usuário excepcional
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Design moderno e intuitivo, focado em usabilidade e visualização clara dos seus dados financeiros
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                className="order-2 lg:order-1"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-8">
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 transform transition-transform hover:-translate-y-1 hover:shadow-xl hover:border-emerald-500/20">
                    <div className="flex items-start">
                      <div className="bg-emerald-500/10 p-3 rounded-lg text-emerald-400 mr-4">
                        <ChartBarIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">Dashboard Personalizável</h3>
                        <p className="text-gray-400">Organize sua visão financeira do seu jeito, com widgets arrastaveis e telas customizáveis.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 transform transition-transform hover:-translate-y-1 hover:shadow-xl hover:border-emerald-500/20">
                    <div className="flex items-start">
                      <div className="bg-blue-500/10 p-3 rounded-lg text-blue-400 mr-4">
                        <LightBulbIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">Insights de IA</h3>
                        <p className="text-gray-400">Receba análises inteligentes sobre seus gastos e recomendações personalizadas para economizar.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 transform transition-transform hover:-translate-y-1 hover:shadow-xl hover:border-emerald-500/20">
                    <div className="flex items-start">
                      <div className="bg-purple-500/10 p-3 rounded-lg text-purple-400 mr-4">
                        <DevicePhoneMobileIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">Aplicativo Móvel</h3>
                        <p className="text-gray-400">Acesse suas finanças em qualquer lugar com nosso aplicativo para iOS e Android, sincronizado em tempo real.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="order-1 lg:order-2"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative mx-auto max-w-lg">
                  {/* Main Dashboard Screenshot */}
                  <div className="rounded-xl overflow-hidden border border-gray-700/70 shadow-2xl">
                    <img 
                      src="/dashboard-preview.png" 
                      alt="Dashboard Preview" 
                      className="w-full h-auto"
                      onError={(e) => {
                        // Fallback if image doesn't exist
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    
                    {/* Fallback if image doesn't exist */}
                    <div className="bg-gray-800 p-4 h-80 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-emerald-500/20 flex items-center justify-center rounded-full mx-auto mb-4">
                          <ChartBarIcon className="w-10 h-10 text-emerald-400" />
                        </div>
                        <p className="text-gray-300">Interface moderna e intuitiva</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-5 -right-5 bg-gray-800/90 p-3 rounded-xl shadow-xl border border-emerald-500/10 backdrop-blur-sm transform hover:-translate-y-1 transition-all">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <ArrowTrendingUpIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-300">Investimentos</p>
                        <p className="text-emerald-400 text-sm font-bold">+ 12.5% no mês</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-5 -left-5 bg-gray-800/90 p-3 rounded-xl shadow-xl border border-emerald-500/10 backdrop-blur-sm transform hover:-translate-y-1 transition-all">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                        <ClockIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-300">Metas</p>
                        <p className="text-gray-200 text-sm">2 de 5 concluídas</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-gray-950 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-60 left-20 w-80 h-80 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"></div>
            <div className="absolute -bottom-40 right-20 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="inline-block bg-emerald-900/30 px-3 py-1 rounded-full text-emerald-400 text-sm font-medium mb-3">
                Planos Flexíveis
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                Preços transparentes
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Escolha o plano perfeito para suas necessidades financeiras
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Free Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden shadow-xl h-full">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Gratuito</h3>
                    <p className="text-gray-400 mb-6">Perfeito para iniciar seu controle financeiro</p>
                    
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-bold text-white">R$0</span>
                      <span className="text-gray-400 ml-2">/mês</span>
                    </div>
                    
                    <Link href="/register" className="block w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-center text-white font-medium rounded-lg shadow-md transition-colors mb-6">
                      Começar Grátis
                    </Link>
                    
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Até 3 contas bancárias</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Rastreamento de transações básico</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Orçamento mensal simples</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Insights financeiros básicos</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Acesso ao aplicativo móvel</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
              
              {/* Premium Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="lg:-mt-4"
              >
                <div className="bg-gray-800/60 backdrop-blur-sm border border-emerald-500/30 rounded-xl overflow-hidden shadow-xl h-full relative">
                  <div className="absolute top-0 right-0">
                    <div className="bg-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                      POPULAR
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
                    <p className="text-gray-400 mb-6">Controle financeiro completo</p>
                    
                    <div className="flex items-baseline mb-2">
                      <span className="text-4xl font-bold text-white">R$14,90</span>
                      <span className="text-gray-400 ml-2">/mês</span>
                    </div>
                    <p className="text-sm text-emerald-400 mb-6">Ou R$149,90/ano (2 meses grátis)</p>
                    
                    <Link href="/register" className="block w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-center text-white font-medium rounded-lg shadow-md transition-colors mb-6">
                      Obter Premium
                    </Link>
                    
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Contas bancárias ilimitadas</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Sincronização bancária automática</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Categorização automática com IA</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Orçamentos e metas avançados</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Gestão de investimentos</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Relatórios personalizados</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Exportação de dados completa</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Integração com WhatsApp</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
              
              {/* Business Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden shadow-xl h-full">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Business</h3>
                    <p className="text-gray-400 mb-6">Para profissionais e pequenas empresas</p>
                    
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-bold text-white">R$39,90</span>
                      <span className="text-gray-400 ml-2">/mês</span>
                    </div>
                    
                    <Link href="/register" className="block w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 text-center text-white font-medium rounded-lg shadow-md transition-colors mb-6">
                      Contato para Empresas
                    </Link>
                    
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Tudo do plano Premium</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Multiusuário (até 5 contas)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Conciliação fiscal</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Fluxo de caixa empresarial</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">API para integração</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Suporte prioritário</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 bg-gray-900 relative">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-600/10 rounded-full filter blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="inline-block bg-emerald-900/30 px-3 py-1 rounded-full text-emerald-400 text-sm font-medium mb-3">
                Experiências Reais
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                Histórias de sucesso dos nossos usuários
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Descubra como o Nexios Finance tem transformado a vida financeira das pessoas
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={index} 
                  className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all hover:bg-gray-800/70 hover:border-emerald-500/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center mb-6">
                    <div className="mr-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-white text-lg font-bold group-hover:scale-110 transition-transform">
                        {testimonial.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-emerald-400">{testimonial.title}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -top-3 -left-2 text-emerald-500/20 text-6xl font-serif">"</div>
                    <p className="text-gray-300 mb-5 leading-relaxed relative z-10">{testimonial.quote}</p>
                  </div>
                  <div className="flex text-emerald-400">
                    {Array(5).fill(0).map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-gray-950 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="inline-block bg-emerald-900/30 px-3 py-1 rounded-full text-emerald-400 text-sm font-medium mb-3">
                Perguntas Frequentes
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                Dúvidas comuns sobre o Nexios
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Encontre respostas para as perguntas mais frequentes dos nossos usuários
              </p>
            </motion.div>
            
            <motion.div 
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index} 
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all hover:bg-gray-800/70 hover:border-emerald-500/20 group"
                  variants={featureCardVariants}
                >
                  <h3 className="text-xl font-bold text-white mb-2 flex items-start group-hover:text-emerald-400 transition-colors">
                    <span className="text-emerald-500 mr-2">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    {faq.question}
                  </h3>
                  <p className="text-gray-300 leading-relaxed pl-8">{faq.answer}</p>
                </motion.div>
              ))}
            </motion.div>
            
            <div className="mt-12 text-center">
              <p className="text-xl text-gray-300 mb-4">Ainda tem dúvidas?</p>
              <a href="mailto:contato@nexiosfinance.com" className="inline-flex items-center px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-medium transition-colors border border-gray-700 hover:border-emerald-500/30">
                Fale com nosso suporte
              </a>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900 via-emerald-900/10 to-gray-900 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
            <div className="absolute -bottom-20 right-20 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="inline-block bg-emerald-900/30 px-3 py-1 rounded-full text-emerald-400 text-sm font-medium mb-3">
                Junte-se a Nós
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                Pronto para transformar suas finanças?
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Junte-se a milhares de pessoas que já estão gerenciando seu dinheiro de forma inteligente.
              </p>
              <Link href="/register" className="group inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white font-medium text-lg shadow-lg shadow-emerald-900/20 transition-all">
                Criar Conta Gratuita
                <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              <p className="mt-4 text-gray-400 flex items-center justify-center">
                <ShieldCheckIcon className="w-4 h-4 mr-1" />
                Sem cartão de crédito • Cancelamento a qualquer momento
              </p>
            </motion.div>
            
            {/* Benefits */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-emerald-500/20 transition-all flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 rounded-xl bg-emerald-900/30 flex items-center justify-center text-emerald-400 mb-4">
                  <CreditCardIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Rastreamento Inteligente</h3>
                <p className="text-gray-300">Acompanhe todos os seus gastos com categorização automática e insights personalizados.</p>
              </motion.div>
              <motion.div 
                className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-emerald-500/20 transition-all flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-16 h-16 rounded-xl bg-emerald-900/30 flex items-center justify-center text-emerald-400 mb-4">
                  <WalletIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Orçamento Simplificado</h3>
                <p className="text-gray-300">Defina seus limites de gastos por categoria e receba alertas personalizados.</p>
              </motion.div>
              <motion.div 
                className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-emerald-500/20 transition-all flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="w-16 h-16 rounded-xl bg-emerald-900/30 flex items-center justify-center text-emerald-400 mb-4">
                  <ArrowPathIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Sincronização Automática</h3>
                <p className="text-gray-300">Conecte suas contas bancárias e tenha seus dados sempre atualizados automaticamente.</p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Upper Footer */}
          <div className="py-12 grid grid-cols-1 md:grid-cols-6 gap-8">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                  N
                </div>
                <span className="ml-2 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">Nexios</span>
                <span className="ml-1 text-xl font-light text-gray-200">Finance</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Transforme sua relação com o dinheiro. Planejamento financeiro inteligente para um futuro melhor.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 14-7.496 14-13.986 0-.21 0-.42-.015-.63A10.012 10.012 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.897 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.897-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/></svg>
                </a>
              </div>
            </div>
            
            {/* Links */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-4">Produto</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-emerald-400 transition-colors block">Recursos</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors block">App Móvel</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors block">Integrações</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors block">API</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-emerald-400 transition-colors block">Preços</a></li>
              </ul>
            </div>
            
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-4">Empresa</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors block">Sobre</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors block">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors block">Carreiras</a></li>
                <li><a href="#testimonials" className="text-gray-400 hover:text-emerald-400 transition-colors block">Depoimentos</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors block">Contato</a></li>
              </ul>
            </div>
            
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors block">Termos</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors block">Privacidade</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors block">Cookies</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors block">Licenças</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors block">Segurança</a></li>
              </ul>
            </div>
            
            {/* Newsletter */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Receba dicas financeiras e novidades em primeira mão.</p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="w-full bg-gray-800 text-white border border-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-3 py-2 outline-none"
                />
                <button 
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg text-sm px-4 py-2 w-full transition-colors"
                >
                  Inscrever-se
                </button>
              </form>
            </div>
          </div>
          
          {/* Lower Footer */}
          <div className="py-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; 2025 Nexios Finance. Todos os direitos reservados.
            </p>
            <div className="flex space-x-4 items-center">
              <select className="bg-gray-800 border border-gray-700 text-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500">
                <option value="pt-BR">Português (BR)</option>
                <option value="en-US">English</option>
                <option value="es-ES">Español</option>
              </select>
              <select className="bg-gray-800 border border-gray-700 text-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500">
                <option value="BRL">BRL (R$)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
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

// Dados
const features = [
  {
    title: 'Dashboard Intuitivo',
    description: 'Visualize suas finanças com gráficos e indicadores claros para uma visão completa da sua saúde financeira.',
    icon: ChartBarIcon
  },
  {
    title: 'Gestão de Transações',
    description: 'Registre e categorize automaticamente suas receitas e despesas com facilidade e precisão.',
    icon: CreditCardIcon
  },
  {
    title: 'Orçamentos Inteligentes',
    description: 'Crie e gerencie orçamentos personalizados com alertas para evitar gastos excessivos.',
    icon: CurrencyDollarIcon
  },
  {
    title: 'Insights com IA',
    description: 'Receba recomendações personalizadas e previsões financeiras baseadas no seu comportamento.',
    icon: PresentationChartLineIcon
  },
  {
    title: 'Metas Financeiras',
    description: 'Defina objetivos financeiros e acompanhe seu progresso para realizar seus sonhos.',
    icon: CheckCircleIcon
  },
  {
    title: 'Integração com WhatsApp',
    description: 'Registre transações enviando mensagens simples pelo WhatsApp em tempo real.',
    icon: ChatBubbleLeftRightIcon
  }
];

const steps = [
  {
    title: 'Crie sua conta',
    description: 'Registre-se em menos de 1 minuto com email e senha. Sem necessidade de cartão de crédito.'
  },
  {
    title: 'Conecte suas contas',
    description: 'Adicione suas contas bancárias, cartões de crédito ou registre manualmente suas finanças.'
  },
  {
    title: 'Defina metas',
    description: 'Estabeleça orçamentos, metas de economia e planejamento financeiro personalizado.'
  },
  {
    title: 'Monitore seu progresso',
    description: 'Acompanhe sua evolução financeira com relatórios detalhados e insights baseados em IA.'
  }
];

const testimonials = [
  {
    name: 'Marcela Silva',
    title: 'Professora, 34 anos',
    quote: 'O Nexios transformou minha relação com dinheiro. Hoje consigo economizar 25% do meu salário todo mês, algo que nunca consegui antes!'
  },
  {
    name: 'Ricardo Almeida',
    title: 'Desenvolvedor, 28 anos',
    quote:'O Nexios transformou minha relação com dinheiro. Hoje consigo economizar 25% do meu salário todo mês, algo que nunca consegui antes!'
  }
];

const faqs = [
  {
    question: 'O Nexios Finance é gratuito?',
    answer: 'Sim, oferecemos um plano gratuito com recursos essenciais para gestão financeira pessoal. Também temos planos premium com recursos avançados para necessidades específicas.'
  },
  {
    question: 'Como o Nexios mantém meus dados financeiros seguros?',
    answer: 'Utilizamos criptografia de nível bancário (AES-256) para proteger seus dados. Além disso, nunca armazenamos suas credenciais bancárias e seguimos rigorosos protocolos de segurança.'
  },
  {
    question: 'É possível importar dados de outros apps financeiros?',
    answer: 'Sim, o Nexios Finance suporta importação de dados de diversos aplicativos financeiros e planilhas no formato CSV ou Excel. O processo é simples e mantém todas as suas categorias e histórico.'
  },
  {
    question: 'Como funciona a integração com WhatsApp?',
    answer: 'Após configurar a integração, você pode registrar transações enviando mensagens como "Supermercado R$ 150,30" ou "Recebi salário R$ 3.000". Nosso sistema processará automaticamente e categorizará a transação.'
  },
  {
    question: 'O Nexios Finance funciona em todos os dispositivos?',
    answer: 'Sim, nossa plataforma é totalmente responsiva e funciona em desktops, tablets e smartphones. Também oferecemos aplicativos nativos para iOS e Android para uma experiência ainda melhor.'
  }
];