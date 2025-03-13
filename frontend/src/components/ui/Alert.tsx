import React from 'react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  description,
  icon,
  onClose,
  className = '',
  children,
}) => {
  // Configurações de estilo para cada variante
  const variantConfig = {
    info: {
      containerClass: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/50',
      titleClass: 'text-blue-800 dark:text-blue-300',
      descriptionClass: 'text-blue-700 dark:text-blue-200',
      icon: icon || (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    success: {
      containerClass: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/50',
      titleClass: 'text-green-800 dark:text-green-300',
      descriptionClass: 'text-green-700 dark:text-green-200',
      icon: icon || (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    warning: {
      containerClass: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/50',
      titleClass: 'text-amber-800 dark:text-amber-300',
      descriptionClass: 'text-amber-700 dark:text-amber-200',
      icon: icon || (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400 dark:text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    error: {
      containerClass: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/50',
      titleClass: 'text-red-800 dark:text-red-300',
      descriptionClass: 'text-red-700 dark:text-red-200',
      icon: icon || (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 dark:text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  };

  const selectedVariant = variantConfig[variant];

  return (
    <div className={`rounded-xl border p-4 ${selectedVariant.containerClass} ${className}`} role="alert">
      <div className="flex">
        <div className="flex-shrink-0">
          {selectedVariant.icon}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${selectedVariant.titleClass}`}>
              {title}
            </h3>
          )}
          {description && (
            <div className={`text-sm mt-1 ${selectedVariant.descriptionClass}`}>
              {description}
            </div>
          )}
          {children}
        </div>
        {onClose && (
          <button
            type="button"
            className={`ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 focus:outline-none focus:ring-2 hover:bg-opacity-10`}
            onClick={onClose}
            aria-label="Fechar"
          >
            <span className="sr-only">Fechar</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;