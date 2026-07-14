export const INDUSTRIES = [
  'Technology',
  'Finance',
  'Healthcare',
  'Education',
  'E-Commerce',
  'Marketing',
  'Other',
] as const

export const COMPANY_SIZES = [
  'Solo',
  '2-10 Employees',
  '11-50 Employees',
  '51-200 Employees',
  '200+',
] as const

export const HIRING_NEEDS = [
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'AI/ML',
  'DevOps',
  'Content Writing',
  'Marketing',
] as const

export const EXPERIENCE_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const

export const SUGGESTED_SKILLS = [
  'Python',
  'Django',
  'React',
  'TypeScript',
  'AWS',
  'Docker',
  'Redis',
] as const

export type Industry = (typeof INDUSTRIES)[number]
export type CompanySize = (typeof COMPANY_SIZES)[number]
export type HiringNeed = (typeof HIRING_NEEDS)[number]
export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number]
