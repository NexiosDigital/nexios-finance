import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Altere esta importação
// Remova: import { useRouter } from 'next/router';
import { 
  HomeIcon,
  CreditCardIcon,
  ChartPieIcon,
  BanknotesIcon,
  CalendarIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

// Ícone de flag para substituir TargetIcon
const FlagIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
  </svg>
);

// Lista de links da navegação
const navLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
  { name: 'Transações', path: '/transactions', icon: CreditCardIcon },
  { name: 'Orçamentos', path: '/budgets', icon: ChartPieIcon },
  { name: 'Investimentos', path: '/investments', icon: BanknotesIcon },
  { name: 'Metas', path: '/goals', icon: FlagIcon },
  { name: 'Contas a Pagar', path: '/bills', icon: CalendarIcon },
];

// Modificar a interface SidebarProps se necessário
interface SidebarProps {
  user?: any;
  onSignOut?: () => void;
  darkMode?: boolean;
  toggleDarkMode?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  user, 
  onSignOut = () => {}, // Valor padrão para evitar erros
  darkMode = true, // Valor padrão
  toggleDarkMode = () => {} // Valor padrão
}) => {
  const pathname = usePathname(); // Use usePathname em vez de useRouter
  
  // Verificar se um link está ativo
  const isActiveLink = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };
  
  return (
    <aside className="hidden md:block fixed inset-y-0 left-0 w-64 dark:bg-dark-card bg-gray-800 shadow-lg z-10">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="px-6 py-6">
          <Link href="/dashboard" className="flex items-center">
            <span className="text-xl font-bold font-display bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
              Nexios <span className="text-emerald-400">FINANCE</span>
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
                        ? 'bg-emerald-600 text-white' 
                        : `hover:bg-emerald-600 hover:text-white ${darkMode ? 'text-gray-300 hover:text-white' : ''}`
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
          <div className="p-3 rounded-xl bg-gray-700">
            <div className="flex items-center">
              <div className="rounded-full bg-emerald-600 w-10 h-10 flex items-center justify-center text-white">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="ml-3 flex-1 truncate">
                <p className="text-sm font-medium text-white">{user?.name || 'Usuário'}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
              <ChevronDownIcon className="w-4 h-4 ml-1 text-gray-400" />
            </div>
          </div>
          
          <div className="flex space-x-2 mt-4">
            <button
              onClick={onSignOut}
              className="p-2 rounded-xl flex-1 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white transition-colors"
              aria-label="Sair"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5" />
            </button>
            <Link
              href="/profile"
              className="p-2 rounded-xl flex-1 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white transition-colors"
              aria-label="Configurações"
            >
              <Cog6ToothIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;