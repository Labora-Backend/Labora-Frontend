import { Link } from 'react-router-dom'
import { APP_NAME } from '@/utils/constants'

export function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link to="/" className="text-lg font-bold text-brand-700">
          {APP_NAME}
        </Link>
        <nav className="flex items-center gap-4 text-sm text-slate-600">
          <Link to="/client/dashboard">Client</Link>
          <Link to="/freelancer/dashboard">Freelancer</Link>
          <Link to="/admin/dashboard">Admin</Link>
        </nav>
      </div>
    </header>
  )
}