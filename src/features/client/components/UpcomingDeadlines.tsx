import { Calendar } from 'lucide-react'
import type { UpcomingDeadline } from '@/features/client/types/dashboard'
import { ClientCard, ClientCardBody, ClientCardHeader } from '@/features/client/components/ClientCard'

function getUrgencyClass(daysRemaining: number) {
  if (daysRemaining <= 3) return 'bg-rose-50 text-rose-600 border-rose-100'
  if (daysRemaining <= 7) return 'bg-amber-50 text-amber-600 border-amber-100'
  return 'bg-secondary-50 text-secondary border-secondary-100'
}

function getDaysLabel(days: number) {
  return days === 1 ? '1 Day Left' : `${days} Days Left`
}

interface UpcomingDeadlinesProps {
  deadlines: UpcomingDeadline[]
}

export default function UpcomingDeadlines({ deadlines }: UpcomingDeadlinesProps) {
  return (
    <ClientCard hover={false}>
      <ClientCardHeader title="Upcoming Deadlines" />
      <ClientCardBody>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {deadlines.map((deadline) => (
            <div
              key={deadline.id}
              className="rounded-xl border border-slate-100 p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-sm"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50">
                <Calendar className="h-4 w-4 text-primary" strokeWidth={1.75} />
              </div>
              <p className="mt-3 truncate text-sm font-semibold text-text">{deadline.jobName}</p>
              <p className="mt-1 text-xs text-text-muted">
                {new Date(deadline.dueDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
              <span
                className={`mt-3 inline-block rounded-full border px-2.5 py-1 text-[10px] font-bold ${getUrgencyClass(deadline.daysRemaining)}`}
              >
                {getDaysLabel(deadline.daysRemaining)}
              </span>
            </div>
          ))}
        </div>
      </ClientCardBody>
    </ClientCard>
  )
}
