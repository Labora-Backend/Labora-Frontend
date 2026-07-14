import { motion, useReducedMotion } from 'framer-motion'
import { Briefcase, Sparkles } from 'lucide-react'
import type { UserRole } from '@/features/auth/types/auth'

type SetupRole = Exclude<UserRole, 'admin'>

interface ProfileSetupPageProps {
  role: SetupRole
}

const roleConfig: Record<
  SetupRole,
  { title: string; description: string; icon: typeof Briefcase }
> = {
  client: {
    title: 'Client Profile Setup',
    description: 'Complete your company profile to start posting jobs and hiring talent.',
    icon: Briefcase,
  },
  freelancer: {
    title: 'Freelancer Profile Setup',
    description: 'Showcase your skills and portfolio to attract the best projects.',
    icon: Sparkles,
  },
}

export default function ProfileSetupPage({ role }: ProfileSetupPageProps) {
  const prefersReducedMotion = useReducedMotion()
  const config = roleConfig[role]
  const Icon = config.icon

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md rounded-2xl border border-slate-100 bg-surface p-8 text-center shadow-card"
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand">
          <Icon className="h-7 w-7 text-white" strokeWidth={1.75} />
        </div>
        <h1 className="text-2xl font-bold text-text">{config.title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">{config.description}</p>
        <p className="mt-6 rounded-xl bg-primary-50 px-4 py-3 text-sm text-primary-dark">
          Profile setup is coming soon. Your account has been created successfully.
        </p>
      </motion.div>
    </div>
  )
}
