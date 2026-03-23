'use client'

import React from 'react'
import { ButtonProps } from '@/lib/types'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = `
    btn
    inline-flex
    items-center
    justify-center
    gap-2
    font-medium
    rounded-lg
    transition-all
    duration-200
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    focus:ring-offset-transparent
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:pointer-events-none
  `

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-amber-600 to-amber-700
      hover:from-amber-700 hover:to-amber-800
      text-white
      shadow-lg
      hover:shadow-xl
      focus:ring-amber-500
      border border-amber-800/20
    `,
    secondary: `
      bg-gradient-to-r from-gray-700 to-gray-800
      hover:from-gray-800 hover:to-gray-900
      text-white
      focus:ring-gray-500
      border border-gray-900/20
    `,
    ghost: `
      bg-transparent
      text-gray-700
      hover:bg-gray-100
      hover:text-gray-900
      focus:ring-gray-300
      border border-transparent
    `,
    outline: `
      bg-transparent
      text-gray-700
      border border-gray-300
      hover:bg-gray-50
      hover:border-gray-400
      focus:ring-gray-400
    `
  }

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  }

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      e.preventDefault()
      return
    }
    onClick?.()
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={handleClick}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          viewBox="0 0 24 24"
          aria-hidden="true"
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
      )}
      {children}
    </button>
  )
}