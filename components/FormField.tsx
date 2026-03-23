'use client'

import React from 'react'
import { FormFieldProps } from '@/lib/types'

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  placeholder = '',
  options = [],
  error,
  disabled = false
}: FormFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange(e.target.value)
  }

  const getFieldId = () => `field-${name}`
  const getErrorId = () => `error-${name}`

  const baseInputClasses = `
    w-full
    px-3
    py-2
    border
    rounded-lg
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    transition-colors
    duration-200
    bg-white
    text-gray-900
    placeholder-gray-500
  `

  const inputClasses = `
    ${baseInputClasses}
    ${error 
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
      : 'border-gray-300 focus:ring-amber-500 focus:border-amber-500'
    }
    ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-50' : ''}
  `

  const renderField = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={getFieldId()}
            name={name}
            value={value as string}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={inputClasses}
            rows={4}
            aria-describedby={error ? getErrorId() : undefined}
            aria-invalid={error ? 'true' : 'false'}
          />
        )
      
      case 'select':
        return (
          <select
            id={getFieldId()}
            name={name}
            value={value as string}
            onChange={handleChange}
            required={required}
            disabled={disabled}
            className={inputClasses}
            aria-describedby={error ? getErrorId() : undefined}
            aria-invalid={error ? 'true' : 'false'}
          >
            <option value="">{placeholder || 'Please select...'}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )

      default:
        return (
          <input
            id={getFieldId()}
            name={name}
            type={type}
            value={value as string}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={inputClasses}
            aria-describedby={error ? getErrorId() : undefined}
            aria-invalid={error ? 'true' : 'false'}
          />
        )
    }
  }

  return (
    <div className="form-field">
      <label 
        htmlFor={getFieldId()}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {renderField()}
      
      {error && (
        <p 
          id={getErrorId()}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}