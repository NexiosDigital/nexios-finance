'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  ArrowRightIcon,
  CheckIcon, 
  ChartBarIcon, 
  CreditCardIcon, 
  BanknotesIcon, 
  LightBulbIcon,
  BellAlertIcon,
  ChatBubbleLeftRightIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  ClockIcon,
  ArrowPathIcon,
  CogIcon,
  UserGroupIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Para evitar problemas de hidratação
  useEffect(() => {
    setMounted(true)
  }, [])

  // Animações de scroll
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const featureCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.1), 0 10px 10px -5px rgba(16, 185, 129, 0.04)",
      transition: { duration: 0.2 }
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white antialiased font-sans overflow-hidden">
      {/* Hero Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"></div>
        <div className="absolute top-40 -right-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-4000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.15] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      {/* Header with Glassmorphism */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/80 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center text-white text-xl font-extrabold shadow-md">
                N
              </div>
              <span className="ml-2 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">Nexios</span>
              <span className="ml-1 text-xl font-light text-gray-200">Finance</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-300 hover:text-emerald-400 px-3 py-2 text-sm font-medium transition-colors">
                Recursos
              </a>
              <a href="#how-it-works" className="text-gray-300 hover:text-emerald-400 px-3 py-2 text-sm font-medium transition-colors">
                Como Funciona
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-emerald-400 px-3 py-2 text-sm font-medium transition-colors">
                Planos
              </a>
              <a href="#testimonials" className="text-gray-300 hover:text-emerald-400 px-3 py-2 text-sm font-medium transition-colors">
                Depoimentos
              </a>
              <a href="#faq" className="text-gray-300 hover:text-emerald-400 px-3 py-2 text-sm font-medium transition-colors">
                FAQ
              </a>
            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-sm flex flex-col">
          <div className="flex justify-end p-4">
            <button 
              className="p-2 rounded-lg text-gray-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col items-center space-y-6 mt-10">
            <a 
              href="#features" 
              className="text-gray-300 hover:text-emerald-400 px-3 py-2 text-lg font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Recursos
            </a>
            <a 
              href="#how-it-works" 
              className="text-gray-300 hover:text-emerald-400 px-3 py-2 text-lg font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Como Funciona
            </a>
            <a 
              href="#pricing" 
              className="text-gray-300 hover:text-emerald-400 px-3 py-2 text-lg font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Planos
            </a>
            <a 
              href="#testimonials" 
              className="text-gray-300 hover:text-emerald-400 px-3 py-2 text-lg font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Depoimentos
            </a>
            <a 
              href="#faq" 
              className="text-gray-300 hover:text-emerald-400 px-3 py-2 text-lg font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <div className="flex flex-col space-y-3 mt-4 w-full px-10">
              <Link 
                href="/login" 
                className="w-full text-center text-gray-300 hover:text-white px-4 py-3 rounded-lg text-sm font-medium border border-gray-700 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className="w-full text-center bg-gradient-to-tr from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white px-4 py-3 rounded-lg text-sm font-medium transition-all shadow-md shadow-emerald-900/20 hover:shadow-lg hover:shadow-emerald-900/30"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Criar Conta
              </Link>
            </div>
          </nav>
        </div>
      )}

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 md:pt-32 pb-20 md:pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
              {/* Left Column - Text */}
              <motion.div 
                className="lg:col-span-6 text-center lg:text-left mb-10 lg:mb-0"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <div className="inline-block mb-4 py-1 px-3 bg-emerald-900/30 backdrop-blur-sm rounded-full border border-emerald-500/20">
                  <p className="text-sm text-emerald-400 font-medium flex items-center">
                    <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    Finanças Pessoais Simplificadas
                  </p>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-300">
                    Controle financeiro 
                  </span>
                  <span className="block mt-2 text-white">inteligente e intuitivo</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl lg:max-w-none mx-auto lg:mx-0 leading-relaxed">
                  Transforme sua relação com o dinheiro. Rastreie transações, gerencie orçamentos, acompanhe investimentos e receba insights personalizados com IA.
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
                  <Link href="/register" className="group flex items-center justify-center px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white font-medium shadow-lg shadow-emerald-900/20 transition-all">
                    Começar Grátis
                    <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <a href="#features" className="flex items-center justify-center px-6 py-4 rounded-xl bg-gray-800/60 hover:bg-gray-800 text-white font-medium border border-gray-700/80 hover:border-emerald-500/20 shadow transition-all backdrop-blur-sm">
                    Explorar Recursos
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
                    <div className="absolute -top-5 -right-5 bg-gray-800/90 p-3 rounded-xl shadow-xl border border-emerald-500/20 hidden md:block backdrop-blur-sm transform hover:-translate-y-1 transition-all">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                          <LightBulbIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-300">Insight de IA</p>
                          <p className="text-emerald-400 text-sm font-bold">Economia de R$ 850 possível</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute -bottom-5 -left-5 bg-gray-800/90 p-3 rounded-xl shadow-xl border border-emerald-500/20 hidden md:block backdrop-blur-sm transform hover:-translate-y-1 transition-all">
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
        <section id="features" className="py-24 bg-gray-900/70 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="inline-block bg-emerald-900/30 backdrop-blur-sm px-3 py-1 rounded-full text-emerald-400 text-sm font-medium mb-3 border border-emerald-500/20">
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
              {/* Feature 1 */}
              <motion.div 
                className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl overflow-hidden hover:border-emerald-500/30"
                variants={featureCardVariants}
                whileHover="hover"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/5 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                  <ChartBarIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 relative">Dashboard Intuitivo</h3>
                <p className="text-gray-300 leading-relaxed relative">Visualize suas finanças com gráficos e indicadores claros para uma visão completa da sua saúde financeira.</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </motion.div>
              
              {/* Feature 2 */}
              <motion.div 
                className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl overflow-hidden hover:border-emerald-500/30"
                variants={featureCardVariants}
                whileHover="hover"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/5 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                  <CreditCardIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 relative">Gestão de Transações</h3>
                <p className="text-gray-300 leading-relaxed relative">Registre e categorize automaticamente suas receitas e despesas com facilidade e precisão.</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </motion.div>
              
              {/* Feature 3 */}
              <motion.div 
                className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl overflow-hidden hover:border-emerald-500/30"
                variants={featureCardVariants}
                whileHover="hover"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/5 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                  <BanknotesIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 relative">Orçamentos Inteligentes</h3>
                <p className="text-gray-300 leading-relaxed relative">Crie e gerencie orçamentos personalizados com alertas para evitar gastos excessivos.</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </motion.div>
              
              {/* Feature 4 */}
              <motion.div 
                className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl overflow-hidden hover:border-emerald-500/30"
                variants={featureCardVariants}
                whileHover="hover"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/5 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                  <LightBulbIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 relative">Insights com IA</h3>
                <p className="text-gray-300 leading-relaxed relative">Receba recomendações personalizadas e previsões financeiras baseadas no seu comportamento.</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </motion.div>
              
              {/* Feature 5 */}
              <motion.div 
                className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl overflow-hidden hover:border-emerald-500/30"
                variants={featureCardVariants}
                whileHover="hover"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/5 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                  <ArrowTrendingUpIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 relative">Metas Financeiras</h3>
                <p className="text-gray-300 leading-relaxed relative">Defina objetivos financeiros e acompanhe seu progresso para realizar seus sonhos.</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </motion.div>
              
              {/* Feature 6 */}
              <motion.div 
                className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl overflow-hidden hover:border-emerald-500/30"
                variants={featureCardVariants}
                whileHover="hover"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/5 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                  <ChatBubbleLeftRightIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 relative">Integração com WhatsApp</h3>
                <p className="text-gray-300 leading-relaxed relative">Registre transações enviando mensagens simples pelo WhatsApp em tempo real.</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 bg-gray-950 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="inline-block bg-emerald-900/30 backdrop-blur-sm px-3 py-1 rounded-full text-emerald-400 text-sm font-medium mb-3 border border-emerald-500/20">
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
              {/* Step 1 */}
              <motion.div 
                className="relative"
                variants={featureCardVariants}
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all hover:bg-gray-800/70 hover:border-emerald-500/20 h-full group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-white flex items-center justify-center font-bold mb-5 group-hover:scale-110 transition-transform">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Crie sua conta</h3>
                  <p className="text-gray-300 leading-relaxed">Registre-se em menos de 1 minuto com email e senha. Sem necessidade de cartão de crédito.</p>
                </div>
                
                {/* Connector line */}
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-emerald-500/30"></div>
              </motion.div>
              
              {/* Step 2 */}
              <motion.div 
                className="relative"
                variants={featureCardVariants}
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all hover:bg-gray-800/70 hover:border-emerald-500/20 h-full group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-white flex items-center justify-center font-bold mb-5 group-hover:scale-110 transition-transform">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Conecte suas contas</h3>
                  <p className="text-gray-300 leading-relaxed">Adicione suas contas bancárias, cartões de crédito ou registre manualmente suas finanças.</p>
                </div>
                
                {/* Connector line */}
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-emerald-500/30"></div>
              </motion.div>
              
              {/* Step 3 */}
              <motion.div 
                className="relative"
                variants={featureCardVariants}
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all hover:bg-gray-800/70 hover:border-emerald-500/20 h-full group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-white flex items-center justify-center font-bold mb-5 group-hover:scale-110 transition-transform">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Defina metas</h3>
                  <p className="text-gray-300 leading-relaxed">Estabeleça orçamentos, metas de economia e planejamento financeiro personalizado.</p>
                </div>
                
                {/* Connector line */}
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-emerald-500/30"></div>
              </motion.div>
              
              {/* Step 4 */}
              <motion.div 
                className="relative"
                variants={featureCardVariants}
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all hover:bg-gray-800/70 hover:border-emerald-500/20 h-full group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-white flex items-center justify-center font-bold mb-5 group-hover:scale-110 transition-transform">
                    4
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Monitore seu progresso</h3>
                  <p className="text-gray-300 leading-relaxed">Acompanhe sua evolução financeira com relatórios detalhados e insights baseados em IA.</p>
                </div>
              </motion.div>
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
        <section className="py-24 bg-gray-900/70 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="inline-block bg-emerald-900/30 backdrop-blur-sm px-3 py-1 rounded-full text-emerald-400 text-sm font-medium mb-3 border border-emerald-500/20">
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
                  <div className="rounded-xl overflow-hidden border border-gray-700/70 shadow-2xl backdrop-blur-sm">
                    <div className="bg-gray-800/80 backdrop-blur-sm p-3 rounded-t-xl border-b border-gray-700/80">
                      <div className="flex items-center">
                        <div className="flex space-x-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-400"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                          <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <div className="mx-auto px-10 py-1 rounded-md bg-gray-700/50 text-xs text-gray-400 max-w-xs truncate">
                          app.nexiosfinance.com/investments
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="bg-gray-900 p-6">
                      <div className="mb-4 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-white">Investimentos</h3>
                        <span className="text-sm text-gray-400">Mar 2025</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="p-3 bg-gray-800/70 rounded-xl">
                          <p className="text-xs text-gray-400">Total</p>
                          <p className="text-emerald-400 font-bold text-lg">R$ 68.500</p>
                        </div>
                        <div className="p-3 bg-gray-800/70 rounded-xl">
                          <p className="text-xs text-gray-400">Retorno</p>
                          <p className="text-emerald-400 font-bold text-lg">+18,7%</p>
                        </div>
                        <div className="p-3 bg-gray-800/70 rounded-xl">
                          <p className="text-xs text-gray-400">Aportes</p>
                          <p className="text-emerald-400 font-bold text-lg">R$ 1.500</p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/70 rounded-xl p-4 mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-sm">Distribuição de Ativos</h4>
                        </div>
                        <div className="h-48 flex flex-col items-center justify-center">
                          <div className="relative w-32 h-32 rounded-full flex justify-center items-center bg-gray-700/50">
                            <div className="absolute h-full w-full border-8 border-emerald-500 rounded-full clip-path-50"></div>
                            <div className="absolute h-full w-full border-8 border-blue-500 rounded-full clip-path-30 rotate-180"></div>
                            <div className="absolute h-full w-full border-8 border-purple-500 rounded-full clip-path-20 rotate-270"></div>
                            <div className="w-16 h-16 bg-gray-800 rounded-full"></div>
                          </div>
                          <div className="mt-4 flex flex-wrap justify-center gap-3">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-emerald-500 rounded-full mr-1"></div>
                              <span className="text-xs text-gray-300">Renda Fixa</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                              <span className="text-xs text-gray-300">Ações</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
                              <span className="text-xs text-gray-300">Cripto</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/70 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-sm">Top Investimentos</h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 hover:bg-gray-700/50 rounded-lg">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mr-3">B</div>
                              <div>
                                <p className="text-sm font-medium">BOVA11</p>
                                <p className="text-xs text-gray-400">ETF</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm">R$ 10.500</p>
                              <p className="text-xs text-emerald-400">+5,2%</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-2 hover:bg-gray-700/50 rounded-lg">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 mr-3">T</div>
                              <div>
                                <p className="text-sm font-medium">Tesouro IPCA+</p>
                                <p className="text-xs text-gray-400">Renda Fixa</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm">R$ 20.800</p>
                              <p className="text-xs text-emerald-400">+12,6%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-5 -right-5 bg-gray-800/90 p-3 rounded-xl shadow-xl border border-emerald-500/20 hidden md:block backdrop-blur-sm transform hover:-translate-y-1 transition-all">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <LightBulbIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-300">Insight de IA</p>
                        <p className="text-emerald-400 text-sm font-bold">Diversificação recomendada</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-5 -left-5 bg-gray-800/90 p-3 rounded-xl shadow-xl border border-emerald-500/20 hidden md:block backdrop-blur-sm transform hover:-translate-y-1 transition-all">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <ArrowTrendingUpIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-300">Análise de Mercado</p>
                        <p className="text-gray-300 text-xs">IBOV +2,3% hoje</p>
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="inline-block bg-emerald-900/30 backdrop-blur-sm px-3 py-1 rounded-full text-emerald-400 text-sm font-medium mb-3 border border-emerald-500/20">
                Planos Flexíveis
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                Preços transparentes
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Escolha o plano perfeito para suas necessidades financeiras
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                        <CheckIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Até 3 contas bancárias</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Rastreamento de transações básico</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Orçamento mensal simples</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Insights financeiros básicos</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
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
                        <CheckIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Contas bancárias ilimitadas</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Sincronização bancária automática</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Categorização automática com IA</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Orçamentos e metas avançados</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Gestão de investimentos</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Relatórios personalizados</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Exportação de dados completa</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
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
                        <CheckIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Tudo do plano Premium</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Multiusuário (até 5 contas)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Conciliação fiscal</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">Fluxo de caixa empresarial</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">API para integração</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
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
        <section id="testimonials" className="py-24 bg-gray-900/70 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="inline-block bg-emerald-900/30 backdrop-blur-sm px-3 py-1 rounded-full text-emerald-400 text-sm font-medium mb-3 border border-emerald-500/20">
                Experiências Reais
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                Histórias de sucesso dos nossos usuários
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Descubra como o Nexios Finance tem transformado a vida financeira das pessoas
              </p>
            </motion.div>

            {/* Testimonial Carousel */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-xl">
                {/* Testimonials */}
                <div className="relative">
                  {[
                    {
                      name: "Marcela Silva",
                      title: "Professora, 34 anos",
                      quote: "O Nexios transformou minha relação com dinheiro. Consegui economizar 25% do meu salário todo mês, algo que nunca consegui antes. A visualização clara dos meus gastos e as sugestões de economia realmente fizeram a diferença!",
                      avatar: "MS"
                    },
                    {
                      name: "Ricardo Almeida",
                      title: "Desenvolvedor, 28 anos",
                      quote: "Depois de usar o Nexios, finalmente consegui organizar minhas finanças. As metas me ajudaram a economizar o suficiente para dar entrada no meu apartamento em apenas 18 meses. A integração com WhatsApp é sensacional!",
                      avatar: "RA"
                    },
                    {
                      name: "Carolina Mendes",
                      title: "Empresária, 42 anos",
                      quote: "Como empresária, precisava de algo que acompanhasse tanto minhas finanças pessoais quanto profissionais. O plano Business do Nexios é perfeito para isso! Agora tenho uma visão completa do meu patrimônio e muito mais controle.",
                      avatar: "CM"
                    }
                  ].map((testimonial, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: index === activeTestimonial ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                      className={`absolute inset-0 p-8 md:p-12 ${index === activeTestimonial ? 'block' : 'hidden'}`}
                    >
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="w-20 h-20 rounded-2xl flex-shrink-0 bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-white text-2xl font-bold">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <div className="text-4xl text-emerald-500 font-serif mb-4">"</div>
                          <blockquote className="text-xl md:text-2xl text-gray-200 mb-6 leading-relaxed">
                            {testimonial.quote}
                          </blockquote>
                          <div>
                            <div className="font-bold text-white">{testimonial.name}</div>
                            <div className="text-emerald-400">{testimonial.title}</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Navigation */}
                <div className="flex justify-between p-4 bg-gray-800/80 border-t border-gray-700/50">
                  <div className="flex gap-2">
                    {[0, 1, 2].map((index) => (
                      <button 
                        key={index}
                        className={`w-2.5 h-2.5 rounded-full ${index === activeTestimonial ? 'bg-emerald-500' : 'bg-gray-600'}`}
                        onClick={() => setActiveTestimonial(index)}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="p-2 rounded-full bg-gray-700 text-white disabled:opacity-50"
                      onClick={() => setActiveTestimonial(prev => Math.max(0, prev - 1))}
                      disabled={activeTestimonial === 0}
                    >
                      <ChevronRightIcon className="w-4 h-4 rotate-180" />
                    </button>
                    <button 
                      className="p-2 rounded-full bg-gray-700 text-white disabled:opacity-50"
                      onClick={() => setActiveTestimonial(prev => Math.min(2, prev + 1))}
                      disabled={activeTestimonial === 2}
                    >
                      <ChevronRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Customer Logos */}
            <div className="mt-16">
              <p className="text-center text-gray-400 mb-8">Empresas que confiam em nós</p>
              <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
                {['Empresa 1', 'Empresa 2', 'Empresa 3', 'Empresa 4', 'Empresa 5'].map((company, index) => (
                  <div key={index} className="h-12 flex items-center justify-center">
                    <div className="bg-gray-700/50 p-2 rounded-lg h-full flex items-center">
                      <div className="text-gray-400 font-medium">{company}</div>
                    </div>
                  </div>
                ))}
              </div>
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
              <div className="inline-block bg-emerald-900/30 backdrop-blur-sm px-3 py-1 rounded-full text-emerald-400 text-sm font-medium mb-3 border border-emerald-500/20">
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
              {/* FAQ Item 1 */}
              <motion.div 
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all hover:bg-gray-800/70 hover:border-emerald-500/20 group"
                variants={featureCardVariants}
              >
                <h3 className="text-xl font-bold text-white mb-2 flex items-start group-hover:text-emerald-400 transition-colors">
                  <span className="text-emerald-500 mr-2">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  O Nexios Finance é gratuito?
                </h3>
                <p className="text-gray-300 leading-relaxed pl-8">Sim, oferecemos um plano gratuito com recursos essenciais para gestão financeira pessoal. Também temos planos premium com recursos avançados para necessidades específicas.</p>
              </motion.div>
              
              {/* FAQ Item 2 */}
              <motion.div 
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all hover:bg-gray-800/70 hover:border-emerald-500/20 group"
                variants={featureCardVariants}
              >
                <h3 className="text-xl font-bold text-white mb-2 flex items-start group-hover:text-emerald-400 transition-colors">
                  <span className="text-emerald-500 mr-2">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  Como o Nexios mantém meus dados financeiros seguros?
                </h3>
                <p className="text-gray-300 leading-relaxed pl-8">Utilizamos criptografia de nível bancário (AES-256) para proteger seus dados. Além disso, nunca armazenamos suas credenciais bancárias e seguimos rigorosos protocolos de segurança.</p>
              </motion.div>
              
              {/* FAQ Item 3 */}
              <motion.div 
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all hover:bg-gray-800/70 hover:border-emerald-500/20 group"
                variants={featureCardVariants}
              >
                <h3 className="text-xl font-bold text-white mb-2 flex items-start group-hover:text-emerald-400 transition-colors">
                  <span className="text-emerald-500 mr-2">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  É possível importar dados de outros apps financeiros?
                </h3>
                <p className="text-gray-300 leading-relaxed pl-8">Sim, o Nexios Finance suporta importação de dados de diversos aplicativos financeiros e planilhas no formato CSV ou Excel. O processo é simples e mantém todas as suas categorias e histórico.</p>
              </motion.div>
              
              {/* FAQ Item 4 */}
              <motion.div 
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all hover:bg-gray-800/70 hover:border-emerald-500/20 group"
                variants={featureCardVariants}
              >
                <h3 className="text-xl font-bold text-white mb-2 flex items-start group-hover:text-emerald-400 transition-colors">
                  <span className="text-emerald-500 mr-2">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  Como funciona a integração com WhatsApp?
                </h3>
                <p className="text-gray-300 leading-relaxed pl-8">Após configurar a integração</p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )}