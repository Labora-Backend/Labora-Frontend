import { api } from '@/services/api/axios'

export const freelancerDashboardApi = {
  getProfile: () => api.get('/freelancer/profile'),
}
