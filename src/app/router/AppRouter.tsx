import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { AdminRoute } from '@/app/router/AdminRoute'
import { ClientRoute } from '@/app/router/ClientRoute'
import { FreelancerRoute } from '@/app/router/FreelancerRoute'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { AdminDashboard } from '@/features/admin/AdminDashboard'
import { ClientDashboardLayout } from '@/features/client/layout/ClientDashboardLayout'
import { ClientDashboard } from '@/features/client/pages/ClientDashboard'
import { FreelancerDashboard } from '@/features/freelancer/FreelancerDashboard'
import ProfileSetupPage from '@/features/auth/pages/ProfileSetupPage'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { RegisterPage } from '@/features/auth/pages/RegisterPage'
import { Landing } from '@/pages/Landing'
import { NotFound } from '@/pages/NotFound'
import { Unauthorized } from '@/pages/Unauthorized'

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/unauthorized', element: <Unauthorized /> },
  {
    path: '/client/profile/setup',
    element: (
      <ClientRoute>
        <ProfileSetupPage role="client" />
      </ClientRoute>
    ),
  },
  {
    path: '/freelancer/profile/setup',
    element: (
      <FreelancerRoute>
        <ProfileSetupPage role="freelancer" />
      </FreelancerRoute>
    ),
  },
  {
    path: '/client/dashboard',
    element: (
      <ClientRoute>
        <ClientDashboardLayout>
          <ClientDashboard />
        </ClientDashboardLayout>
      </ClientRoute>
    ),
  },
  {
    path: '/freelancer/dashboard',
    element: (
      <FreelancerRoute>
        <DashboardLayout>
          <FreelancerDashboard />
        </DashboardLayout>
      </FreelancerRoute>
    ),
  },
  {
    path: '/admin/dashboard',
    element: (
      <AdminRoute>
        <DashboardLayout>
          <AdminDashboard />
        </DashboardLayout>
      </AdminRoute>
    ),
  },
  { path: '/dashboard', element: <Navigate to="/" replace /> },
  { path: '*', element: <NotFound /> },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}