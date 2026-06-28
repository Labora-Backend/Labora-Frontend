import { WS_BASE_URL } from '@/utils/constants'

interface WebSocketHandlers {
  onOpen?: () => void
  onMessage?: (event: MessageEvent<string>) => void
  onClose?: () => void
  onError?: (event: Event) => void
}

export function createAppWebSocket(path: string, handlers: WebSocketHandlers = {}) {
  const socket = new WebSocket(`${WS_BASE_URL}${path}`)
  if (handlers.onOpen) socket.addEventListener('open', handlers.onOpen)
  if (handlers.onMessage) socket.addEventListener('message', handlers.onMessage)
  if (handlers.onClose) socket.addEventListener('close', handlers.onClose)
  if (handlers.onError) socket.addEventListener('error', handlers.onError)
  return socket
}