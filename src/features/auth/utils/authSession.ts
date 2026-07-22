import type { AuthResponse, UserRole } from '@/features/auth/types/auth'

const USER_ROLES = ['client', 'freelancer', 'admin'] as const

export function isUserRole(value: unknown): value is UserRole {
  return typeof value === 'string' && USER_ROLES.includes(value as UserRole)
}

export function isRealJwt(token: unknown): token is string {
  if (typeof token !== 'string') return false
  if (token.startsWith('mock-')) return false
  return /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(token)
}

export function isValidAuthSession(value: unknown): value is AuthResponse {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false

  const session = value as Partial<AuthResponse>
  return Boolean(
    session.user &&
      session.tokens &&
      isUserRole(session.user.role) &&
      isRealJwt(session.tokens.accessToken),
  )
}

export function clearStoredAuthSession() {
  localStorage.removeItem('labora_auth')
  localStorage.removeItem('labora_remember')
}

export function readStoredAuthSession(): AuthResponse | null {
  const value = localStorage.getItem('labora_auth')
  if (!value) return null

  try {
    const parsed = JSON.parse(value) as unknown
    if (isValidAuthSession(parsed)) return parsed
  } catch {
    // Malformed auth storage
  }

  clearStoredAuthSession()
  return null
}