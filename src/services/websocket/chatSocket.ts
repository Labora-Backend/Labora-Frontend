import { createAppWebSocket } from '@/services/websocket/socket'

export function createChatSocket(roomId: string) {
  return createAppWebSocket(`/chat/${roomId}/`)
}