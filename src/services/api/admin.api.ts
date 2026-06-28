import { api } from '@/services/api/axios'

export const adminApi = {
  getMetrics: () => api.get('/admin/metrics'),
  listUsers: () => api.get('/admin/users'),
}