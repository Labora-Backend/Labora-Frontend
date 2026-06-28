import { NavLink } from 'react-router-dom'

const links = [
  { label: 'Client Dashboard', to: '/client/dashboard' },
  { label: 'Freelancer Dashboard', to: '/freelancer/dashboard' },
  { label: 'Admin Dashboard', to: '/admin/dashboard' },
]

export function Sidebar() {
  return (
    <aside className="w-full border-r border-slate-200 bg-white p-4 md:w-64">
      <nav className="space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block rounded-md px-3 py-2 text-sm ${isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100'}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}