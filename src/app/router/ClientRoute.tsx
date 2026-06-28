import type { PropsWithChildren } from 'react'
import { ProtectedRoute } from '@/app/router/ProtectedRoute'

export function ClientRoute({ children }: PropsWithChildren) {
  return <ProtectedRoute allowedRoles={['client']}>{children}</ProtectedRoute>
}