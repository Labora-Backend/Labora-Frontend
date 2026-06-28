import { api } from '@/services/api/axios'

export const notificationApi = {
  list: () => api.get('/notifications'),
  markRead: (notificationId: string) => api.patch(`/notifications/${notificationId}/read`),
}