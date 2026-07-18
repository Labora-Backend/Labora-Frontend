import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthResponse, AuthTokens, User, UserRole } from '@/features/auth/types/auth'

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  role: UserRole | null
  accessToken: string | null
  tokens: AuthTokens | null
  loading: boolean
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  role: null,
  accessToken: null,
  tokens: null,
  loading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      const { user, tokens } = action.payload
      state.user = user
      state.tokens = tokens
      state.role = user.role
      state.accessToken = tokens.accessToken
      state.isAuthenticated = true
      state.loading = false
      console.log('[authSlice.setCredentials] Redux auth user.role', user.role)
      console.log('[authSlice.setCredentials] Redux auth payload', action.payload)
      localStorage.setItem('labora_auth', JSON.stringify(action.payload))
      console.log('[authSlice.setCredentials] stored labora_auth', localStorage.getItem('labora_auth'))
    },
    hydrateSession: (state) => {
      const value = localStorage.getItem('labora_auth')
      if (!value) return
      const parsed = JSON.parse(value) as AuthResponse
      state.user = parsed.user
      state.tokens = parsed.tokens
      state.role = parsed.user.role
      state.accessToken = parsed.tokens.accessToken
      state.isAuthenticated = true
      console.log('[authSlice.hydrateSession] hydrated user.role', parsed.user.role)
      console.log('[authSlice.hydrateSession] stored labora_auth', parsed)
    },
    logout: (state) => {
      state.user = null
      state.tokens = null
      state.role = null
      state.accessToken = null
      state.isAuthenticated = false
      state.loading = false
      localStorage.removeItem('labora_auth')
    },
  },
})

export const { setCredentials, hydrateSession, logout, setLoading } = authSlice.actions
export default authSlice.reducer
