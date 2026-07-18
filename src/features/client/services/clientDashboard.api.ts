import { api } from '@/services/api/axios'
import type {
  ClientDashboardData,
  LatestApplication,
  RecentJob,
} from '@/features/client/types/dashboard'

type CountSummary = { count: number }
type PaymentSummary = { totalSpent: number }
type ApiResponse<T> = T | { data: T }

/** Backend service endpoint placeholders */
export const CLIENT_API_ENDPOINTS = {
  dashboard: '/clients/dashboard',
  jobs: '/clients/jobs',
  applications: '/clients/applications',
  messages: '/clients/messages/unread-count',
  notifications: '/clients/notifications/unread-count',
  payments: '/clients/payments/summary',
} as const

const hoursAgo = (hours: number) => new Date(Date.now() - hours * 3_600_000).toISOString()
const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString()
const daysFromNow = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString().slice(0, 10)
}

export const mockClientDashboardData: ClientDashboardData = {
  stats: {
    jobsPosted: 24,
    totalApplications: 156,
    projectsInProgress: 8,
    totalBudgetSpent: 124000,
    trends: {
      jobsPosted: { value: 12, direction: 'up', period: 'from last month' },
      totalApplications: { value: 18, direction: 'up', period: 'from last month' },
      projectsInProgress: { value: 5, direction: 'up', period: 'from last month' },
      totalBudgetSpent: { value: 8, direction: 'down', period: 'from last month' },
    },
  },
  secondaryStats: {
    totalBudgetSpent: 124000,
    activeContracts: 8,
    completedProjects: 16,
    budgetTrend: { value: 8, direction: 'down', period: 'vs last month' },
    contractsTrend: { value: 5, direction: 'up', period: 'vs last month' },
    completedTrend: { value: 12, direction: 'up', period: 'vs last month' },
  },
  jobOverview: [
    { month: 'Jan', open: 3, inProgress: 2, completed: 4 },
    { month: 'Feb', open: 4, inProgress: 3, completed: 5 },
    { month: 'Mar', open: 5, inProgress: 4, completed: 6 },
    { month: 'Apr', open: 4, inProgress: 5, completed: 7 },
    { month: 'May', open: 6, inProgress: 5, completed: 8 },
    { month: 'Jun', open: 8, inProgress: 6, completed: 9 },
  ],
  jobStatus: [
    { status: 'open', label: 'Open', count: 8, color: '#7C3AED', percentage: 33 },
    { status: 'in_progress', label: 'In Progress', count: 8, color: '#06B6D4', percentage: 33 },
    { status: 'completed', label: 'Completed', count: 6, color: '#10B981', percentage: 25 },
    { status: 'cancelled', label: 'Cancelled', count: 2, color: '#F59E0B', percentage: 8 },
  ],
  recentJobs: [
    {
      id: '1',
      title: 'Senior React Developer',
      category: 'Web Development',
      applicationCount: 24,
      status: 'in_progress',
      icon: 'code',
    },
    {
      id: '2',
      title: 'Mobile App UI/UX Design',
      category: 'UI/UX Design',
      applicationCount: 18,
      status: 'open',
      icon: 'design',
    },
    {
      id: '3',
      title: 'AWS Cloud Migration',
      category: 'DevOps & Cloud',
      applicationCount: 12,
      status: 'in_progress',
      icon: 'cloud',
    },
    {
      id: '4',
      title: 'Content Marketing Strategy',
      category: 'Writing & Content',
      applicationCount: 15,
      status: 'open',
      icon: 'content',
    },
    {
      id: '5',
      title: 'Data Pipeline Setup',
      category: 'Data Engineering',
      applicationCount: 9,
      status: 'completed',
      icon: 'data',
    },
  ],
  latestApplications: [
    {
      id: '1',
      freelancerName: 'Sarah Chen',
      freelancerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
      skill: 'Full Stack Developer',
      jobTitle: 'Senior React Developer',
      status: 'new',
      appliedAt: hoursAgo(2),
    },
    {
      id: '2',
      freelancerName: 'Marcus Johnson',
      freelancerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      skill: 'UI/UX Designer',
      jobTitle: 'Mobile App UI/UX Design',
      status: 'viewed',
      appliedAt: hoursAgo(5),
    },
    {
      id: '3',
      freelancerName: 'Elena Rodriguez',
      freelancerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
      skill: 'DevOps Engineer',
      jobTitle: 'AWS Cloud Migration',
      status: 'shortlisted',
      appliedAt: hoursAgo(24),
    },
    {
      id: '4',
      freelancerName: 'James Wilson',
      freelancerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
      skill: 'Content Writer',
      jobTitle: 'Content Marketing Strategy',
      status: 'rejected',
      appliedAt: hoursAgo(48),
    },
  ],
  realTimeActivity: [
    {
      id: '1',
      type: 'application_received',
      title: 'Application Received',
      description: 'Sarah Chen applied for Senior React Developer',
      timestamp: minutesAgo(30),
    },
    {
      id: '2',
      type: 'proposal_accepted',
      title: 'Proposal Accepted',
      description: 'Elena Rodriguez was hired for AWS Cloud Migration',
      timestamp: hoursAgo(2),
    },
    {
      id: '3',
      type: 'new_message',
      title: 'New Message',
      description: 'Marcus Johnson sent a message about UI/UX project',
      timestamp: hoursAgo(4),
    },
    {
      id: '4',
      type: 'payment_completed',
      title: 'Payment Completed',
      description: '$2,500 released for Data Pipeline Setup milestone',
      timestamp: hoursAgo(24),
    },
    {
      id: '5',
      type: 'job_completed',
      title: 'Job Completed',
      description: 'Data Pipeline Setup project marked as complete',
      timestamp: hoursAgo(48),
    },
  ],
  upcomingDeadlines: [
    { id: '1', jobName: 'Senior React Developer', dueDate: daysFromNow(2), daysRemaining: 2 },
    { id: '2', jobName: 'Mobile App UI/UX Design', dueDate: daysFromNow(5), daysRemaining: 5 },
    { id: '3', jobName: 'AWS Cloud Migration', dueDate: daysFromNow(12), daysRemaining: 12 },
    { id: '4', jobName: 'Content Marketing Strategy', dueDate: daysFromNow(19), daysRemaining: 19 },
  ],
  profile: {
    name: 'James Wilson',
    role: 'Client',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face',
    profileCompletion: 85,
  },
  unreadNotifications: 8,
  unreadMessages: 12,
}

