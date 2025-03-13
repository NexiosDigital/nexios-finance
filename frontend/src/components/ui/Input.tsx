'use client'

import React, { forwardRef, useState } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
  endIcon?: React.ReactNode
  fullWidth?: boolean
  containerClassName?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      icon,
      endIcon,
      fullWidth = false,
      className = '',
      containerClassName = '',
      type = 'text',
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPasswordType = type === 'password'
    const inputType = isPasswordType && showPassword ? 'text' : type

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    // Classes para o container
    const containerClasses = `mb-4 ${fullWidth ? 'w-full' : ''} ${containerClassName}`
    
    // Classes para o input
    const baseClasses = 'w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors bg-gray-800 border-gray-700 text-white'
    const iconPaddingLeft = icon ? 'pl-10' : ''
    const iconPaddingRight = (endIcon || isPasswordType) ? 'pr-10' : ''
    const errorClasses = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
    const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed' : ''
    
    const inputClasses = `${baseClasses} ${iconPaddingLeft} ${iconPaddingRight} ${errorClasses} ${disabledClasses} ${className}`

    return (
      <div className={containerClasses}>
        {label && (
          <label
            className="block text-sm font-medium text-gray-300 mb-1.5"
            htmlFor={props.id}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">
                {icon}
              </span>
            </div>
          )}
          
          <input
            ref={ref}
            type={inputType}
            className={inputClasses}
            disabled={disabled}
            required={required}
            {...props}
          />
          
          {isPasswordType ? (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 focus:outline-none"
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          ) : endIcon ? (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">
                {endIcon}
              </span>
            </div>
          ) : null}
        </div>
        
        {(error || helperText) && (
          <p
            className={`mt-1 text-sm ${
              error ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

// Ícones para o input de senha
const EyeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

const EyeOffIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
)

export default Input