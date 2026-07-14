import { useAppSelector } from '@/app/store'

export const useAuth = () => useAppSelector((state) => state.auth)
