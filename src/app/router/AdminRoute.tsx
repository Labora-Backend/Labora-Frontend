import type { PropsWithChildren } from 'react'
import { ProtectedRoute } from '@/app/router/ProtectedRoute'

export function AdminRoute({ children }: PropsWithChildren) {
  return <ProtectedRoute allowedRoles={['admin']}>{children}</ProtectedRoute>
}