import type {
  ActiveProject,
  ActivityItem,
  ApplicationStatusPoint,
  ConversationItem,
  FreelancerDashboardData,
  JobRecommendation,
  ProfileStrengthItem,
  ReviewItem,
} from '@/features/freelancer/types/dashboard'

type UnknownRecord = Record<string, unknown>

const STATUS_COLORS = {
  Pending: '#7C3AED',
  Accepted: '#10B981',
  Rejected: '#EF4444',
  Withdrawn: '#F59E0B',
}

export const emptyDashboardData: FreelancerDashboardData = {
  stats: {},
  earnings: [],
  applicationStatus: [
    { name: 'Pending', value: 0, color: STATUS_COLORS.Pending },
    { name: 'Accepted', value: 0, color: STATUS_COLORS.Accepted },
    { name: 'Rejected', value: 0, color: STATUS_COLORS.Rejected },
    { name: 'Withdrawn', value: 0, color: STATUS_COLORS.Withdrawn },
  ],
  activeProjects: [],
  jobRecommendations: [],
  activity: [],
  conversations: [],
  reviews: [],
  skills: [],
  profileStrength: { checklist: [] },
}

export function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value))
}

export function unwrapList(value: unknown): unknown[] {
  if (Array.isArray(value)) return value
  if (!isRecord(value)) return []
  if (Array.isArray(value.results)) return value.results
  if (Array.isArray(value.data)) return value.data
  if (Array.isArray(value.items)) return value.items
  return []
}

export function unwrapObject(value: unknown): UnknownRecord {
  if (!isRecord(value)) return {}
  if (isRecord(value.data)) return value.data
  return value
}

function readString(source: UnknownRecord, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = source[key]
    if (typeof value === 'string' && value.trim()) return value
    if (typeof value === 'number') return String(value)
  }
  return undefined
}

function readNumber(source: UnknownRecord, keys: string[]): number | undefined {
  for (const key of keys) {
    const value = source[key]
    if (typeof value === 'number' && Number.isFinite(value)) return value
    if (typeof value === 'string') {
      const parsed = Number(value.replace(/[^0-9.-]/g, ''))
      if (Number.isFinite(parsed)) return parsed
    }
  }
  return undefined
}

function normalizeProjectStatus(value?: string): ActiveProject['status'] {
  const status = value?.toLowerCase() ?? ''
  if (status.includes('complete')) return 'Completed'
  if (status.includes('review')) return 'Review Pending'
  return 'In Progress'
}

export function formatCurrency(value?: number) {
  if (value === undefined) return 'No data'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatCompact(value?: number) {
  if (value === undefined) return 'No data'
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value)
}

export function normalizeProjects(value: unknown): ActiveProject[] {
  return unwrapList(value).filter(isRecord).map((item, index) => ({
    id: readString(item, ['id', 'project_id', 'uuid']) ?? `project-${index}`,
    project: readString(item, ['project', 'title', 'name', 'job_title']) ?? 'Untitled project',
    client: readString(item, ['client', 'client_name', 'company', 'company_name']) ?? 'Client',
    budget: readNumber(item, ['budget', 'amount', 'price', 'total']),
    deadline: readString(item, ['deadline', 'due_date', 'end_date']),
    status: normalizeProjectStatus(readString(item, ['status', 'state'])),
  }))
}

export function normalizeJobs(value: unknown): JobRecommendation[] {
  return unwrapList(value).filter(isRecord).map((item, index) => {
    const skillsValue = item.skills
    const skills = Array.isArray(skillsValue)
      ? skillsValue.filter((skill): skill is string => typeof skill === 'string')
      : []

    return {
      id: readString(item, ['id', 'job_id', 'uuid']) ?? `job-${index}`,
      title: readString(item, ['title', 'job_title', 'name']) ?? 'Untitled role',
      company: readString(item, ['company', 'company_name', 'client', 'client_name']) ?? 'Company',
      skills,
      salary: readString(item, ['salary', 'budget_range', 'budget']) ?? undefined,
      postedAt: readString(item, ['posted_at', 'created_at', 'time_ago']) ?? undefined,
    }
  })
}

