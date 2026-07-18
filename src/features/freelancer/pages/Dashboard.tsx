import { lazy, Suspense, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ActivityPanel } from '@/features/freelancer/components/dashboard/ActivityPanel'
import { ActiveProjectsTable } from '@/features/freelancer/components/dashboard/ActiveProjectsTable'
import { DashboardHeader } from '@/features/freelancer/components/dashboard/DashboardHeader'
import { JobRecommendations } from '@/features/freelancer/components/dashboard/JobRecommendations'
import { MessagesPanel } from '@/features/freelancer/components/dashboard/MessagesPanel'
import { ProfileStrength } from '@/features/freelancer/components/dashboard/ProfileStrength'
import { QuickActions } from '@/features/freelancer/components/dashboard/QuickActions'
import { ReviewsSection } from '@/features/freelancer/components/dashboard/ReviewsSection'
import { Sidebar } from '@/features/freelancer/components/dashboard/Sidebar'
import { SkillsCard } from '@/features/freelancer/components/dashboard/SkillsCard'
import { StatsCards } from '@/features/freelancer/components/dashboard/StatsCards'
import { useFreelancerDashboard } from '@/features/freelancer/hooks/useFreelancerDashboard'
import { emptyDashboardData } from '@/features/freelancer/utils/dashboardData'

const EarningsChart = lazy(() =>
  import('@/features/freelancer/components/dashboard/EarningsChart').then((module) => ({ default: module.EarningsChart })),
)
const ApplicationChart = lazy(() =>
  import('@/features/freelancer/components/dashboard/ApplicationChart').then((module) => ({ default: module.ApplicationChart })),
)
const fadeUp = {
  hidden: { y: 18, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

export function Dashboard() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dashboardQuery = useFreelancerDashboard()
  const data = dashboardQuery.data ?? emptyDashboardData
  const loading = dashboardQuery.isLoading

  const content = useMemo(() => data, [data])

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#F8FAFC] text-[#0F172A]">
      <div className="flex min-h-screen">
        <Sidebar
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          onToggle={() => setCollapsed((value) => !value)}
          onClose={() => setMobileOpen(false)}
        />
        <div className="min-w-0 flex-1">
          <DashboardHeader onMenuClick={() => setMobileOpen(true)} />
          <main className="space-y-6 p-6" aria-busy={loading}>
            {dashboardQuery.isError && (
              <div className="rounded-[20px] border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
                Some dashboard data could not be loaded. Available sections are still shown below.
              </div>
            )}

            <StatsCards stats={content.stats} loading={loading} />

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-6">
                <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.05 }} className="grid gap-6 2xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]">
                  <Suspense fallback={<div className="h-[290px] rounded-[20px] bg-white shadow-lg shadow-purple-100/20" />}>
                    <EarningsChart data={content.earnings} loading={loading} />
                  </Suspense>
                  <Suspense fallback={<div className="h-[290px] rounded-[20px] bg-white shadow-lg shadow-purple-100/20" />}>
                    <ApplicationChart data={content.applicationStatus} loading={loading} />
                  </Suspense>
                </motion.div>

                <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="grid gap-6 2xl:grid-cols-2">
                  <ActiveProjectsTable projects={content.activeProjects} loading={loading} />
                  <JobRecommendations jobs={content.jobRecommendations} loading={loading} />
                </motion.div>
              </div>

              <aside className="space-y-6">
                <ActivityPanel items={content.activity} loading={loading} />
                <MessagesPanel conversations={content.conversations} loading={loading} />
              </aside>
            </div>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.15 }} className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr_0.9fr_0.7fr]">
              <ReviewsSection reviews={content.reviews} loading={loading} />
              <ProfileStrength percent={content.profileStrength.percent} checklist={content.profileStrength.checklist} loading={loading} />
              <SkillsCard skills={content.skills} loading={loading} />
              <QuickActions />
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Dashboard








