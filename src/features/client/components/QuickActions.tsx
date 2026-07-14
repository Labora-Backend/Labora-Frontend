import { ArrowRight, Briefcase, FileText, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ClientCard, ClientCardBody, ClientCardHeader } from '@/features/client/components/ClientCard'

interface QuickAction {
  label: string
  description: string
  href: string
  icon: LucideIcon
  color: string
  bgColor: string
}

const actions: QuickAction[] = [
  {
    label: 'Post New Job',
    description: 'Create a listing and find talent',
    href: '/client/jobs/post',
    icon: FileText,
    color: 'text-primary',
    bgColor: 'bg-primary-50',
  },
  {
    label: 'Browse Freelancers',
    description: 'Explore top-rated professionals',
    href: '/freelancers',
    icon: Users,
    color: 'text-secondary',
    bgColor: 'bg-secondary-50',
  },
  {
    label: 'View Applications',
    description: 'Review incoming proposals',
    href: '/client/applications',
    icon: Briefcase,
    color: 'text-success',
    bgColor: 'bg-success-50',
  },
]

export default function QuickActions() {
  return (
    <ClientCard hover={false}>
      <ClientCardHeader title="Quick Actions" />
      <ClientCardBody className="space-y-2">
        {actions.map((action) => (
          <Link
            key={action.label}
            to={action.href}
            className="group flex items-center gap-3 rounded-xl border border-slate-100 p-3.5 transition-all duration-200 hover:scale-[1.02] hover:border-primary/20 hover:bg-primary-50/20 hover:shadow-sm"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${action.bgColor}`}
            >
              <action.icon className={`h-5 w-5 ${action.color}`} strokeWidth={1.75} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-text">{action.label}</p>
              <p className="text-xs text-text-muted">{action.description}</p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-text-muted opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
          </Link>
        ))}
      </ClientCardBody>
    </ClientCard>
  )
}
