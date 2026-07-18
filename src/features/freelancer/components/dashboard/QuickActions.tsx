import { ChevronRight, CreditCard, FileText, Star, UserRound } from 'lucide-react'

const actions = [
  { label: 'Apply for Jobs', href: '/jobs', icon: FileText, color: 'text-[#7C3AED]', bg: 'bg-violet-50' },
  { label: 'Withdraw Earnings', href: '/payments', icon: CreditCard, color: 'text-[#10B981]', bg: 'bg-emerald-50' },
  { label: 'View Reviews', href: '/reviews', icon: Star, color: 'text-[#F59E0B]', bg: 'bg-amber-50' },
  { label: 'Update Portfolio', href: '/freelancer/profile/setup', icon: UserRound, color: 'text-[#2563EB]', bg: 'bg-blue-50' },
]

export function QuickActions() {
  return (
    <section className="rounded-[20px] border border-[#E2E8F0] min-h-[210px] bg-white p-5 shadow-lg shadow-purple-100/20">
      <h2 className="text-[16px] font-bold text-[#0F172A]">Quick Actions</h2>
      <div className="mt-4 space-y-2">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <a key={action.label} href={action.href} className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-[#F8FAFC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]">
              <span className={`grid h-9 w-9 place-items-center rounded-xl ${action.bg} ${action.color}`}><Icon className="h-4 w-4" /></span>
              <span className="flex-1 text-sm font-semibold text-[#0F172A]">{action.label}</span>
              <ChevronRight className="h-4 w-4 text-[#64748B]" />
            </a>
          )
        })}
      </div>
    </section>
  )
}


