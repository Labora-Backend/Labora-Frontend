import type { UserRole } from '@/types/auth'

export const hasRole = (currentRole: UserRole | null | undefined, allowedRoles: UserRole[]) =>
  Boolean(currentRole && allowedRoles.includes(currentRole))