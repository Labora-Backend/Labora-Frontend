import { motion } from 'framer-motion'
import type { PropsWithChildren } from 'react'

interface ClientCardProps extends PropsWithChildren {
  className?: string
  hover?: boolean
}

export function ClientCard({ children, className = '', hover = true }: ClientCardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`rounded-2xl border border-slate-100 bg-surface shadow-card transition-shadow duration-300 hover:shadow-card-hover ${className}`}
    >
      {children}
    </motion.div>
  )
}

export function ClientCardHeader({
  title,
  action,
}: {
  title: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
      <h3 className="text-base font-semibold text-text">{title}</h3>
      {action}
    </div>
  )
}

export function ClientCardBody({
  children,
  className = '',
}: PropsWithChildren<{ className?: string }>) {
  return <div className={`p-5 sm:p-6 ${className}`}>{children}</div>
}

export function ClientSectionSkeleton({ className = 'h-48' }: { className?: string }) {
  return (
    <div
      className={`skeleton-shimmer rounded-2xl border border-slate-100 bg-slate-100 ${className}`}
      aria-hidden="true"
    />
  )
}
