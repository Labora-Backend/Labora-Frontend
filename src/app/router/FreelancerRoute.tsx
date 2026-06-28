import type { PropsWithChildren } from 'react'
import { ProtectedRoute } from '@/app/router/ProtectedRoute'

export function FreelancerRoute({ children }: PropsWithChildren) {
  return <ProtectedRoute allowedRoles={['freelancer']}>{children}</ProtectedRoute>
}