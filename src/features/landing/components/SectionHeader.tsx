import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  viewAllHref?: string
  viewAllLabel?: string
  centered?: boolean
}

export default function SectionHeader({
  title,
  subtitle,
  viewAllHref,
  viewAllLabel = 'View All',
  centered = false,
}: SectionHeaderProps) {
  if (centered) {
    return (
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">{title}</h2>
        {subtitle && <p className="mx-auto mt-3 max-w-2xl text-lg text-text-muted">{subtitle}</p>}
      </div>
    )
  }

  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-2 text-text-muted">{subtitle}</p>}
      </div>
      {viewAllHref && (
        <Link
          to={viewAllHref}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
        >
          {viewAllLabel}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={2}
          />
        </Link>
      )}
    </div>
  )
}
