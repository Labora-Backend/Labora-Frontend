import { createContext, useMemo, type PropsWithChildren } from 'react'
import { WS_BASE_URL } from '@/utils/constants'

interface SocketContextValue {
  wsBaseUrl: string
}

export const SocketContext = createContext<SocketContextValue | null>(null)

export function SocketProvider({ children }: PropsWithChildren) {
  const value = useMemo(() => ({ wsBaseUrl: WS_BASE_URL }), [])
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}