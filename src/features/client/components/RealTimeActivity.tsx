import {
  Briefcase,
  CheckCircle2,
  CreditCard,
  MessageSquare,
  UserPlus,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ActivityType, RealTimeActivityItem } from '@/features/client/types/dashboard'
import { ClientCard, ClientCardBody, ClientCardHeader } from '@/features/client/components/ClientCard'
import { formatRelativeTime } from '@/features/client/utils/formatRelativeTime'

const activityConfig: Record<
  ActivityType,
  { icon: LucideIcon; color: string; bgColor: string }
> = {
  application_received: { icon: UserPlus, color: 'text-primary', bgColor: 'bg-primary-50' },
  proposal_accepted: { icon: CheckCircle2, color: 'text-success', bgColor: 'bg-success-50' },
  new_message: { icon: MessageSquare, color: 'text-secondary', bgColor: 'bg-secondary-50' },
  payment_completed: { icon: CreditCard, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
  job_completed: { icon: Briefcase, color: 'text-violet-600', bgColor: 'bg-violet-50' },
}

interface RealTimeActivityProps {
  activities: RealTimeActivityItem[]
}

export default function RealTimeActivity({ activities }: RealTimeActivityProps) {
  return (
    <ClientCard hover={false} className="h-full">
      <ClientCardHeader title="Real-Time Activity" />
      <ClientCardBody>
        <div className="relative space-y-0">
          {activities.map((activity, index) => {
            const config = activityConfig[activity.type]
            const isLast = index === activities.length - 1

            return (
              <div key={activity.id} className="relative flex gap-3 pb-4">
                {!isLast && (
                  <span
                    className="absolute left-5 top-10 h-full w-px bg-slate-200"
                    aria-hidden="true"
                  />
                )}
                <div
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.bgColor}`}
                >
                  <config.icon className={`h-4 w-4 ${config.color}`} strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-text">{activity.title}</p>
                    <time className="shrink-0 text-[10px] text-text-muted">
                      {formatRelativeTime(activity.timestamp)}
                    </time>
                  </div>
                  <p className="mt-0.5 text-xs leading-relaxed text-text-muted">
                    {activity.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </ClientCardBody>
    </ClientCard>
  )
}
