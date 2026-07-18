import { motion } from 'framer-motion'
import { Bell, Briefcase, Menu, MessageSquare, Search, UserRound } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useAppSelector } from '@/app/store'
import { UserDropdown } from '@/features/freelancer/components/dashboard/UserDropdown'

interface DashboardHeaderProps {
  onMenuClick: () => void
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const user = useAppSelector((state) => state.auth.user)
  const displayName = user?.name || user?.username || 'Freelancer'

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-20 border-b border-[#E2E8F0] bg-white/95 backdrop-blur-xl"
    >
      <div className="flex h-[72px] items-center justify-between gap-6 px-6">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-[14px] border border-[#E2E8F0] bg-white p-2 text-[#0F172A] shadow-lg shadow-purple-100/20 transition hover:bg-[#F3F4F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] lg:hidden"
            aria-label="Open dashboard navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
          <label className="relative hidden w-full max-w-[540px] md:block" aria-label="Search dashboard">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#334155]" />
            <input
              type="search"
              placeholder="Search for jobs, clients or projects..."
              className="h-[44px] w-full rounded-[14px] border border-[#E2E8F0] bg-white pl-12 pr-14 text-[13px] font-medium text-[#0F172A] shadow-lg shadow-purple-100/20 outline-none transition placeholder:text-[#94A3B8] focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-[#F8FAFC] px-2 py-1 text-[11px] font-bold text-[#94A3B8]">⌘K</span>
          </label>
        </div>

        <div className="flex items-center gap-5">
          <button className="relative text-[#0F172A] transition hover:text-[#7C3AED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]" aria-label="Messages">
            <MessageSquare className="h-5 w-5" />
            <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-[#7C3AED] px-1 text-[10px] font-bold text-white">5</span>
          </button>
          <button className="relative text-[#0F172A] transition hover:text-[#7C3AED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-[#7C3AED] px-1 text-[10px] font-bold text-white">12</span>
          </button>
          <UserDropdown />
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-[#F8FAFC] px-6 py-6 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-[28px] font-extrabold leading-tight tracking-[-0.01em] text-[#0F172A]">Welcome Back, {displayName} 👋</h1>
          <p className="mt-2 text-[14px] font-medium text-[#64748B]">Track projects, manage applications, and grow your freelance career.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button href="/jobs" size="sm" className="h-[44px] rounded-[10px] bg-[#7C3AED] px-6 text-[14px] font-bold shadow-lg shadow-purple-100/20 hover:bg-[#6D28D9]">
            <Briefcase className="h-4 w-4" />
            Browse Jobs
          </Button>
          <Button href="/freelancer/profile/setup" variant="outline" size="sm" className="h-[44px] rounded-[10px] border-[#E2E8F0] bg-white px-6 text-[14px] font-bold text-[#0F172A] shadow-lg shadow-purple-100/20 hover:bg-[#F3F4F6]">
            <UserRound className="h-4 w-4" />
            Update Profile
          </Button>
        </div>
      </div>
    </motion.header>
  )
}

