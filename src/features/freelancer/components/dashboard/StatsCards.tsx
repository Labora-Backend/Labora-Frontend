import { motion } from 'framer-motion'
import { BriefcaseBusiness, Eye, FileClock, WalletCards, type LucideIcon } from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import Skeleton from '@/components/ui/Skeleton'
import type { FreelancerStats } from '@/features/freelancer/types/dashboard'
import { formatCompact, formatCurrency } from '@/features/freelancer/utils/dashboardData'

interface StatsCardsProps {
  stats: FreelancerStats
  loading: boolean
}

const cards: Array<{
  key: keyof FreelancerStats
  title: string
  icon: LucideIcon
  accent: string
  bg: string
  formatter: (value?: number) => string
}> = [
  { key: 'totalEarnings', title: 'Total Earnings', icon: WalletCards, accent: '#7C3AED', bg: 'bg-violet-50', formatter: formatCurrency },
  { key: 'activeProjects', title: 'Active Projects', icon: BriefcaseBusiness, accent: '#2563EB', bg: 'bg-blue-50', formatter: formatCompact },
  { key: 'pendingApplications', title: 'Pending Applications', icon: FileClock, accent: '#10B981', bg: 'bg-emerald-50', formatter: formatCompact },
  { key: 'profileViews', title: 'Profile Views', icon: Eye, accent: '#F59E0B', bg: 'bg-amber-50', formatter: formatCompact },
]

const sparkline = [{ v: 10 }, { v: 14 }, { v: 12 }, { v: 20 }, { v: 18 }, { v: 26 }, { v: 24 }, { v: 32 }]

export function StatsCards({ stats, loading }: StatsCardsProps) {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => <Skeleton key={card.key} className="h-[170px] rounded-[20px]" />)}
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon
        const value = stats[card.key]
        return (
          <motion.article
            key={card.key}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="rounded-[20px] border border-[#E2E8F0] min-h-[170px] bg-white p-5 shadow-lg shadow-purple-100/20 transition hover:shadow-lg hover:shadow-purple-100/30"
          >
            <div className="flex items-start justify-between gap-3">
              <div className={`grid h-[52px] w-[52px] place-items-center rounded-[20px] ${card.bg}`} style={{ color: card.accent }}>
                <Icon className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-[#F8FAFC] px-2.5 py-1 text-xs font-semibold text-[#64748B]">Live</span>
            </div>
            <p className="mt-3 text-[13px] font-medium text-[#64748B]">{card.title}</p>
            <p className="mt-1 text-[26px] font-bold text-[#0F172A]">{card.formatter(value)}</p>
            <div className="mt-2 flex items-end justify-between gap-3">
              <p className="text-xs font-medium text-[#10B981]">Synced from API</p>
              <div className="h-[48px] w-[112px]" aria-hidden="true">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={value === undefined ? [] : sparkline}>
                    <Area type="monotone" dataKey="v" stroke={card.accent} fill={card.accent} fillOpacity={0.12} strokeWidth={2} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.article>
        )
      })}
    </div>
  )
}


