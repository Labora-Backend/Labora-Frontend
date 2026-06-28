import { api } from '@/services/api/axios'

export const reviewApi = {
  listByUser: (userId: string) => api.get(`/users/${userId}/reviews`),
  create: (payload: { targetUserId: string; rating: number; comment: string }) =>
    api.post('/reviews', payload),
}