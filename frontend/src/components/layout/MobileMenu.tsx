import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  HomeIcon,
  CreditCardIcon,
  ChartPieIcon,
  BanknotesIcon,
  TargetIcon,
  CalendarIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  MoonIcon,
  SunIcon
} from '@heroicons/react/24/outline';

// Lista de links da navegação
const navLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
  { name: 'Transações', path: '/transactions', icon: CreditCardIcon },
  { name: 'Orçamentos', path: '/budgets', icon: ChartPieIcon },
  { name: 'Investimentos', path: '/investments', icon: BanknotesIcon },
  { name: 'Metas', path: '/goals', icon: TargetIcon },
  { name: 'Contas a Pagar', path: '/bills', icon: CalendarIcon },
];

interface MobileMenuProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  user: any;
  onSignOut: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  user,
  onSignOut,
  darkMode,
  toggleDarkMode
}) => {
  const router = useRouter();
  
  // Verificar se um link está ativo
  const isActiveLink = (path: string) => {
    return router.pathname === path || router.pathname.startsWith(`${path}/`);
  };
  
  return (
    <>
      {/* Overlay para fechar o menu ao clicar fora */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Menu mobile */}
      <div 
        className={`fixed top-[60px] bottom-0 left-0 w-64 z-30 bg-white dark:bg-dark-card transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="flex-1 px-4 mt-4 overflow-y-auto">
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              const isActive = isActiveLink(link.path);
              
              return (
                <li key={link.path}>
                  <Link 
                    href={link.path}
                    className={`flex items-center px-3 py-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-primary text-white' 
                        : `hover:bg-gradient-primary hover:text-white ${darkMode ? 'dark:text-text-primary dark:hover:text-white' : ''}`
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <IconComponent className="w-5 h-5 mr-3" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* Informações do usuário e configurações no menu mobile */}
        <div className="px-4 py-4 mt-auto absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-dark-border">
          {user ? (
            <div className="space-y-4">
              <div className="p-3 rounded-xl glass dark:glass-dark">
                <div className="flex items-center">
                  <div className="rounded-full bg-primary-dark w-10 h-10 flex items-center justify-center text-white">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="ml-3 flex-1 truncate">
                    <p className="text-sm font-medium">{user.name || 'Usuário'}</p>
                    <p className="text-xs opacity-70 truncate">{user.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-xl flex-1 flex items-center justify-center dark:bg-dark-surface bg-gray-100 hover:bg-gray-200 dark:hover:bg-dark-border transition-colors"
                  aria-label={darkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
                >
                  {darkMode ? (
                    <SunIcon className="w-5 h-5" />
                  ) : (
                    <MoonIcon className="w-5 h-5" />
                  )}
                </button>
                <Link
                  href="/settings"
                  className="p-2 rounded-xl flex-1 flex items-center justify-center dark:bg-dark-surface bg-gray-100 hover:bg-gray-200 dark:hover:bg-dark-border transition-colors"
                  aria-label="Configurações"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Cog6ToothIcon className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSignOut();
                  }}
                  className="p-2 rounded-xl flex-1 flex items-center justify-center dark:bg-dark-surface bg-gray-100 hover:bg-gray-200 dark:hover:bg-dark-border transition-colors"
                  aria-label="Sair"
                >
                  <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                href="/login"
                className="w-full py-2 px-4 text-center rounded-xl bg-primary text-white hover:bg-primary-dark transition-colors block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Entrar
              </Link>
              <Link
                href="/signup"
                className="w-full py-2 px-4 text-center rounded-xl dark:bg-dark-surface dark:hover:bg-dark-border bg-gray-100 hover:bg-gray-200 transition-colors block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cadastrar
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;