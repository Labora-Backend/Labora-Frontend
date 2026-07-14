import type { PropsWithChildren } from 'react'
import { useState } from 'react'
import ClientSidebar from '@/features/client/components/ClientSidebar'
import ClientTopNavbar from '@/features/client/components/ClientTopNavbar'
import { useClientDashboard } from '@/features/client/hooks/useClientDashboard'

export function ClientDashboardLayout({ children }: PropsWithChildren) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const { data } = useClientDashboard()

  return (
    <div className="flex min-h-screen bg-background">
      <ClientSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((prev) => !prev)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
        profile={data?.profile}
        unreadMessages={data?.unreadMessages}
        unreadNotifications={data?.unreadNotifications}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <ClientTopNavbar
          onMenuClick={() => setMobileSidebarOpen(true)}
          clientName={data?.profile.name}
          clientAvatar={data?.profile.avatar}
          unreadNotifications={data?.unreadNotifications}
          unreadMessages={data?.unreadMessages}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}

export default ClientDashboardLayout
