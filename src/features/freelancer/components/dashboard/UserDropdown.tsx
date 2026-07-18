import { ChevronDown, LogOut, UserRound } from 'lucide-react'
import { useAuth } from '@/features/auth/hooks/useAuth'

export function UserDropdown() {
  const { user, logout } = useAuth()
  const initials = (user?.name || user?.username || 'F').slice(0, 1).toUpperCase()

  return (
    <div className="group relative">
      <button className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-2 py-1.5 shadow-lg shadow-purple-100/20 transition hover:bg-[#F3F4F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]" aria-label="Open user menu">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#7C3AED] text-sm font-bold text-white">{initials}</span>
        <span className="hidden text-left lg:block">
          <span className="block text-sm font-semibold text-[#0F172A]">{user?.name || user?.username || 'Freelancer'}</span>
          <span className="block text-xs text-[#64748B]">Freelancer</span>
        </span>
        <ChevronDown className="h-4 w-4 text-[#64748B]" />
      </button>
      <div className="invisible absolute right-0 top-12 w-52 translate-y-1 rounded-xl border border-[#E2E8F0] bg-white p-2 opacity-0 shadow-xl transition group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <a href="/freelancer/profile/setup" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#0F172A] hover:bg-[#F3F4F6]">
          <UserRound className="h-4 w-4" /> Profile
        </a>
        <button onClick={logout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[#EF4444] hover:bg-rose-50">
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </div>
  )
}

