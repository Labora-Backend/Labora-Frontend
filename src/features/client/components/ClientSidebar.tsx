import {
  BarChart3,
  Bell,
  Bookmark,
  Briefcase,
  ChevronDown,
  ChevronLeft,
  CreditCard,
  LayoutDashboard,
  MessageSquare,
  PlusCircle,
  Settings,
  Sparkles,
  Star,
  FileText,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { ClientProfileSummary } from '@/features/client/types/dashboard'

interface NavItem {
  label: string
  to: string
  icon: LucideIcon
  badge?: number
}

const navItems: NavItem[] = [
  { label: 'Dashboard', to: '/client/dashboard', icon: LayoutDashboard },
  { label: 'My Jobs', to: '/client/jobs', icon: Briefcase },
  { label: 'Post Job', to: '/client/jobs/post', icon: PlusCircle },
  { label: 'Applications', to: '/client/applications', icon: FileText },
  { label: 'Messages', to: '/client/messages', icon: MessageSquare, badge: 12 },
  { label: 'Notifications', to: '/client/notifications', icon: Bell, badge: 8 },
  { label: 'Payments', to: '/client/payments', icon: CreditCard },
  { label: 'Reviews', to: '/client/reviews', icon: Star },
  { label: 'Saved Freelancers', to: '/client/saved', icon: Bookmark },
  { label: 'Reports', to: '/client/reports', icon: BarChart3 },
  { label: 'Settings', to: '/client/settings', icon: Settings },
]

interface ClientSidebarProps {
  collapsed: boolean
  onToggle: () => void
  mobileOpen: boolean
  onMobileClose: () => void
  profile?: ClientProfileSummary
  unreadMessages?: number
  unreadNotifications?: number
}

export default function ClientSidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
  profile,
  unreadMessages = 0,
  unreadNotifications = 0,
}: ClientSidebarProps) {
  const getBadge = (item: NavItem) => {
    if (item.label === 'Messages') return unreadMessages || item.badge
    if (item.label === 'Notifications') return unreadNotifications || item.badge
    return item.badge
  }

  const sidebarContent = (
    <>
      <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4">
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand">
              <Briefcase className="h-4 w-4 text-white" strokeWidth={2} />
            </div>
            <span className="text-lg font-bold text-text">Labora</span>
          </div>
        )}
        <button
          type="button"
          onClick={onToggle}
          className="hidden rounded-lg p-1.5 text-text-muted transition-colors hover:bg-slate-100 lg:inline-flex"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft
            className={`h-5 w-5 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3" aria-label="Client navigation">
        {navItems.map((item) => {
          const badge = getBadge(item)
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onMobileClose}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-primary'
                    : 'text-text-muted hover:bg-slate-50 hover:text-text'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="client-sidebar-active"
                      className="absolute inset-0 rounded-xl bg-primary-50"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <item.icon
                    className={`relative h-5 w-5 shrink-0 ${isActive ? 'text-primary' : ''}`}
                    strokeWidth={1.75}
                  />
                  {!collapsed && (
                    <>
                      <span className="relative flex-1">{item.label}</span>
                      {badge ? (
                        <span className="relative flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-white">
                          {badge > 9 ? '9+' : badge}
                        </span>
                      ) : null}
                    </>
                  )}
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      {!collapsed && (
        <div className="space-y-3 border-t border-slate-100 p-4">
          <div className="rounded-xl bg-gradient-to-br from-primary to-primary-dark p-4 text-white">
            <Sparkles className="h-5 w-5" strokeWidth={1.75} />
            <p className="mt-2 text-sm font-semibold">Upgrade to Pro</p>
            <p className="mt-1 text-xs text-white/80">
              Unlock premium hiring tools and priority support.
            </p>
            <button
              type="button"
              className="mt-3 w-full rounded-lg bg-white/20 py-2 text-xs font-semibold transition-colors hover:bg-white/30"
            >
              Learn More
            </button>
          </div>

          {profile && (
            <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-9 w-9 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-text">{profile.name}</p>
                <p className="text-xs text-text-muted">{profile.role}</p>
              </div>
              <ChevronDown className="h-4 w-4 shrink-0 text-text-muted" />
            </div>
          )}
        </div>
      )}
    </>
  )

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onMobileClose}
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } ${collapsed ? 'lg:w-[72px]' : 'lg:w-64'}`}
      >
        {sidebarContent}
      </aside>
    </>
  )
}
