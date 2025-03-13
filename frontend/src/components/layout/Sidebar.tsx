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
  ChevronDownIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
  user: any;
  onSignOut: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Lista de links da navegação
const navLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
  { name: 'Transações', path: '/transactions', icon: CreditCardIcon },
  { name: 'Orçamentos', path: '/budgets', icon: ChartPieIcon },
  { name: 'Investimentos', path: '/investments', icon: BanknotesIcon },
  { name: 'Metas', path: '/goals', icon: TargetIcon },
  { name: 'Contas a Pagar', path: '/bills', icon: CalendarIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ user, onSignOut, darkMode, toggleDarkMode }) => {
  const router = useRouter();
  
  // Verificar se um link está ativo
  const isActiveLink = (path: string) => {
    return router.pathname === path || router.pathname.startsWith(`${path}/`);
  };
  
  return (
    <aside className="hidden md:block fixed inset-y-0 left-0 w-64 dark:bg-dark-card bg-white shadow-lg z-10">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="px-6 py-6">
          <Link href="/dashboard" className="flex items-center">
            <span className="text-xl font-bold font-display bg-gradient-primary bg-clip-text text-transparent">
              Nexios <span className="text-primary-light">FINANCE</span>
            </span>
          </Link>
        </div>
        
        {/* Menu de navegação */}
        <nav className="flex-1 px-4 mt-6">
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
                  >
                    <IconComponent className="w-5 h-5 mr-3" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* Informações do usuário e configurações */}
        <div className="px-4 py-4 mt-auto">
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
                  <ChevronDownIcon className="w-4 h-4 ml-1" />
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
                >
                  <Cog6ToothIcon className="w-5 h-5" />
                </Link>
                <button
                  onClick={onSignOut}
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
              >
                Entrar
              </Link>
              <Link
                href="/signup"
                className="w-full py-2 px-4 text-center rounded-xl dark:bg-dark-surface dark:hover:bg-dark-border bg-gray-100 hover:bg-gray-200 transition-colors block"
              >
                Cadastrar
              </Link>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

// Ícones adicionais
const SunIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

export default Sidebar;