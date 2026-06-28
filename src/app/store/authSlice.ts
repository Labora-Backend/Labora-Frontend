import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthTokens, User } from '@/types/auth'

interface AuthState {
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; tokens: AuthTokens }>) => {
      state.user = action.payload.user
      state.tokens = action.payload.tokens
      state.isAuthenticated = true
      localStorage.setItem('labora_auth', JSON.stringify(action.payload))
    },
    hydrateSession: (state) => {
      const value = localStorage.getItem('labora_auth')
      if (!value) return
      const parsed = JSON.parse(value) as { user: User; tokens: AuthTokens }
      state.user = parsed.user
      state.tokens = parsed.tokens
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.user = null
      state.tokens = null
      state.isAuthenticated = false
      localStorage.removeItem('labora_auth')
    },
  },
})

export const { setCredentials, hydrateSession, logout } = authSlice.actions
export default authSlice.reducer