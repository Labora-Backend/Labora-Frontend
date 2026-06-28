import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { AdminRoute } from '@/app/router/AdminRoute'
import { ClientRoute } from '@/app/router/ClientRoute'
import { FreelancerRoute } from '@/app/router/FreelancerRoute'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { AdminDashboard } from '@/features/admin/AdminDashboard'
import { ClientDashboard } from '@/features/client/ClientDashboard'
import { FreelancerDashboard } from '@/features/freelancer/FreelancerDashboard'
import { Landing } from '@/pages/Landing'
import { Login } from '@/pages/Login'
import { NotFound } from '@/pages/NotFound'
import { Register } from '@/pages/Register'
import { Unauthorized } from '@/pages/Unauthorized'

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/unauthorized', element: <Unauthorized /> },
  {
    path: '/client/dashboard',
    element: (
      <ClientRoute>
        <DashboardLayout>
          <ClientDashboard />
        </DashboardLayout>
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