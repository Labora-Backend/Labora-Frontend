import { AuthProvider } from '@/app/providers/AuthProvider'
import { SocketProvider } from '@/app/providers/SocketProvider'
import { AppRouter } from '@/app/router/AppRouter'

export default function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <AppRouter />
      </SocketProvider>
    </AuthProvider>
  )
}
