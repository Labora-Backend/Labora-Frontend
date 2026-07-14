import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  Settings,
  User,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '@/app/store/authSlice'
import { useAuth } from '@/hooks/useAuth'

interface ClientTopNavbarProps {
  onMenuClick: () => void
  clientName?: string
  clientAvatar?: string
  unreadNotifications?: number
  unreadMessages?: number
}

export default function ClientTopNavbar({
  onMenuClick,
  clientName = 'Client User',
  clientAvatar,
  unreadNotifications = 0,
  unreadMessages = 0,
}: ClientTopNavbarProps) {
  const { user } = useAuth()
  const dispatch = useDispatch()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const displayName = clientName || user?.name || 'Client User'

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-text-muted transition-colors hover:bg-slate-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden min-w-0 flex-1 lg:block">
          <h1 className="truncate text-lg font-bold text-text">
            Welcome back, {displayName} 👋
          </h1>
        </div>

        <div className="relative mx-auto hidden max-w-sm flex-1 sm:block lg:mx-0 lg:max-w-md">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
            strokeWidth={2}
          />
          <input
            type="search"
            placeholder="Search jobs, freelancers..."
            aria-label="Search dashboard"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-16 text-sm outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-text-muted sm:inline">
            ⌘K
          </kbd>
        </div>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Link
            to="/client/messages"
            className="relative rounded-xl p-2.5 text-text-muted transition-all duration-200 hover:bg-slate-100 hover:text-text"
            aria-label={`Messages${unreadMessages ? `, ${unreadMessages} unread` : ''}`}
          >
            <MessageSquare className="h-5 w-5" strokeWidth={1.75} />
            {unreadMessages > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-bold text-white">
                {unreadMessages > 9 ? '9+' : unreadMessages}
              </span>
            )}
          </Link>

          <Link
            to="/client/notifications"
            className="relative rounded-xl p-2.5 text-text-muted transition-all duration-200 hover:bg-slate-100 hover:text-text"
            aria-label={`Notifications${unreadNotifications ? `, ${unreadNotifications} unread` : ''}`}
          >
            <Bell className="h-5 w-5" strokeWidth={1.75} />
            {unreadNotifications > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                {unreadNotifications > 9 ? '9+' : unreadNotifications}
              </span>
            )}
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 p-1 transition-all duration-200 hover:bg-slate-50 sm:px-2"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              {clientAvatar ? (
                <img
                  src={clientAvatar}
                  alt={displayName}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 text-sm font-semibold text-primary">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="hidden text-sm font-medium text-text md:block">{displayName}</span>
              <ChevronDown
                className={`hidden h-4 w-4 text-text-muted transition-transform duration-200 md:block ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-card-hover">
                <Link
                  to="/client/profile"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-muted transition-colors hover:bg-slate-50 hover:text-text"
                  onClick={() => setDropdownOpen(false)}
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
                <Link
                  to="/client/settings"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-muted transition-colors hover:bg-slate-50 hover:text-text"
                  onClick={() => setDropdownOpen(false)}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
                <hr className="my-1 border-slate-100" />
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-rose-600 transition-colors hover:bg-rose-50"
                  onClick={() => {
                    dispatch(logout())
                    setDropdownOpen(false)
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
