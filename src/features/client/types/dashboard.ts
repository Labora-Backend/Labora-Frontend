export type JobStatus = 'open' | 'in_progress' | 'completed' | 'cancelled'
export type ApplicationStatus = 'new' | 'viewed' | 'shortlisted' | 'rejected' | 'accepted' | 'pending'
export type ActivityType =
  | 'application_received'
  | 'proposal_accepted'
  | 'new_message'
  | 'payment_completed'
  | 'job_completed'

export interface StatTrend {
  value: number
  direction: 'up' | 'down'
  period: string
}

export interface DashboardStats {
  jobsPosted: number
  totalApplications: number
  projectsInProgress: number
  totalBudgetSpent: number
  trends: {
    jobsPosted: StatTrend
    totalApplications: StatTrend
    projectsInProgress: StatTrend
    totalBudgetSpent: StatTrend
  }
}

export interface SecondaryStats {
  totalBudgetSpent: number
  activeContracts: number
  completedProjects: number
  budgetTrend: StatTrend
  contractsTrend: StatTrend
  completedTrend: StatTrend
}

export interface JobOverviewPoint {
  month: string
  open: number
  inProgress: number
  completed: number
}

export interface JobStatusSlice {
  status: JobStatus
  label: string
  count: number
  color: string
  percentage: number
}

export interface RecentJob {
  id: string
  title: string
  category: string
  applicationCount: number
  status: JobStatus
  icon: 'code' | 'design' | 'cloud' | 'content' | 'data'
}

export interface LatestApplication {
  id: string
  freelancerName: string
  freelancerAvatar: string
  skill: string
  jobTitle: string
  status: ApplicationStatus
  appliedAt: string
}

export interface RealTimeActivityItem {
  id: string
  type: ActivityType
  title: string
  description: string
  timestamp: string
}

export interface UpcomingDeadline {
  id: string
  jobName: string
  dueDate: string
  daysRemaining: number
}

export interface ClientProfileSummary {
  name: string
  role: string
  avatar: string
  profileCompletion: number
}

export interface ClientDashboardData {
  stats: DashboardStats
  secondaryStats: SecondaryStats
  jobOverview: JobOverviewPoint[]
  jobStatus: JobStatusSlice[]
  recentJobs: RecentJob[]
  latestApplications: LatestApplication[]
  realTimeActivity: RealTimeActivityItem[]
  upcomingDeadlines: UpcomingDeadline[]
  profile: ClientProfileSummary
  unreadNotifications: number
  unreadMessages: number
}
