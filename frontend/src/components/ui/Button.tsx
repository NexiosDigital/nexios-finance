'use client'

import React, { ButtonHTMLAttributes, forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = '',
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    // Variantes de estilo
    const variantStyles: Record<ButtonVariant, string> = {
      primary: 'bg-emerald-600 text-white hover:bg-emerald-700',
      secondary: 'bg-gray-800 text-white hover:bg-gray-700',
      outline: 'border border-gray-700 bg-transparent text-white hover:bg-gray-800',
      ghost: 'bg-transparent text-white hover:bg-gray-800',
      danger: 'bg-red-600 text-white hover:bg-red-700',
    }
    
    // Tamanhos
    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 py-2',
      lg: 'h-12 px-6 py-3 text-base',
    }
    
    // Compor classes
    const buttonClasses = [
      'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none relative',
      variantStyles[variant],
      sizeStyles[size],
      fullWidth ? 'w-full' : '',
      (disabled || loading) ? 'opacity-50 cursor-not-allowed' : '',
      loading ? 'text-transparent' : '',
      className
    ].filter(Boolean).join(' ')
    
    return (
      <button
        type={type}
        className={buttonClasses}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && (
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
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        )}
        
        <span className={loading ? 'invisible' : 'flex items-center'}>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </span>
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button