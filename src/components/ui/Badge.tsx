import type { PropsWithChildren } from 'react'

type BadgeVariant = 'default' | 'success' | 'info' | 'warning' | 'primary' | 'secondary'

interface BadgeProps extends PropsWithChildren {
  variant?: BadgeVariant
  className?: string
  dot?: boolean
}

const badgeClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-success-50 text-success',
  info: 'bg-secondary-50 text-secondary',
  warning: 'bg-amber-100 text-amber-700',
  primary: 'bg-primary-50 text-primary',
  secondary: 'bg-secondary-50 text-secondary',
}

export function Badge({ children, variant = 'default', className = '', dot = false }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClasses[variant]} ${className}`}
    >
      {dot && (
        <span className="relative flex h-2 w-2 motion-reduce:animate-none">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75 motion-reduce:hidden" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
        </span>
      )}
      {children}
    </span>
  )
}

export default Badge
