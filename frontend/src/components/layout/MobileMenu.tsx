import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Altere esta importação
// Remova: import { useRouter } from 'next/router';
import { 
  HomeIcon,
  CreditCardIcon,
  ChartPieIcon,
  BanknotesIcon,
  // Remova: TargetIcon,
  CalendarIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  MoonIcon,
  SunIcon
} from '@heroicons/react/24/outline';

// Adicione o ícone FlagIcon como fizemos no Sidebar
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
  { name: 'Metas', path: '/goals', icon: FlagIcon },  // Use FlagIcon em vez de TargetIcon
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
  user = null, // Valor padrão
  onSignOut = () => {}, // Valor padrão
  darkMode = true, // Valor padrão
  toggleDarkMode = () => {} // Valor padrão
}) => {
  const pathname = usePathname(); // Use usePathname em vez de useRouter
  
  // Verificar se um link está ativo
  const isActiveLink = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
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
        className={`fixed top-[60px] bottom-0 left-0 w-64 z-30 bg-gray-800 transform transition-transform duration-300 ease-in-out md:hidden ${
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
                        ? 'bg-emerald-600 text-white' 
                        : `hover:bg-emerald-600 hover:text-white ${darkMode ? 'text-gray-300 hover:text-white' : ''}`
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
        <div className="px-4 py-4 mt-auto absolute bottom-0 left-0 right-0 border-t border-gray-700">
          {user ? (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-gray-700">
                <div className="flex items-center">
                  <div className="rounded-full bg-emerald-600 w-10 h-10 flex items-center justify-center text-white">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="ml-3 flex-1 truncate">
                    <p className="text-sm font-medium text-white">{user.name || 'Usuário'}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-xl flex-1 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                  aria-label={darkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
                >
                  {darkMode ? (
                    <SunIcon className="w-5 h-5" />
                  ) : (
                    <MoonIcon className="w-5 h-5" />
                  )}
                </button>
                <Link
                  href="/profile"
                  className="p-2 rounded-xl flex-1 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white transition-colors"
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
                  className="p-2 rounded-xl flex-1 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white transition-colors"
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
                className="w-full py-2 px-4 text-center rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Entrar
              </Link>
              <Link
                href="/register"
                className="w-full py-2 px-4 text-center rounded-xl bg-gray-700 hover:bg-gray-600 text-white transition-colors block"
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