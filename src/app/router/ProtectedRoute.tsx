import type { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import type { UserRole } from '@/types/auth'
import { hasRole } from '@/utils/permissions'

interface ProtectedRouteProps extends PropsWithChildren {
  allowedRoles?: UserRole[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const location = useLocation()
  const { isAuthenticated, user } = useAuth()

  console.log('[ProtectedRoute] auth state', {
    path: location.pathname,
    isAuthenticated,
    currentRole: user?.role,
    allowedRoles,
  })

  if (!isAuthenticated) {
    console.log('[ProtectedRoute] unauthenticated redirect', {
      path: location.pathname,
      targetRoute: '/login',
    })
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (allowedRoles && !hasRole(user?.role, allowedRoles)) {
    console.log('[ProtectedRoute] unauthorized role redirect', {
      currentRole: user?.role,
      allowedRoles,
      targetRoute: '/unauthorized',
    })
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}