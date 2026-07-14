export type UserRole = 'client' | 'freelancer' | 'admin'

export interface User {
  id: string
  name: string
  username?: string
  email: string
  role: UserRole
}

export interface AuthTokens {
  accessToken: string
  refreshToken?: string
}

export interface AuthResponse {
  user: User
  tokens: AuthTokens
}

export interface LoginPayload {
  identifier: string
  password: string
  rememberMe?: boolean
}

interface RegisterBasePayload {
  fullName: string
  username: string
  email: string
  password: string
}

export interface ClientRegisterPayload extends RegisterBasePayload {
  role: 'client'
  companyName?: string
  industry: string
  companySize?: string
  hiringNeeds: string[]
  description?: string
}

export interface FreelancerRegisterPayload extends RegisterBasePayload {
  role: 'freelancer'
  professionalTitle: string
  bio?: string
  skills: string[]
  experienceLevel: string
  hourlyRate?: string
  portfolioUrl?: string
  linkedinUrl?: string
  githubUrl?: string
  profileImage?: File
}

export type RegisterPayload = ClientRegisterPayload | FreelancerRegisterPayload

export interface AuthApiEndpoints {
  register: string
  login: string
  logout: string
  refresh: string
  me: string
}
