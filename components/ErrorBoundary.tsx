'use client'

import React from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo })
    this.props.onError?.(error, errorInfo)
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      // Error logging removed for production
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return (
        <FallbackComponent 
          error={this.state.error!} 
          reset={this.resetError} 
        />
      )
    }

    return this.props.children
  }
}

const DefaultErrorFallback: React.FC<{ error: Error; reset: () => void }> = ({ 
  error, 
  reset 
}) => (
  <div className="error-boundary-fallback">
    <div className="error-content">
      <h2>Something went wrong</h2>
          <p>We're sorry, but something unexpected happened.</p>
      
      {process.env.NODE_ENV === 'development' && (
        <details className="error-details">
          <summary>Error details (Development)</summary>
          <pre>{error.stack}</pre>
        </details>
      )}
      
      <div className="error-actions">
        <button onClick={reset} className="btn btn-primary">
          Try again
        </button>
        <button 
          onClick={() => window.location.reload()} 
          className="btn btn-outline"
        >
          Refresh page
        </button>
      </div>
    </div>
  </div>
)

export default ErrorBoundary