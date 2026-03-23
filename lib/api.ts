import { validateContactForm, validateLeadForm, validateReviewForm } from './validation'

// API Response types
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

interface ContactFormData {
  name: string
  email: string
  phone: string
  destination: string
  timing: string
  message?: string
}

interface LeadFormData {
  name: string
  email: string
  phone: string
  message?: string
  package_id?: string
  package_title?: string
  source: string
}

interface ReviewFormData {
  client_name: string
  destination?: string
  rating: number
  comment: string
  package_id?: string
}

// API Service class with enhanced error handling and validation
export class ApiService {
  private static readonly API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api'
  private static readonly CSRF_TOKEN = () => document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')

  private static async handleApiError(error: any, operation: string): Promise<ApiResponse<any>> {
    console.error(`API Error in ${operation}:`, error)
    
    // Handle specific error types
    if (error.status === 429) {
      return {
        success: false,
        error: 'Rate limit exceeded',
        message: 'Too many requests. Please try again later.'
      }
    }

    if (error.status === 400) {
      return {
        success: false,
        error: 'Invalid request',
        message: 'Please check your input and try again.'
      }
    }

    if (error.status === 401) {
      return {
        success: false,
        error: 'Authentication required',
        message: 'Please log in to continue.'
      }
    }

    if (error.status === 403) {
      return {
        success: false,
        error: 'Access denied',
        message: 'You do not have permission to perform this action.'
      }
    }

    if (error.status === 404) {
      return {
        success: false,
        error: 'Not found',
        message: 'The requested resource could not be found.'
      }
    }

    if (error.status === 500) {
      return {
        success: false,
        error: 'Server error',
        message: 'An unexpected error occurred. Please try again later.'
      }
    }

    return {
      success: false,
      error: 'Network error',
      message: 'Unable to connect to the server. Please check your internet connection.'
    }
  }

