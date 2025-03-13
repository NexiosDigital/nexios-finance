import React from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface MobileHeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  mobileMenuOpen,
  setMobileMenuOpen
}) => {
  return (
    <div className="md:hidden">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white dark:bg-dark-card shadow-md">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center">
            <span className="text-xl font-bold font-display bg-gradient-primary bg-clip-text text-transparent">
              Nexios <span className="text-primary-light">FINANCE</span>
            </span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl dark:bg-dark-surface bg-gray-100"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;