import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { logout as logoutAction, setCredentials, setLoading } from '@/app/store/authSlice'
import { authApi } from '@/features/auth/services/auth.api'
import type { LoginPayload, RegisterPayload, UserRole } from '@/features/auth/types/auth'

const ROLE_PATHS: Record<UserRole, string> = {
  client: '/client/dashboard',
  freelancer: '/freelancer/dashboard',
  admin: '/admin/dashboard',
}

const REGISTER_ROLE_PATHS: Record<Exclude<UserRole, 'admin'>, string> = {
  client: '/client/profile/setup',
  freelancer: '/freelancer/profile/setup',
}

export function useAuth() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const auth = useAppSelector((state) => state.auth)

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onMutate: () => dispatch(setLoading(true)),
    onSuccess: (data, variables) => {
      dispatch(setCredentials(data))
      if (variables.rememberMe) {
        localStorage.setItem('labora_remember', 'true')
      } else {
        localStorage.removeItem('labora_remember')
      }
      navigate(ROLE_PATHS[data.user.role])
    },
    onError: () => dispatch(setLoading(false)),
    onSettled: () => dispatch(setLoading(false)),
  })

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onMutate: () => dispatch(setLoading(true)),
    onSuccess: (data) => {
      dispatch(setCredentials(data))
      const role = data.user.role
      if (role === 'client' || role === 'freelancer') {
        navigate(REGISTER_ROLE_PATHS[role])
      } else {
        navigate(ROLE_PATHS[role])
      }
    },
    onError: () => dispatch(setLoading(false)),
    onSettled: () => dispatch(setLoading(false)),
  })

  const logout = async () => {
    await authApi.logout(auth.tokens?.refreshToken)
    dispatch(logoutAction())
    navigate('/login')
  }

  return {
    ...auth,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  }
}

export default useAuth
