import type { PropsWithChildren } from 'react'

type BadgeVariant = 'default' | 'success' | 'info' | 'warning'

interface BadgeProps extends PropsWithChildren {
  variant?: BadgeVariant
}

const badgeClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-emerald-100 text-emerald-700',
  info: 'bg-blue-100 text-blue-700',
  warning: 'bg-amber-100 text-amber-700',
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${badgeClasses[variant]}`}>
      {children}
    </span>
  )
}