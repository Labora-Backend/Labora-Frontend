import { useContext } from 'react'
import { SocketContext } from '@/app/providers/SocketProvider'

export const useSocket = () => useContext(SocketContext)