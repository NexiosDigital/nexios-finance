import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui';
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  LightBulbIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export default function LandingPage() {
  const { user } = useAuth();
  const router = useRouter();
  
  // Se o usuário já estiver logado, redirecionar para o dashboard
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);
  
  // Componente para seções de recursos
  const FeatureCard = ({ icon, title, description }: { 
    icon: React.ReactNode; 
    title: string; 
    description: string 
  }) => (
    <div className="p-6 border dark:border-dark-border rounded-2xl bg-white dark:bg-dark-card shadow-sm hover:shadow-md transition-shadow">
      <div className="p-3 rounded-xl bg-primary-light/10 text-primary w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
  
  // Lista de recursos para exibição
  const features = [
    {
      icon: <ChartBarIcon className="w-6 h-6" />,
      title: 'Dashboard Intuitivo',
      description: 'Visualize suas finanças com gráficos e indicadores claros e objetivos.'
    },
    {
      icon: <CurrencyDollarIcon className="w-6 h-6" />,
      title: 'Gestão de Transações',
      description: 'Registre e categorize suas receitas e despesas com facilidade.'
    },
    {
      icon: <LightBulbIcon className="w-6 h-6" />,
      title: 'Insights Inteligentes',
      description: 'Receba recomendações personalizadas baseadas em IA para melhorar suas finanças.'
    },
    {
      icon: <DevicePhoneMobileIcon className="w-6 h-6" />,
      title: 'Integração com WhatsApp',
      description: 'Envie suas transações via WhatsApp para atualização automática.'
    },
    {
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      title: 'Segurança Avançada',
      description: 'Seus dados financeiros protegidos com criptografia de ponta a ponta.'
    },
    {
      icon: <SparklesIcon className="w-6 h-6" />,
      title: 'Design Premium',
      description: 'Interface sofisticada e elegante para uma experiência de usuário superior.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-white">
      <Head>
        <title>Nexios Finance - Gestão Financeira Premium</title>
        <meta name="description" content="Nexios Finance - Plataforma premium de gestão financeira pessoal com análise de dados avançada e recursos de IA." />
      </Head>
      
      {/* Navbar */}
      <header className="border-b dark:border-dark-border bg-white dark:bg-dark-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold font-display bg-gradient-primary bg-clip-text text-transparent">
              Nexios <span className="text-primary-light">FINANCE</span>
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors">
              Recursos
            </a>
            <a href="#pricing" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors">
              Planos
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline">Entrar</Button>
            </Link>
            <Link href="/signup">
              <Button>Criar Conta</Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="bg-gradient-primary-reverse py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
                Controle financeiro inteligente para sua vida
              </h1>
              <p className="text-white/80 text-lg mb-8">
                Nexios Finance combina design premium com análise financeira avançada. 
                Gerencie suas finanças, receba insights inteligentes e atinja seus objetivos financeiros.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                    Comece Agora
                  </Button>
                </Link>
                <a href="#features">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Saiba Mais
                  </Button>
                </a>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <div className="glass p-4 rounded-2xl shadow-lg">
                {/* Imagem/screenshot do dashboard */}
                <div className="aspect-video rounded-xl bg-dark-card/60 border border-white/10 flex items-center justify-center">
                  <span className="text-white/50">Preview do Dashboard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-dark-surface">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-display mb-4">Recursos Exclusivos</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Descubra como o Nexios Finance pode transformar sua gestão financeira com recursos poderosos e intuitivos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50 dark:bg-dark-bg">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-display mb-4">Planos e Preços</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Escolha o plano ideal para suas necessidades financeiras
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Plano Gratuito */}
            <div className="border dark:border-dark-border rounded-2xl bg-white dark:bg-dark-card shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Básico</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Ideal para começar a organizar suas finanças
                </p>
                <div className="mt-6 mb-6">
                  <span className="text-4xl font-bold">Grátis</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {[
                    'Controle de receitas e despesas',
                    'Categorização de transações',
                    'Dashboard básico',
                    'Limite de 100 transações/mês',
                    'Exportação de dados em CSV'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm dark:text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 border-t dark:border-dark-border">
                <Link href="/signup">
                  <Button variant="outline" isFullWidth>
                    Cadastre-se Grátis
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Plano Premium */}
            <div className="border-2 border-primary rounded-2xl bg-white dark:bg-dark-card shadow-xl overflow-hidden transform scale-105">
              <div className="bg-primary py-2 text-center text-white text-sm font-medium">
                Mais Popular
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Premium</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Recursos avançados para controle total
                </p>
                <div className="mt-6 mb-6">
                  <span className="text-4xl font-bold">R$19,90</span>
                  <span className="text-gray-500 dark:text-gray-400">/mês</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {[
                    'Todos os recursos do plano Básico',
                    'Transações ilimitadas',
                    'Insights impulsionados por IA',
                    'Metas financeiras e orçamentos',
                    'Análise de investimentos',
                    'Integração com WhatsApp',
                    'Suporte prioritário'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm dark:text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 border-t dark:border-dark-border">
                <Link href="/signup">
                  <Button isFullWidth>
                    Experimente 30 dias grátis
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Plano Empresarial */}
            <div className="border dark:border-dark-border rounded-2xl bg-white dark:bg-dark-card shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Empresarial</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Para empresas e profissionais liberais
                </p>
                <div className="mt-6 mb-6">
                  <span className="text-4xl font-bold">R$49,90</span>
                  <span className="text-gray-500 dark:text-gray-400">/mês</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {[
                    'Todos os recursos do plano Premium',
                    'Multi-usuários (até 5)',
                    'Relatórios fiscais',
                    'Separação despesas pessoais/empresa',
                    'API para integração com sistemas',
                    'Consultoria financeira mensal',
                    'Suporte dedicado 24/7'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm dark:text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 border-t dark:border-dark-border">
                <Link href="/signup">
                  <Button variant="outline" isFullWidth>
                    Fale com Vendas
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary-reverse text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold font-display mb-4">
            Pronto para transformar suas finanças?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Comece hoje mesmo a usar o Nexios Finance e descubra como é simples tomar controle da sua vida financeira.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Criar Conta Gratuita
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Fazer Login
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-dark-card border-t dark:border-dark-border py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <span className="text-xl font-bold font-display bg-gradient-primary bg-clip-text text-transparent">
                Nexios <span className="text-primary-light">FINANCE</span>
              </span>
              <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-md">
                Plataforma premium de gestão financeira pessoal com foco em experiência do usuário
                de alto padrão, análise de dados avançada e recursos de inteligência artificial.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-sm font-bold uppercase text-gray-500 dark:text-gray-400 mb-4">Produto</h4>
                <ul className="space-y-2">
                  {['Recursos', 'Planos', 'Segurança', 'Termos', 'Privacidade'].map((item, index) => (
                    <li key={index}>
                      <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-bold uppercase text-gray-500 dark:text-gray-400 mb-4">Empresa</h4>
                <ul className="space-y-2">
                  {['Sobre', 'Blog', 'Carreiras', 'Contato', 'Suporte'].map((item, index) => (
                    <li key={index}>
                      <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-bold uppercase text-gray-500 dark:text-gray-400 mb-4">Social</h4>
                <ul className="space-y-2">
                  {['Twitter', 'Facebook', 'Instagram', 'LinkedIn', 'YouTube'].map((item, index) => (
                    <li key={index}>
                      <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t dark:border-dark-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Nexios Finance. Todos os direitos reservados.
            </p>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-6">
                {['Termos', 'Privacidade', 'Cookies'].map((item, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="text-gray-500 dark:text-gray-400 text-sm hover:text-primary dark:hover:text-primary-light transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}