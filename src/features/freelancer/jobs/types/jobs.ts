export type JobCategory =
  | 'Web Development'
  | 'Mobile Development'
  | 'UI/UX Design'
  | 'Backend Development'
  | 'DevOps & Cloud'
  | 'Data Science & ML'
  | 'Writing & Translation'
  | 'Marketing & Sales'

export type ExperienceLevel = 'Entry Level' | 'Intermediate' | 'Expert'
export type JobType = 'Fixed Price' | 'Hourly' | 'Full Time' | 'Part Time'
export type WorkMode = 'Remote' | 'Hybrid'

export interface FreelanceJob {
  id: string
  company: string
  logoText: string
  logoKind: 'circle' | 'figma' | 'leaf' | 'letter' | 'grid'
  title: string
  description: string
  skills: string[]
  category: JobCategory
  experience: ExperienceLevel
  type: JobType
  minBudget: number
  maxBudget: number
  postedHoursAgo: number
  location: WorkMode
  relevantScore: number
}
