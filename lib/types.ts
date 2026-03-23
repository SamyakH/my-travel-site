// TypeScript interfaces for better type safety

// Database Models
export interface Package {
  id: string
  title: string
  tagline: string
  price: number
  duration: string
  description: string
  image_url: string
  category: string
  is_active: boolean
  itinerary: ItineraryDay[] | null
  created_at: string
}

export interface ItineraryDay {
  day: number
  title: string
  description: string
}

export interface Category {
  id: string
  name: string
  slug: string
  sort_order: number
  created_at: string
}

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  destination: string | null
  timing: string | null
  message: string | null
  notes: string | null
  status: 'new' | 'contacted' | 'converted' | 'lost'
  source: string
  created_at: string
}

export interface Review {
  id: string
  client_name: string
  rating: number
  comment: string
  destination: string | null
  is_approved: boolean
  package_id: string | null
  created_at: string
}

// Form Types
export interface ContactFormData {
  name: string
  email: string
  phone: string
  destination: string
  timing: string
  message?: string
}

export interface LeadFormData {
  name: string
  email: string
  phone: string
  message?: string
  package_id?: string
  package_title?: string
  source: string
}

export interface ReviewFormData {
  client_name: string
  destination?: string
  rating: number
  comment: string
  package_id?: string
}

export interface PackageFormData {
  title: string
  tagline: string
  price: number
  duration: string
  description: string
  image_url: string
  category: string
  is_active?: boolean
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  error?: string
}

export interface StatsResponse {
  packages: number
  leads: number
  newLeads: number
  pendingReviews: number
  recentLeads: Lead[]
}

// Component Props
export interface PackageCardProps {
  package: Package
  showPrice?: boolean
  showCategory?: boolean
  showDuration?: boolean
}

export interface FormFieldProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  value: string | number
  onChange: (value: string | number) => void
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
  error?: string
  disabled?: boolean
}

export interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

// Validation Types
export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export interface ValidationRules {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string | number) => string | null
}

// Error Boundary Types
export interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

// Loading States
export interface LoadingState {
  isLoading: boolean
  error?: string | null
}

// Pagination
export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// SEO Types
export interface SeoMetadata {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  twitterCard?: 'summary' | 'summary_large_image'
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>