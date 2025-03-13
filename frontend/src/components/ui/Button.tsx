import React, { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isFullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isFullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  type = 'button',
  ...props
}) => {
  // Estilos base
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none';
  
  // Variantes de estilo
  const variantStyles = {
    primary: 'bg-gradient-primary text-white hover:shadow-md active:shadow-inner',
    secondary: 'bg-gray-100 dark:bg-dark-surface text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-dark-border',
    outline: 'border border-gray-300 dark:border-dark-border text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-dark-surface',
    ghost: 'text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-dark-surface',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };
  
  // Tamanhos
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5',
    lg: 'px-6 py-3 text-lg',
  };
  
  // Estados
  const stateStyles = {
    disabled: 'opacity-50 cursor-not-allowed',
    loading: 'relative !text-transparent hover:!text-transparent',
    fullWidth: 'w-full',
  };
  
  // Compor classes
  const buttonClasses = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    isFullWidth && stateStyles.fullWidth,
    (disabled || isLoading) && stateStyles.disabled,
    isLoading && stateStyles.loading,
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            className="animate-spin h-5 w-5 text-white" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            ></circle>
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
      
      {leftIcon && !isLoading && (
        <span className="mr-2">{leftIcon}</span>
      )}
      
      {children}
      
      {rightIcon && !isLoading && (
        <span className="ml-2">{rightIcon}</span>
      )}
    </button>
  );
};

export default Button;