import { useQuery } from '@tanstack/react-query'
import { chatApi } from '@/services/api/chat.api'
import { jobApi } from '@/services/api/job.api'
import { notificationApi } from '@/services/api/notification.api'
import { paymentApi } from '@/services/api/payment.api'
import { reviewApi } from '@/services/api/review.api'
import { useAppSelector } from '@/app/store'
import type { FreelancerDashboardData } from '@/features/freelancer/types/dashboard'
import {
  buildProfileChecklist,
  emptyDashboardData,
  getSkills,
  isRecord,
  normalizeActivity,
  normalizeApplications,
  normalizeConversations,
  normalizeEarnings,
  normalizeJobs,
  normalizeProjects,
  normalizeReviews,
  unwrapList,
  unwrapObject,
} from '@/features/freelancer/utils/dashboardData'
import { freelancerDashboardApi } from '@/features/freelancer/services/dashboard.api'

type SettledValue<T> = PromiseSettledResult<T>

function getResponseData<T>(result: SettledValue<{ data: T }>): T | undefined {
  return result.status === 'fulfilled' ? result.value.data : undefined
}

async function fetchFreelancerDashboard(userId?: string): Promise<FreelancerDashboardData> {
  const [jobs, payments, notifications, conversations, reviews, profileResult] = await Promise.allSettled([
    jobApi.list(),
    paymentApi.list(),
    notificationApi.list(),
    chatApi.getRooms(),
    userId ? reviewApi.listByUser(userId) : Promise.resolve({ data: [] }),
    freelancerDashboardApi.getProfile(),
  ])

  const jobsData = getResponseData(jobs)
  const paymentsData = getResponseData(payments)
  const notificationsData = getResponseData(notifications)
  const conversationsData = getResponseData(conversations)
  const reviewsData = getResponseData(reviews)
  const profileData = getResponseData(profileResult)

  const jobRecommendations = normalizeJobs(jobsData).slice(0, 4)
  const activeProjects = normalizeProjects(paymentsData).slice(0, 5)
  const reviewsList = normalizeReviews(reviewsData).slice(0, 3)
  const activity = normalizeActivity(notificationsData).slice(0, 5)
  const conversationsList = normalizeConversations(conversationsData).slice(0, 4)
  const earnings = normalizeEarnings(paymentsData)
  const applications = normalizeApplications([])

  const profile = unwrapObject(profileData)
  const checklist = buildProfileChecklist(profile)
  const completedChecklist = checklist.filter((item) => item.completed).length
  const profilePercent = checklist.length > 0 ? Math.round((completedChecklist / checklist.length) * 100) : undefined

  const totalEarnings = unwrapList(paymentsData).filter(isRecord).reduce((sum, item) => {
    const rawAmount = item.amount ?? item.total ?? item.price ?? item.budget
    const amount = typeof rawAmount === 'number' ? rawAmount : Number(rawAmount)
    return Number.isFinite(amount) ? sum + amount : sum
  }, 0)

  return {
    ...emptyDashboardData,
    earnings,
    stats: {
      totalEarnings: totalEarnings || undefined,
      activeProjects: activeProjects.length || undefined,
      pendingApplications: applications.find((item) => item.name === 'Pending')?.value || undefined,
    },
    applicationStatus: applications,
    activeProjects,
    jobRecommendations,
    activity,
    conversations: conversationsList,
    reviews: reviewsList,
    skills: getSkills(profile),
    profileStrength: {
      percent: profilePercent,
      checklist,
    },
  }
}

export function useFreelancerDashboard() {
  const userId = useAppSelector((state) => state.auth.user?.id)

  return useQuery({
    queryKey: ['freelancer-dashboard', userId],
    queryFn: () => fetchFreelancerDashboard(userId),
    staleTime: 60_000,
  })
}


