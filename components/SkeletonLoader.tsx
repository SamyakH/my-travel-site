'use client'

interface SkeletonLoaderProps {
  className?: string
  width?: string | number
  height?: string | number
  count?: number
  borderRadius?: string
  animated?: boolean
}

export default function SkeletonLoader({
  className = '',
  width,
  height,
  count = 1,
  borderRadius = '4px',
  animated = true
}: SkeletonLoaderProps) {
  const skeletonStyle = {
    width: width || '100%',
    height: height || '1rem',
    borderRadius,
    ...(animated && {
      animation: 'pulse 1.5s ease-in-out infinite'
    })
  }

  const skeletons = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={`skeleton ${className}`}
      style={skeletonStyle}
      role="presentation"
      aria-hidden="true"
    />
  ))

  return <>{skeletons}</>
}

// CSS-in-JS styles for skeleton animation
const style = document.createElement('style')
style.textContent = `
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }
  
  .skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    background-position: 200% 0;
    animation: shimmer 1.5s infinite;
  }
  
  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`
document.head.appendChild(style)