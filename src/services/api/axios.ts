import axios, { type AxiosRequestHeaders } from 'axios'
import { readStoredAuthSession } from '@/features/auth/utils/authSession'
import { API_BASE_URL } from '@/utils/constants'

const PUBLIC_AUTH_PATHS = [
  '/auth/login/',
  '/auth/register/',
  '/auth/forgot-password/',
  '/auth/password/forgot/',
  '/auth/password/reset/',
  '/auth/reset-password/',
  '/auth/token/refresh/',
]

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

function resolveRequestPath(url?: string) {
  if (!url) return ''

  try {
    return new URL(url, API_BASE_URL).pathname
  } catch {
    return url
  }
}

function isPublicAuthRequest(url?: string) {
  const path = resolveRequestPath(url)
  return PUBLIC_AUTH_PATHS.some((publicPath) => path.endsWith(publicPath))
}

function removeAuthorizationHeader(headers: AxiosRequestHeaders) {
  delete headers.Authorization
  delete headers.authorization
}

api.interceptors.request.use((config) => {
  config.headers = config.headers ?? {}

  if (isPublicAuthRequest(config.url)) {
    removeAuthorizationHeader(config.headers)
    return config
  }

  const session = readStoredAuthSession()
  if (session) {
    config.headers.Authorization = `Bearer ${session.tokens.accessToken}`
  } else {
    removeAuthorizationHeader(config.headers)
  }

  return config
})

