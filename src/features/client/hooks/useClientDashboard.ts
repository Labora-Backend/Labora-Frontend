import { useQuery } from '@tanstack/react-query'
import { clientDashboardApi } from '@/features/client/services/clientDashboard.api'

export const CLIENT_DASHBOARD_QUERY_KEY = ['client-dashboard'] as const

export function useClientDashboard() {
  return useQuery({
    queryKey: CLIENT_DASHBOARD_QUERY_KEY,
    queryFn: clientDashboardApi.getDashboard,
  })
}
