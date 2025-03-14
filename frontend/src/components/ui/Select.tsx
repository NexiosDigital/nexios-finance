// src/components/ui/Select.tsx
'use client'

import React, { forwardRef, SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
  fullWidth?: boolean
  containerClassName?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      icon,
      fullWidth = false,
      className = '',
      containerClassName = '',
      disabled,
      required,
      children,
      ...props
    },
    ref
  ) => {
    // Classes para o container
    const containerClasses = `mb-4 ${fullWidth ? 'w-full' : ''} ${containerClassName}`
    
    // Classes para o select
    const baseClasses = 'w-full px-4 py-3 rounded-lg appearance-none bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors'
    const iconPaddingLeft = icon ? 'pl-10' : ''
    const errorClasses = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
    const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed' : ''
    
    const selectClasses = `${baseClasses} ${iconPaddingLeft} ${errorClasses} ${disabledClasses} ${className}`

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
          
          <select
            ref={ref}
            className={selectClasses}
            disabled={disabled}
            required={required}
            {...props}
          >
            {children}
          </select>
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
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

Select.displayName = 'Select'

export default Select