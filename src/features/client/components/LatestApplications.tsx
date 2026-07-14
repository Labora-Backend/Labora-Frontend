import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Badge from '@/components/ui/Badge'
import type { ApplicationStatus, LatestApplication } from '@/features/client/types/dashboard'
import { ClientCard, ClientCardBody, ClientCardHeader } from '@/features/client/components/ClientCard'
import { formatRelativeTime } from '@/features/client/utils/formatRelativeTime'

const statusVariant: Record<ApplicationStatus, 'warning' | 'success' | 'default' | 'info' | 'primary' | 'secondary'> = {
  new: 'primary',
  viewed: 'secondary',
  shortlisted: 'info',
  rejected: 'default',
  pending: 'warning',
  accepted: 'success',
}

const statusLabel: Record<ApplicationStatus, string> = {
  new: 'New',
  viewed: 'Viewed',
  shortlisted: 'Shortlisted',
  rejected: 'Rejected',
  pending: 'Pending',
  accepted: 'Accepted',
}

interface LatestApplicationsProps {
  applications: LatestApplication[]
}

export default function LatestApplications({ applications }: LatestApplicationsProps) {
  return (
    <ClientCard hover={false} className="h-full">
      <ClientCardHeader
        title="Latest Applications"
        action={
          <Link
            to="/client/applications"
            className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-dark"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />
      <ClientCardBody className="space-y-3">
        {applications.map((application) => (
          <div
            key={application.id}
            className="flex items-center gap-4 rounded-xl border border-slate-100 p-3 transition-colors hover:bg-slate-50"
          >
            <img
              src={application.freelancerAvatar}
              alt={application.freelancerName}
              loading="lazy"
              className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-slate-100"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-text">{application.freelancerName}</p>
              <p className="truncate text-sm text-text-muted">{application.skill}</p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <time className="text-xs text-text-muted">
                {formatRelativeTime(application.appliedAt)}
              </time>
              <Badge variant={statusVariant[application.status]}>
                {statusLabel[application.status]}
              </Badge>
            </div>
          </div>
        ))}
      </ClientCardBody>
    </ClientCard>
  )
}
