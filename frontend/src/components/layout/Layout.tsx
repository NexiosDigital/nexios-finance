import React, { useState, ReactNode, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/auth';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';
import MobileMenu from './MobileMenu';

// Tipos para as props do componente Layout
interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'Nexios Finance', 
  description = 'Gestão financeira pessoal premium'
}) => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true); // Tema escuro por padrão
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Verificar se estamos no cliente após a montagem do componente
  useEffect(() => {
    setIsMounted(true);
    
    // Checar a preferência de tema no cliente
    if (typeof window !== 'undefined') {
      const darkModePreference = localStorage.getItem('darkMode');
      const isDarkMode = darkModePreference === null || darkModePreference === 'true';
      setDarkMode(isDarkMode);
    }
  }, []);
  
  // Alternar entre tema claro e escuro
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Atualizar o DOM e salvar preferência somente no cliente
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', newDarkMode);
      localStorage.setItem('darkMode', newDarkMode.toString());
    }
  };
  
  // Se o usuário não estiver autenticado e não estiver em uma página pública, redirecionar para login
  const publicPages = ['/', '/login', '/signup', '/forgot-password', '/reset-password', '/dev'];
  
  // Para páginas autenticadas que não estejam na lista de páginas públicas
  const isAuthRequired = !publicPages.includes(router.pathname) && !router.pathname.startsWith('/_');
  
  // Se o usuário não estiver autenticado em uma página que requer autenticação, redirecionar para login
  const isUnauthenticated = isAuthRequired && !user;
  
  // Efeito para redirecionar se não estiver autenticado (apenas quando montado no cliente)
  useEffect(() => {
    if (isMounted && isUnauthenticated) {
      router.push('/login');
    }
  }, [isMounted, isUnauthenticated, router]);
  
  // Determinar se deve mostrar a sidebar (somente para páginas autenticadas)
  const showSidebar = isMounted && !isUnauthenticated && isAuthRequired;
  
  // Conteúdo da página com sidebar
  const pageWithSidebar = (
    <div className={`min-h-screen flex ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar Desktop */}
      <Sidebar
        user={user}
        onSignOut={signOut}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      {/* Mobile Header */}
      <MobileHeader
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      {/* Mobile Menu */}
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        user={user}
        onSignOut={signOut}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      {/* Conteúdo principal */}
      <main className="flex-1 md:ml-64 min-h-screen pt-[60px] md:pt-0 bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-white">
        <div className="p-4 md:p-6 h-full">{children}</div>
      </main>
    </div>
  );
  
  // Conteúdo da página sem sidebar (páginas públicas)
  const pageWithoutSidebar = (
    <div className={darkMode ? 'dark' : ''}>
      {children}
    </div>
  );
  
  return (
    <>
      <Head>
        <title>{title} | Nexios Finance</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {showSidebar ? pageWithSidebar : pageWithoutSidebar}
    </>
  );
};

export default Layout;