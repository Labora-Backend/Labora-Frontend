export type DashboardTone = 'purple' | 'blue' | 'green' | 'amber' | 'rose'

export interface FreelancerStats {
  totalEarnings?: number
  activeProjects?: number
  pendingApplications?: number
  profileViews?: number
}

export interface EarningsPoint {
  label: string
  earnings: number
}

export interface ApplicationStatusPoint {
  name: 'Pending' | 'Accepted' | 'Rejected' | 'Withdrawn'
  value: number
  color: string
}

export interface ActiveProject {
  id: string
  project: string
  client: string
  budget?: number
  deadline?: string
  status: 'Completed' | 'In Progress' | 'Review Pending'
}

export interface JobRecommendation {
  id: string
  title: string
  company: string
  skills: string[]
  salary?: string
  postedAt?: string
}

export interface ActivityItem {
  id: string
  type: 'message' | 'payment' | 'proposal' | 'project' | 'review'
  title: string
  description?: string
  time?: string
}

export interface ConversationItem {
  id: string
  name: string
  message?: string
  unread?: number
  online?: boolean
}

export interface ReviewItem {
  id: string
  client: string
  rating: number
  comment?: string
}

export interface ProfileStrengthItem {
  label: string
  completed: boolean
}

export interface FreelancerDashboardData {
  stats: FreelancerStats
  earnings: EarningsPoint[]
  applicationStatus: ApplicationStatusPoint[]
  activeProjects: ActiveProject[]
  jobRecommendations: JobRecommendation[]
  activity: ActivityItem[]
  conversations: ConversationItem[]
  reviews: ReviewItem[]
  skills: string[]
  profileStrength: {
    percent?: number
    checklist: ProfileStrengthItem[]
  }
}