function unwrapApiResponse<T>(response: ApiResponse<T>): T {
  if (
    response &&
    typeof response === 'object' &&
    'data' in response
  ) {
    return response.data
  }

  return response
}

async function fetchWithFallback<T>(endpoint: string, fallback: T): Promise<T> {
  try {
    const { data } = await api.get<ApiResponse<T>>(endpoint)
    return unwrapApiResponse(data)
  } catch {
    return fallback
  }
}

export const clientDashboardApi = {
  endpoints: CLIENT_API_ENDPOINTS,

  /** Aggregated dashboard — Job, Application, Message, Notification, Payment services */
  getDashboard: () =>
    fetchWithFallback<ClientDashboardData>(
      CLIENT_API_ENDPOINTS.dashboard,
      mockClientDashboardData,
    ),

  getJobs: (): Promise<RecentJob[]> =>
    fetchWithFallback<RecentJob[]>(
      CLIENT_API_ENDPOINTS.jobs,
      mockClientDashboardData.recentJobs,
    ),

  getApplications: (): Promise<LatestApplication[]> =>
    fetchWithFallback<LatestApplication[]>(
      CLIENT_API_ENDPOINTS.applications,
      mockClientDashboardData.latestApplications,
    ),

  getUnreadMessages: (): Promise<CountSummary> =>
    fetchWithFallback<CountSummary>(CLIENT_API_ENDPOINTS.messages, {
      count: mockClientDashboardData.unreadMessages,
    }),

  getUnreadNotifications: (): Promise<CountSummary> =>
    fetchWithFallback<CountSummary>(CLIENT_API_ENDPOINTS.notifications, {
      count: mockClientDashboardData.unreadNotifications,
    }),

  getPaymentSummary: (): Promise<PaymentSummary> =>
    fetchWithFallback<PaymentSummary>(CLIENT_API_ENDPOINTS.payments, {
      totalSpent: mockClientDashboardData.stats.totalBudgetSpent,
    }),
}
