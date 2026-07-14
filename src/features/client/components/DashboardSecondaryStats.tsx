import { TrendingDown, TrendingUp } from 'lucide-react'
import type { SecondaryStats, StatTrend } from '@/features/client/types/dashboard'
import { ClientCard, ClientCardBody, ClientCardHeader } from '@/features/client/components/ClientCard'

function formatBudget(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

function MiniTrend({ trend }: { trend: StatTrend }) {
  const isUp = trend.direction === 'up'
  const Icon = isUp ? TrendingUp : TrendingDown
  const color = isUp ? 'text-success' : 'text-rose-500'

  return (
    <span className={`flex items-center gap-0.5 text-[10px] font-medium ${color}`}>
      <Icon className="h-3 w-3" />
      {trend.value}%
    </span>
  )
}

interface DashboardSecondaryStatsProps {
  stats: SecondaryStats
}

export default function DashboardSecondaryStats({ stats }: DashboardSecondaryStatsProps) {
  const items = [
    {
      label: 'Total Budget Spent',
      value: formatBudget(stats.totalBudgetSpent),
      trend: stats.budgetTrend,
    },
    {
      label: 'Active Contracts',
      value: stats.activeContracts.toString(),
      trend: stats.contractsTrend,
    },
    {
      label: 'Completed Projects',
      value: stats.completedProjects.toString(),
      trend: stats.completedTrend,
    },
  ]

  return (
    <ClientCard hover={false}>
      <ClientCardHeader title="Overview" />
      <ClientCardBody className="space-y-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2.5"
          >
            <div>
              <p className="text-xs text-text-muted">{item.label}</p>
              <p className="text-sm font-bold text-text">{item.value}</p>
            </div>
            <MiniTrend trend={item.trend} />
          </div>
        ))}
      </ClientCardBody>
    </ClientCard>
  )
}
