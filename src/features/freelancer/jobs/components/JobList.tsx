import type { FreelanceJob } from '@/features/freelancer/jobs/types/jobs'
import type { ViewMode } from '@/features/freelancer/jobs/utils/jobFilters'
import { JobCard } from '@/features/freelancer/jobs/components/JobCard'

interface JobListProps {
  jobs: FreelanceJob[]
  savedJobIds: string[]
  view: ViewMode
  onToggleSaved: (id: string) => void
}

export function JobList({ jobs, savedJobIds, view, onToggleSaved }: JobListProps) {
  return (
    <div className={view === 'grid' ? 'grid gap-5 xl:grid-cols-2' : 'space-y-5'}>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} saved={savedJobIds.includes(job.id)} view={view} onToggleSaved={onToggleSaved} />
      ))}
    </div>
  )
}
