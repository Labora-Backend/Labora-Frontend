import { CheckCircle2, CreditCard, FolderCheck, MessageSquare, Star } from 'lucide-react'
import Skeleton from '@/components/ui/Skeleton'
import type { ActivityItem } from '@/features/freelancer/types/dashboard'

interface ActivityPanelProps {
  items: ActivityItem[]
  loading: boolean
}

const iconMap = {
  message: MessageSquare,
  payment: CreditCard,
  proposal: CheckCircle2,
  project: FolderCheck,
  review: Star,
}

export function ActivityPanel({ items, loading }: ActivityPanelProps) {
  if (loading) return <Skeleton className="h-[300px] rounded-[20px]" />

  return (
    <section className="rounded-[20px] border border-[#E2E8F0] min-h-[300px] bg-white p-5 shadow-lg shadow-purple-100/20">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-[#0F172A]">Real-Time Activity</h2>
        <a href="/notifications" className="text-sm font-semibold text-[#7C3AED] hover:underline">View All</a>
      </div>
      {items.length > 0 ? (
        <ol className="space-y-5">
          {items.map((item) => {
            const Icon = iconMap[item.type]
            return (
              <li key={item.id} className="flex gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-50 text-[#7C3AED]"><Icon className="h-5 w-5" /></div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-[#0F172A]">{item.title}</p>
                    <span className="text-xs text-[#64748B]">{item.time}</span>
                  </div>
                  {item.description && <p className="mt-1 text-sm text-[#64748B]">{item.description}</p>}
                </div>
              </li>
            )
          })}
        </ol>
      ) : (
        <div className="grid h-[220px] place-items-center rounded-[20px] border border-dashed border-[#E2E8F0] bg-[#F8FAFC] text-sm font-medium text-[#64748B]">No recent activity.</div>
      )}
    </section>
  )
}


