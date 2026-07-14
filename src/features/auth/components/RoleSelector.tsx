import { Briefcase, Sparkles } from 'lucide-react'
import type { UserRole } from '@/features/auth/types/auth'

type SelectableRole = Exclude<UserRole, 'admin'>

interface RoleSelectorProps {
  value: SelectableRole
  onChange: (role: SelectableRole) => void
  error?: string
}

const roles: {
  value: SelectableRole
  label: string
  description: string
  icon: typeof Briefcase
}[] = [
  {
    value: 'client',
    label: 'Client',
    description: 'Post jobs and hire talented freelancers.',
    icon: Briefcase,
  },
  {
    value: 'freelancer',
    label: 'Freelancer',
    description: 'Find projects and build your freelancing career.',
    icon: Sparkles,
  },
]

export default function RoleSelector({ value, onChange, error }: RoleSelectorProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-text">Select your role</legend>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {roles.map((role) => {
          const selected = value === role.value
          const Icon = role.icon

          return (
            <button
              key={role.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(role.value)}
              className={
                selected
                  ? 'relative -translate-y-0.5 rounded-2xl bg-gradient-to-br from-primary via-primary-dark to-secondary p-[2px] text-left shadow-glow-primary transition-transform duration-150 hover:-translate-y-1 active:scale-[0.98]'
                  : 'rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-card transition-all duration-150 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card-hover active:scale-[0.98]'
              }
            >
              {selected ? (
                <div className="relative rounded-[14px] bg-white p-4">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-sm">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <p className="text-sm font-semibold text-text">{role.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-text-muted">
                    {role.description}
                  </p>
                  <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                    <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path
                        d="M2.5 6L5 8.5L9.5 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              ) : (
                <>
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-text-muted">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <p className="text-sm font-semibold text-text">{role.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-text-muted">
                    {role.description}
                  </p>
                </>
              )}
            </button>
          )
        })}
      </div>
      {error && (
        <p className="text-xs text-rose-600" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  )
}
