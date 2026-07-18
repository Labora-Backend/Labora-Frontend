import { z } from 'zod'
import { api } from '@/services/api/axios'
import type {
  AuthApiEndpoints,
  AuthResponse,
  AuthTokens,
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
const USER_ROLES = ['client', 'freelancer', 'admin'] as const

type UnknownRecord = Record<string, unknown>

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value))
}

function isUserRole(value: unknown): value is UserRole {
  return typeof value === 'string' && USER_ROLES.includes(value as UserRole)
}

function unwrapDataResponse(response: unknown): unknown {
  if (isRecord(response) && 'data' in response) {
    return unwrapDataResponse(response.data)
  }

  return response
}

function readString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined
}

function normalizeTokens(response: UnknownRecord): AuthTokens {
  const tokenSource = isRecord(response.tokens) ? response.tokens : response
  const accessToken = readString(tokenSource.accessToken)
    ?? readString(tokenSource.access)
    ?? readString(tokenSource.access_token)
  const refreshToken = readString(tokenSource.refreshToken)
    ?? readString(tokenSource.refresh)
    ?? readString(tokenSource.refresh_token)

  if (!accessToken) {
    throw new Error('Auth response is missing an access token')
  }

  return {
    accessToken,
    refreshToken,
  }
}

function normalizeUser(response: UnknownRecord): User {
  if (!isRecord(response.user)) {
    throw new Error('Auth response is missing user data')
  }

  const role = response.user.role
  if (!isUserRole(role)) {
    throw new Error('Auth response is missing a valid user.role')
  }

  return {
    id: readString(response.user.id) ?? String(response.user.id ?? ''),
    name: readString(response.user.name)
      ?? readString(response.user.fullName)
      ?? readString(response.user.full_name)
      ?? readString(response.user.username)
      ?? '',
    username: readString(response.user.username),
    email: readString(response.user.email) ?? '',
    role,
  }
}

function normalizeAuthResponse(response: unknown): AuthResponse {
  const unwrapped = unwrapDataResponse(response)
  if (!isRecord(unwrapped)) {
    throw new Error('Auth response must be an object')
  }

  return {
    user: normalizeUser(unwrapped),
    tokens: normalizeTokens(unwrapped),
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

    const { data } = await api.post<unknown>(AUTH_ENDPOINTS.register, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    console.log('[authApi.register] backend response', data)
    return normalizeAuthResponse(data)
  }

  const { data } = await api.post<unknown>(AUTH_ENDPOINTS.register, body)
  console.log('[authApi.register] backend response', data)
  return normalizeAuthResponse(data)
}

export const authApi = {
  endpoints: AUTH_ENDPOINTS,

  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await api.post<unknown>(AUTH_ENDPOINTS.login, buildLoginBody(payload))
    console.log('[authApi.login] backend response', data)

    const normalized = normalizeAuthResponse(data)
    console.log('[authApi.login] normalized response', normalized)
    return normalized
  },

  register: (payload: RegisterPayload): Promise<AuthResponse> => postRegister(payload),

  logout: async (refreshToken?: string): Promise<void> => {
    try {
      await api.post(AUTH_ENDPOINTS.logout, { refresh: refreshToken })
    } catch {
      // Allow local logout even if API is unavailable
    }
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const { data } = await api.post<unknown>(AUTH_ENDPOINTS.refresh, {
      refresh: refreshToken,
    })
    return normalizeAuthResponse(data)
  },

  getMe: async (): Promise<User> => {
    const { data } = await api.get<unknown>(AUTH_ENDPOINTS.me)
    const normalized = normalizeAuthResponse({ user: data, tokens: { accessToken: 'unused' } })
    return normalized.user
  },
}

export default authApi