export function normalizeApplications(value: unknown): ApplicationStatusPoint[] {
  const counts = { Pending: 0, Accepted: 0, Rejected: 0, Withdrawn: 0 }

  unwrapList(value).filter(isRecord).forEach((item) => {
    const status = readString(item, ['status', 'state'])?.toLowerCase() ?? 'pending'
    if (status.includes('accept') || status.includes('shortlist')) counts.Accepted += 1
    else if (status.includes('reject')) counts.Rejected += 1
    else if (status.includes('withdraw')) counts.Withdrawn += 1
    else counts.Pending += 1
  })

  return [
    { name: 'Pending', value: counts.Pending, color: STATUS_COLORS.Pending },
    { name: 'Accepted', value: counts.Accepted, color: STATUS_COLORS.Accepted },
    { name: 'Rejected', value: counts.Rejected, color: STATUS_COLORS.Rejected },
    { name: 'Withdrawn', value: counts.Withdrawn, color: STATUS_COLORS.Withdrawn },
  ]
}

export function normalizeEarnings(value: unknown) {
  const now = new Date()
  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1)
    return {
      key: `${date.getFullYear()}-${date.getMonth()}`,
      label: date.toLocaleString('en-US', { month: 'short' }),
      earnings: 0,
    }
  })

  unwrapList(value).filter(isRecord).forEach((item) => {
    const rawDate = readString(item, ['paid_at', 'created_at', 'date', 'updated_at'])
    const date = rawDate ? new Date(rawDate) : undefined
    if (!date || Number.isNaN(date.getTime())) return

    const bucket = months.find((month) => month.key === `${date.getFullYear()}-${date.getMonth()}`)
    if (!bucket) return

    const amount = readNumber(item, ['amount', 'total', 'price', 'budget'])
    if (amount !== undefined) bucket.earnings += amount
  })

  return months.filter((month) => month.earnings > 0).map(({ label, earnings }) => ({ label, earnings }))
}
export function normalizeReviews(value: unknown): ReviewItem[] {
  return unwrapList(value).filter(isRecord).map((item, index) => ({
    id: readString(item, ['id', 'review_id', 'uuid']) ?? `review-${index}`,
    client: readString(item, ['client', 'client_name', 'reviewer', 'reviewer_name']) ?? 'Client',
    rating: readNumber(item, ['rating', 'stars']) ?? 0,
    comment: readString(item, ['comment', 'review', 'feedback']),
  }))
}

export function normalizeActivity(notifications: unknown): ActivityItem[] {
  return unwrapList(notifications).filter(isRecord).map((item, index) => ({
    id: readString(item, ['id', 'notification_id', 'uuid']) ?? `activity-${index}`,
    type: 'message',
    title: readString(item, ['title', 'subject']) ?? 'New update',
    description: readString(item, ['message', 'body', 'description']),
    time: readString(item, ['created_at', 'time', 'time_ago']),
  }))
}

export function normalizeConversations(value: unknown): ConversationItem[] {
  return unwrapList(value).filter(isRecord).map((item, index) => ({
    id: readString(item, ['id', 'room_id', 'uuid']) ?? `conversation-${index}`,
    name: readString(item, ['name', 'client_name', 'participant', 'title']) ?? 'Conversation',
    message: readString(item, ['last_message', 'message', 'preview']),
    unread: readNumber(item, ['unread', 'unread_count']),
    online: Boolean(item.online),
  }))
}

export function buildProfileChecklist(profile: UnknownRecord): ProfileStrengthItem[] {
  return [
    { label: 'Portfolio', completed: Boolean(profile.portfolio_url || profile.portfolio) },
    { label: 'Certifications', completed: Boolean(profile.certifications) },
    { label: 'Skills', completed: Array.isArray(profile.skills) && profile.skills.length > 0 },
    { label: 'Profile Photo', completed: Boolean(profile.profile_image || profile.avatar) },
  ]
}

export function getSkills(profile: UnknownRecord): string[] {
  return Array.isArray(profile.skills)
    ? profile.skills.filter((skill): skill is string => typeof skill === 'string')
    : []
}


