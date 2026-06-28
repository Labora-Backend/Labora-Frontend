import { useEffect, type PropsWithChildren } from 'react'
import { useAppDispatch } from '@/app/store'
import { hydrateSession } from '@/app/store/authSlice'

export function AuthProvider({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(hydrateSession())
  }, [dispatch])

  return <>{children}</>
}