import { motion } from 'framer-motion'
import {
  Bell,
  Briefcase,
  CreditCard,
  FileText,
  Folder,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Star,
  UserRound,
  X,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'

interface SidebarProps {
  collapsed: boolean
  mobileOpen: boolean
  onToggle: () => void
  onClose: () => void
}

const items = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/freelancer/dashboard' },
  { label: 'Browse Jobs', icon: Briefcase, to: '/jobs' },
  { label: 'My Applications', icon: FileText, to: '/freelancer/applications' },
  { label: 'Active Projects', icon: Folder, to: '/freelancer/projects' },
  { label: 'Messages', icon: MessageSquare, to: '/messages', badge: 5 },
  { label: 'Notifications', icon: Bell, to: '/notifications', badge: 12 },
  { label: 'Earnings', icon: CreditCard, to: '/payments' },
  { label: 'Reviews & Ratings', icon: Star, to: '/reviews' },
  { label: 'Profile', icon: UserRound, to: '/freelancer/profile/setup' },
  { label: 'Settings', icon: Settings, to: '/settings' },
]

export function Sidebar({ collapsed, mobileOpen, onClose }: SidebarProps) {
  const { logout } = useAuth()

  return (
    <>
      {mobileOpen && <button className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden" onClick={onClose} aria-label="Close dashboard navigation" />}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 88 : 260 }}
        className={`fixed inset-y-0 left-0 z-40 flex border-r border-[#E2E8F0] bg-white transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}
      >
        <div className="flex min-w-0 flex-1 flex-col px-5 py-6">
          <div className="mb-8 flex h-10 items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-gradient-to-br from-[#8B5CF6] to-[#2563EB] shadow-lg shadow-purple-100/20">
                <div className="h-4 w-4 rounded-[4px] border-[5px] border-white/95" />
              </div>
              {!collapsed && <span className="text-[28px] font-extrabold leading-none tracking-[-0.02em] text-[#0F172A]">Labora</span>}
            </div>
            <button onClick={onClose} className="rounded-lg p-2 text-[#64748B] hover:bg-[#F3F4F6] lg:hidden" aria-label="Close navigation">
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="space-y-[6px]" aria-label="Freelancer dashboard navigation">
            {items.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex h-[48px] items-center gap-4 rounded-[10px] px-4 text-[14px] font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] ${
                      isActive
                        ? 'bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white shadow-lg shadow-purple-100/20'
                        : 'text-[#0F172A] hover:bg-[#F3F4F6]'
                    }`
                  }
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span className="min-w-0 flex-1 truncate">{item.label}</span>}
                  {!collapsed && item.badge && <span className="grid h-6 min-w-6 place-items-center rounded-full bg-[#7C3AED] px-2 text-[11px] font-black text-white">{item.badge}</span>}
                </NavLink>
              )
            })}
          </nav>

          <div className="mt-auto pt-8">
            <div className="mb-8 h-px bg-[#E2E8F0]" />
            <button onClick={logout} className="mb-10 flex h-[48px] w-full items-center gap-4 rounded-[10px] px-4 text-[14px] font-bold text-[#EF4444] transition hover:bg-rose-50">
              <LogOut className="h-5 w-5" />
              {!collapsed && <span>Logout</span>}
            </button>
            {!collapsed && (
              <div className="rounded-[14px] bg-gradient-to-br from-[#8B5CF6] to-[#60A5FA] p-5 text-center text-white shadow-lg shadow-purple-100/20">
                <div className="mx-auto mb-3 grid h-9 w-9 place-items-center rounded-xl bg-white/15 text-xl">♕</div>
                <p className="text-[16px] font-extrabold">Go Pro 🚀</p>
                <p className="mx-auto mt-2 max-w-[160px] text-[13px] font-medium leading-5 text-white/90">Unlock premium features and boost your career.</p>
                <button className="mt-5 h-[40px] w-full rounded-[8px] bg-white text-[13px] font-extrabold text-[#7C3AED] shadow-lg shadow-purple-100/20 transition hover:bg-[#F8FAFC]">Upgrade Now</button>
              </div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  )
}

