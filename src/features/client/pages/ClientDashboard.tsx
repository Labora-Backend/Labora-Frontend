import { motion } from 'framer-motion'
import ClientProfileCard from '@/features/client/components/ClientProfileCard'
import DashboardSecondaryStats from '@/features/client/components/DashboardSecondaryStats'
import DashboardStats from '@/features/client/components/DashboardStats'
import JobOverviewChart from '@/features/client/components/JobOverviewChart'
import JobStatusChart from '@/features/client/components/JobStatusChart'
import LatestApplications from '@/features/client/components/LatestApplications'
import QuickActions from '@/features/client/components/QuickActions'
import RealTimeActivity from '@/features/client/components/RealTimeActivity'
import RecentJobs from '@/features/client/components/RecentJobs'
import UpcomingDeadlines from '@/features/client/components/UpcomingDeadlines'
import { ClientSectionSkeleton } from '@/features/client/components/ClientCard'
import { useClientDashboard } from '@/features/client/hooks/useClientDashboard'

function DashboardLoading() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading dashboard">
      <ClientSectionSkeleton className="h-10 w-64" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <ClientSectionSkeleton key={i} className="h-28" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <ClientSectionSkeleton className="h-96 lg:col-span-2" />
        <div className="space-y-6">
          <ClientSectionSkeleton className="h-72" />
          <ClientSectionSkeleton className="h-48" />
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <ClientSectionSkeleton className="h-80 xl:col-span-2" />
        <div className="space-y-6">
          <ClientSectionSkeleton className="h-56" />
          <ClientSectionSkeleton className="h-48" />
          <ClientSectionSkeleton className="h-72" />
        </div>
      </div>
    </div>
  )
}

function DashboardError() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center">
      <p className="text-lg font-semibold text-text">Unable to load dashboard</p>
      <p className="mt-2 text-sm text-text-muted">
        Please refresh the page or try again later.
      </p>
    </div>
  )
}

export default function ClientDashboard() {
  const { data, isLoading, isError } = useClientDashboard()

  if (isLoading) return <DashboardLoading />
  if (isError || !data) return <DashboardError />

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="mx-auto max-w-7xl space-y-6"
    >
      {/* Mobile welcome — desktop shows in navbar */}
      <p className="text-base font-bold text-text lg:hidden">
        Welcome back, {data.profile.name} 👋
      </p>

      <DashboardStats stats={data.stats} />

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <JobOverviewChart data={data.jobOverview} />
        </div>
        <div className="space-y-6">
          <JobStatusChart data={data.jobStatus} />
          <ClientProfileCard profile={data.profile} />
        </div>
      </div>

      {/* Main content: lists left, actions right */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <RecentJobs jobs={data.recentJobs} />
          <LatestApplications applications={data.latestApplications} />
        </div>

        <div className="space-y-6">
          <QuickActions />
          <DashboardSecondaryStats stats={data.secondaryStats} />
          <RealTimeActivity activities={data.realTimeActivity} />
        </div>
      </div>

      <UpcomingDeadlines deadlines={data.upcomingDeadlines} />
    </motion.div>
  )
}

export { ClientDashboard }
