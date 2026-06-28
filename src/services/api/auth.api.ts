import type { AuthTokens, User, UserRole } from '@/types/auth'

interface LoginPayload {
  email: string
  password: string
}

interface RegisterPayload {
  name: string
  email: string
  password: string
  role: Exclude<UserRole, 'admin'>
}

const resolveRole = (email: string, preferredRole?: UserRole): UserRole => {
  if (preferredRole) return preferredRole
  if (email.includes('admin')) return 'admin'
  if (email.includes('freelancer')) return 'freelancer'
  return 'client'
}

const createAuthResponse = (name: string, email: string, role?: UserRole) => {
  const user: User = {
    id: crypto.randomUUID(),
    name,
    email,
    role: resolveRole(email, role),
  }
  const tokens: AuthTokens = {
    accessToken: `mock-access-${Date.now()}`,
    refreshToken: `mock-refresh-${Date.now()}`,
  }
  return { user, tokens }
}

export async function login(payload: LoginPayload) {
  return Promise.resolve(createAuthResponse(payload.email.split('@')[0], payload.email))
}

export async function register(payload: RegisterPayload) {
  return Promise.resolve(createAuthResponse(payload.name, payload.email, payload.role))
}