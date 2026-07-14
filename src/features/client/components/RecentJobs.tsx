import {
  ArrowRight,
  BarChart3,
  Cloud,
  Code2,
  Palette,
  PenLine,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import Badge from '@/components/ui/Badge'
import type { JobStatus, RecentJob } from '@/features/client/types/dashboard'
import { ClientCard, ClientCardBody, ClientCardHeader } from '@/features/client/components/ClientCard'

const statusVariant: Record<JobStatus, 'primary' | 'info' | 'success' | 'warning'> = {
  open: 'info',
  in_progress: 'success',
  completed: 'primary',
  cancelled: 'warning',
}

const statusLabel: Record<JobStatus, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

const jobIcons: Record<RecentJob['icon'], LucideIcon> = {
  code: Code2,
  design: Palette,
  cloud: Cloud,
  content: PenLine,
  data: BarChart3,
}

const jobIconColors: Record<RecentJob['icon'], string> = {
  code: 'bg-primary-50 text-primary',
  design: 'bg-secondary-50 text-secondary',
  cloud: 'bg-amber-50 text-amber-600',
  content: 'bg-violet-50 text-violet-600',
  data: 'bg-emerald-50 text-emerald-600',
}

interface RecentJobsProps {
  jobs: RecentJob[]
}

export default function RecentJobs({ jobs }: RecentJobsProps) {
  return (
    <ClientCard hover={false} className="h-full">
      <ClientCardHeader
        title="Recent Jobs"
        action={
          <Link
            to="/client/jobs"
            className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-dark"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />
      <ClientCardBody className="space-y-2 !p-4 sm:!p-5">
        {jobs.map((job) => {
          const Icon = jobIcons[job.icon]
          return (
            <div
              key={job.id}
              className="flex items-center gap-4 rounded-xl border border-slate-100 p-3 transition-colors hover:bg-slate-50"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${jobIconColors[job.icon]}`}
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-text">{job.title}</p>
                <p className="text-xs text-text-muted">{job.category}</p>
              </div>
              <div className="hidden text-center sm:block">
                <p className="text-sm font-semibold text-text">{job.applicationCount}</p>
                <p className="text-[10px] text-text-muted">applications</p>
              </div>
              <Badge variant={statusVariant[job.status]}>{statusLabel[job.status]}</Badge>
            </div>
          )
        })}
      </ClientCardBody>
    </ClientCard>
  )
}
