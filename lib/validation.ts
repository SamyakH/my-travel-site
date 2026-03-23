/**
 * Validation utilities for form inputs
 */

/**
 * Email validation using RFC 5322 compliant regex
 * @param email - The email string to validate
 * @returns boolean indicating if email is valid
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false
  }

  // RFC 5322 compliant email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  
  return emailRegex.test(email.trim())
}

/**
 * Password validation
 * @param password - The password string to validate
 * @returns object with validation result and error message
 */
export function validatePassword(password: string): { isValid: boolean; error?: string } {
  if (!password || typeof password !== 'string') {
    return { isValid: false, error: 'Password is required' }
  }

  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters long' }
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' }
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' }
  }

  // Check for at least one number
  if (!/\d/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' }
  }

  return { isValid: true }
}

/**
 * Name validation (for first name, last name, etc.)
 * @param name - The name string to validate
 * @returns boolean indicating if name is valid
 */
export function validateName(name: string): boolean {
  if (!name || typeof name !== 'string') {
    return false
  }

  // Allow letters, spaces, hyphens, and apostrophes
  const nameRegex = /^[a-zA-Z\s\-']+$/
  
  return nameRegex.test(name.trim()) && name.trim().length >= 2
}

/**
 * Phone number validation (international format)
 * @param phone - The phone number string to validate
 * @returns boolean indicating if phone number is valid
 */
export function validatePhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') {
    return false
  }

  // Remove all spaces, dashes, and parentheses
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '')
  
  // Check if it contains only digits and is between 10-15 digits
  const phoneRegex = /^\+?[1-9]\d{1,14}$/
  
  return phoneRegex.test(cleanPhone)
}

/**
 * URL validation
 * @param url - The URL string to validate
 * @returns boolean indicating if URL is valid
 */
export function validateUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false
  }

  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Generic form validation helper
 */
export const formValidators = {
  email: validateEmail,
  password: validatePassword,
  name: validateName,
  phone: validatePhone,
  url: validateUrl
}