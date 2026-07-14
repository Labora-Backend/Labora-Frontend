import axios from 'axios'
import { API_BASE_URL } from '@/utils/constants'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem('labora_auth')
  if (stored) {
    try {
      const { tokens } = JSON.parse(stored) as { tokens?: { accessToken?: string } }
      if (tokens?.accessToken) {
        config.headers.Authorization = `Bearer ${tokens.accessToken}`
      }
    } catch {
      // Ignore malformed auth storage
    }
  }
  return config
})
