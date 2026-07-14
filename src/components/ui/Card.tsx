import type { HTMLAttributes, PropsWithChildren } from 'react'

interface CardProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export function Card({
  children,
  hover = false,
  padding = 'md',
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={`rounded-2xl border border-slate-100 bg-surface shadow-card ${
        hover
          ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover'
          : ''
      } ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  )
}

export default Card
