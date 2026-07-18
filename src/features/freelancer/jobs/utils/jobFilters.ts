import type { ExperienceLevel, FreelanceJob, JobCategory, JobType } from '@/features/freelancer/jobs/types/jobs'

export type SortOption = 'Newest' | 'Oldest' | 'Highest Budget' | 'Lowest Budget' | 'Most Relevant'
export type ViewMode = 'list' | 'grid'

export interface JobFiltersState {
  search: string
  category: 'All Categories' | JobCategory
  sort: SortOption
  categories: JobCategory[]
  experience: ExperienceLevel[]
  jobTypes: JobType[]
  maxBudget: number
}

export const categories: JobCategory[] = [
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'Backend Development',
  'DevOps & Cloud',
  'Data Science & ML',
  'Writing & Translation',
  'Marketing & Sales',
]

export const experiences: ExperienceLevel[] = ['Entry Level', 'Intermediate', 'Expert']
export const jobTypes: JobType[] = ['Fixed Price', 'Hourly', 'Full Time', 'Part Time']
export const sortOptions: SortOption[] = ['Newest', 'Oldest', 'Highest Budget', 'Lowest Budget', 'Most Relevant']

export const defaultFilters: JobFiltersState = {
  search: '',
  category: 'All Categories',
  sort: 'Newest',
  categories: [],
  experience: [],
  jobTypes: [],
  maxBudget: 100000,
}

export function formatBudget(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatBudgetRange(job: FreelanceJob) {
  return `${formatBudget(job.minBudget)} - ${formatBudget(job.maxBudget)}`
}

export function formatPostedTime(hours: number) {
  if (hours < 24) return `${hours}h ago`
  return `${Math.round(hours / 24)}d ago`
}

export function filterJobs(jobs: FreelanceJob[], filters: JobFiltersState) {
  const search = filters.search.trim().toLowerCase()

  return jobs.filter((job) => {
    const matchesSearch = !search || [job.title, job.description, job.company, ...job.skills].some((value) => value.toLowerCase().includes(search))
    const matchesCategoryDropdown = filters.category === 'All Categories' || job.category === filters.category
    const matchesCategories = filters.categories.length === 0 || filters.categories.includes(job.category)
    const matchesExperience = filters.experience.length === 0 || filters.experience.includes(job.experience)
    const matchesType = filters.jobTypes.length === 0 || filters.jobTypes.includes(job.type)
    const matchesBudget = job.minBudget <= filters.maxBudget

    return matchesSearch && matchesCategoryDropdown && matchesCategories && matchesExperience && matchesType && matchesBudget
  })
}

export function sortJobs(jobs: FreelanceJob[], sort: SortOption) {
  return [...jobs].sort((a, b) => {
    if (sort === 'Oldest') return b.postedHoursAgo - a.postedHoursAgo
    if (sort === 'Highest Budget') return b.maxBudget - a.maxBudget
    if (sort === 'Lowest Budget') return a.minBudget - b.minBudget
    if (sort === 'Most Relevant') return b.relevantScore - a.relevantScore
    return a.postedHoursAgo - b.postedHoursAgo
  })
}

export function readJsonStorage<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : fallback
  } catch {
    return fallback
  }
}
