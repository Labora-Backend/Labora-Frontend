import { api } from '@/services/api/axios'

export const chatApi = {
  getRooms: () => api.get('/chat/rooms'),
  getMessages: (roomId: string) => api.get(`/chat/rooms/${roomId}/messages`),
}