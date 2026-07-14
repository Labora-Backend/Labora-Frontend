import { Briefcase, DollarSign, FileText, TrendingDown, TrendingUp, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import type { DashboardStats, StatTrend } from '@/features/client/types/dashboard'
import { ClientCard } from '@/features/client/components/ClientCard'

interface StatConfig {
  label: string
  key: keyof Omit<DashboardStats, 'trends'>
  trendKey: keyof DashboardStats['trends']
  icon: LucideIcon
  iconBg: string
  iconColor: string
  format?: (value: number) => string
}

function formatBudget(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

function TrendBadge({ trend }: { trend: StatTrend }) {
  const isUp = trend.direction === 'up'
  const Icon = isUp ? TrendingUp : TrendingDown
  const colorClass = isUp ? 'text-success' : 'text-rose-500'

  return (
    <p className={`mt-2 flex items-center gap-1 text-xs font-medium ${colorClass}`}>
      <Icon className="h-3.5 w-3.5" />
      <span>
        {isUp ? '↑' : '↓'} {trend.value}% {trend.period}
      </span>
    </p>
  )
}

const statConfigs: StatConfig[] = [
  {
    label: 'Jobs Posted',
    key: 'jobsPosted',
    trendKey: 'jobsPosted',
    icon: Briefcase,
    iconBg: 'bg-primary-50',
    iconColor: 'text-primary',
  },
  {
    label: 'Total Applications',
    key: 'totalApplications',
    trendKey: 'totalApplications',
    icon: FileText,
    iconBg: 'bg-secondary-50',
    iconColor: 'text-secondary',
  },
  {
    label: 'Projects In Progress',
    key: 'projectsInProgress',
    trendKey: 'projectsInProgress',
    icon: Users,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    label: 'Total Budget Spent',
    key: 'totalBudgetSpent',
    trendKey: 'totalBudgetSpent',
    icon: DollarSign,
    iconBg: 'bg-success-50',
    iconColor: 'text-success',
    format: formatBudget,
  },
]

interface DashboardStatsProps {
  stats: DashboardStats
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statConfigs.map((config, index) => {
        const value = stats[config.key]
        const display = config.format ? config.format(value) : value.toLocaleString()

        return (
          <motion.div
            key={config.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
          >
            <ClientCard className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-text-muted">{config.label}</p>
                  <p className="mt-1 text-2xl font-bold text-text">{display}</p>
                  <TrendBadge trend={stats.trends[config.trendKey]} />
                </div>
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${config.iconBg}`}
                >
                  <config.icon className={`h-5 w-5 ${config.iconColor}`} strokeWidth={1.75} />
                </div>
              </div>
            </ClientCard>
          </motion.div>
        )
      })}
    </div>
  )
}
