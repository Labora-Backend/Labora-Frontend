export type UserRole = 'client' | 'freelancer' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface AuthTokens {
  accessToken: string
  refreshToken?: string
}