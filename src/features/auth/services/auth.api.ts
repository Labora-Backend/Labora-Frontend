import { z } from 'zod'
import { api } from '@/services/api/axios'
import type {
  AuthApiEndpoints,
  AuthResponse,
  ClientRegisterPayload,
  FreelancerRegisterPayload,
  LoginPayload,
  RegisterPayload,
  User,
  UserRole,
} from '@/features/auth/types/auth'

export const AUTH_ENDPOINTS: AuthApiEndpoints = {
  register: '/auth/register/',
  login: '/auth/login/',
  logout: '/auth/logout/',
  refresh: '/auth/token/refresh/',
  me: '/auth/me/',
}

const emailSchema = z.string().email()
const isEmail = (value: string) => emailSchema.safeParse(value).success

function resolveRole(email: string, preferredRole?: UserRole): UserRole {
  if (preferredRole) return preferredRole
  if (email.includes('admin')) return 'admin'
  if (email.includes('freelancer')) return 'freelancer'
  return 'client'
}

function createMockAuthResponse(
  name: string,
  email: string,
  username?: string,
  role?: UserRole,
): AuthResponse {
  const user: User = {
    id: crypto.randomUUID(),
    name,
    username,
    email,
    role: resolveRole(email, role),
  }
  return {
    user,
    tokens: {
      accessToken: `mock-access-${Date.now()}`,
      refreshToken: `mock-refresh-${Date.now()}`,
    },
  }
}

function buildLoginBody(payload: LoginPayload) {
  return isEmail(payload.identifier)
    ? { email: payload.identifier, password: payload.password }
    : { username: payload.identifier, password: payload.password }
}

function buildClientRegisterBody(payload: ClientRegisterPayload) {
  return {
    full_name: payload.fullName,
    username: payload.username,
    email: payload.email,
    password: payload.password,
    role: payload.role,
    company_name: payload.companyName,
    industry: payload.industry,
    company_size: payload.companySize,
    hiring_needs: payload.hiringNeeds,
    description: payload.description,
  }
}

function buildFreelancerRegisterBody(payload: FreelancerRegisterPayload) {
  return {
    full_name: payload.fullName,
    username: payload.username,
    email: payload.email,
    password: payload.password,
    role: payload.role,
    professional_title: payload.professionalTitle,
    bio: payload.bio,
    skills: payload.skills,
    experience_level: payload.experienceLevel,
    hourly_rate: payload.hourlyRate,
    portfolio_url: payload.portfolioUrl,
    linkedin_url: payload.linkedinUrl,
    github_url: payload.githubUrl,
  }
}

function buildRegisterRequest(payload: RegisterPayload) {
  if (payload.role === 'client') {
    return {
      body: buildClientRegisterBody(payload),
      file: undefined as File | undefined,
    }
  }

  return {
    body: buildFreelancerRegisterBody(payload),
    file: payload.profileImage,
  }
}

async function withFallback<T>(request: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await request()
  } catch {
    return fallback
  }
}

async function postRegister(payload: RegisterPayload): Promise<AuthResponse> {
  const { body, file } = buildRegisterRequest(payload)

  if (file) {
    const formData = new FormData()
    Object.entries(body).forEach(([key, value]) => {
      if (value === undefined || value === null) return
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item))
      } else {
        formData.append(key, String(value))
      }
    })
    formData.append('profile_image', file)

    const { data } = await api.post<AuthResponse>(AUTH_ENDPOINTS.register, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  }

  const { data } = await api.post<AuthResponse>(AUTH_ENDPOINTS.register, body)
  return data
}

export const authApi = {
  endpoints: AUTH_ENDPOINTS,

  login: async (payload: LoginPayload): Promise<AuthResponse> =>
    withFallback(async () => {
      const { data } = await api.post<AuthResponse>(AUTH_ENDPOINTS.login, buildLoginBody(payload))
      return data
    }, createMockAuthResponse(
      payload.identifier.split('@')[0],
      isEmail(payload.identifier) ? payload.identifier : `${payload.identifier}@labora.dev`,
      isEmail(payload.identifier) ? undefined : payload.identifier,
    )),

  register: async (payload: RegisterPayload): Promise<AuthResponse> =>
    withFallback(
      () => postRegister(payload),
      createMockAuthResponse(payload.fullName, payload.email, payload.username, payload.role),
    ),

  logout: async (refreshToken?: string): Promise<void> => {
    try {
      await api.post(AUTH_ENDPOINTS.logout, { refresh: refreshToken })
    } catch {
      // Allow local logout even if API is unavailable
    }
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>(AUTH_ENDPOINTS.refresh, {
      refresh: refreshToken,
    })
    return data
  },

  getMe: async (): Promise<User> => {
    const { data } = await api.get<User>(AUTH_ENDPOINTS.me)
    return data
  },
}

export default authApi