  private static async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.API_BASE}${endpoint}`
      const headers = {
        'Content-Type': 'application/json',
        'X-CSRF-Token': this.CSRF_TOKEN() || '',
        ...options.headers
      }

      const response = await fetch(url, {
        ...options,
        headers
      })

      if (!response.ok) {
        throw {
          status: response.status,
          message: response.statusText
        }
      }

      const data = await response.json()
      return {
        success: true,
        data
      }
    } catch (error) {
      return await this.handleApiError(error, endpoint)
    }
  }

  // Contact form submission
  static async submitContactForm(data: ContactFormData): Promise<ApiResponse<any>> {
    try {
      // Validate form data
      const validation = validateContactForm(data)
      if (!validation.isValid) {
        return {
          success: false,
          error: 'Validation failed',
          message: Object.values(validation.errors)[0] // Return first error
        }
      }

      return await this.makeRequest('/leads', {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          destination: data.destination,
          timing: data.timing,
          message: data.message || '',
          source: 'contact-form'
        })
      })
    } catch (error) {
      return await this.handleApiError(error, 'submitContactForm')
    }
  }

  // Lead generation from package pages
  static async submitLeadForm(data: LeadFormData): Promise<ApiResponse<any>> {
    try {
      // Validate form data
      const validation = validateLeadForm(data)
      if (!validation.isValid) {
        return {
          success: false,
          error: 'Validation failed',
          message: Object.values(validation.errors)[0]
        }
      }

      return await this.makeRequest('/leads', {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          destination: data.package_title,
          message: data.message || '',
          notes: `Package interest: ${data.package_title}`,
          source: data.source
        })
      })
    } catch (error) {
      return await this.handleApiError(error, 'submitLeadForm')
    }
  }

  // Review submission
  static async submitReview(data: ReviewFormData): Promise<ApiResponse<any>> {
    try {
      // Validate form data
      const validation = validateReviewForm(data)
      if (!validation.isValid) {
        return {
          success: false,
          error: 'Validation failed',
          message: Object.values(validation.errors)[0]
        }
      }

      return await this.makeRequest('/reviews', {
        method: 'POST',
        body: JSON.stringify({
          client_name: data.client_name,
          destination: data.destination || null,
          rating: data.rating,
          comment: data.comment,
          package_id: data.package_id || null
        })
      })
    } catch (error) {
      return await this.handleApiError(error, 'submitReview')
    }
  }

  // Get packages
  static async getPackages(page = 1, limit = 10, sortBy = 'created_at', sortOrder: 'asc' | 'desc' = 'desc') {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortBy,
        sortOrder
      })

      return await this.makeRequest(`/packages?${params}`)
    } catch (error) {
      return await this.handleApiError(error, 'getPackages')
    }
  }

  // Get package by ID
  static async getPackageById(id: string) {
    try {
      const result = await this.makeRequest(`/packages/${id}`)
      if (!result.success && result.error === 'Not found') {
        return {
          success: false,
          error: 'Package not found',
          message: 'The requested package could not be found'
        }
      }
      return result
    } catch (error) {
      return await this.handleApiError(error, 'getPackageById')
    }
  }

  // Get categories
  static async getCategories() {
    try {
      return await this.makeRequest('/categories')
    } catch (error) {
      return await this.handleApiError(error, 'getCategories')
    }
  }

  // Get reviews with filtering
  static async getReviews(page = 1, limit = 10, approved = true) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        approved: approved.toString()
      })

      return await this.makeRequest(`/reviews?${params}`)
    } catch (error) {
      return await this.handleApiError(error, 'getReviews')
    }
  }

  // Admin operations
  static async getStats() {
    try {
      return await this.makeRequest('/admin/stats')
    } catch (error) {
      return await this.handleApiError(error, 'getStats')
    }
  }

  static async getLeads(page = 1, limit = 20, status?: string) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      })
      
      if (status) {
        params.append('status', status)
      }

      return await this.makeRequest(`/admin/leads?${params}`)
    } catch (error) {
      return await this.handleApiError(error, 'getLeads')
    }
  }

  static async updateLeadStatus(id: string, status: 'new' | 'contacted' | 'converted' | 'lost') {
    try {
      return await this.makeRequest(`/admin/leads/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      })
    } catch (error) {
      return await this.handleApiError(error, 'updateLeadStatus')
    }
  }

  static async approveReview(id: string) {
    try {
      return await this.makeRequest(`/admin/reviews/${id}/approve`, {
        method: 'PATCH'
      })
    } catch (error) {
      return await this.handleApiError(error, 'approveReview')
    }
  }

  // Health check endpoint
  static async healthCheck() {
    try {
      return await this.makeRequest('/health')
    } catch (error) {
      return {
        success: false,
        error: 'Health check failed',
        message: 'Unable to verify service health'
      }
    }
  }

  // CSRF token management
  static async getCsrfToken(): Promise<string | null> {
    try {
      const response = await this.makeRequest<{ token: string }>('/csrf-token')
      return response.success ? response.data?.token || null : null
    } catch (error) {
      console.error('Failed to get CSRF token:', error)
      return null
    }
  }
}

// Utility functions for API responses
export function createSuccessResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message
  }
}

export function createErrorResponse(error: string, message?: string): ApiResponse<any> {
  return {
    success: false,
    error,
    message
  }
}

// Rate limiting helper (basic implementation)
class RateLimiter {
  private static requests = new Map<string, number[]>()

  static isAllowed(identifier: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
    const now = Date.now()
    const windowStart = now - windowMs
    
    if (!this.requests.has(identifier)) {
      this.requests.set(identifier, [])
    }

    const userRequests = this.requests.get(identifier)!
    
    // Remove old requests outside the window
    const validRequests = userRequests.filter(timestamp => timestamp > windowStart)
    this.requests.set(identifier, validRequests)

    // Check if under limit
    if (validRequests.length >= maxRequests) {
      return false
    }

    // Add current request
    validRequests.push(now)
    return true
  }
}

// Enhanced API middleware for rate limiting
export function checkRateLimit(identifier: string, maxRequests = 10, windowMs = 60000): ApiResponse<any> {
  if (!RateLimiter.isAllowed(identifier, maxRequests, windowMs)) {
    return {
      success: false,
      error: 'Rate limit exceeded',
      message: 'Too many requests. Please try again later.'
    }
  }
  return { success: true }
}

// CSRF token validation
export function validateCsrfToken(token: string | null): boolean {
  // This would integrate with your CSRF protection system
  // For now, it's a placeholder
  return !!token && token.length > 0
}