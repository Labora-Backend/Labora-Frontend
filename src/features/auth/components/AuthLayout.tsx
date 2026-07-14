import { motion, useReducedMotion } from 'framer-motion'
import { lazy, Suspense, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, Star, TrendingUp } from 'lucide-react'

const AuthBenefits = lazy(() => import('@/features/auth/components/AuthBenefits'))
const AuthStats = lazy(() => import('@/features/auth/components/AuthStats'))
const RegisterMarketingPanel = lazy(() => import('@/features/auth/components/RegisterMarketingPanel'))

interface AuthLayoutProps {
  children: ReactNode
  mode: 'login' | 'register'
}

function FloatingDashboardPreviews() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="relative mx-auto mt-8 h-44 w-full max-w-lg" aria-hidden="true">
      <motion.div
        animate={prefersReducedMotion ? {} : { y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-0 top-2 w-44 rounded-2xl border border-white/25 bg-white/15 p-4 shadow-lg backdrop-blur-sm"
      >
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-full bg-gradient-brand" />
          <div className="space-y-1.5">
            <div className="h-2 w-16 rounded bg-white/50" />
            <div className="h-2 w-10 rounded bg-white/30" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
          <span className="text-xs font-medium text-white/90">4.9 Rating</span>
        </div>
      </motion.div>

      <motion.div
        animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        className="absolute bottom-0 right-0 w-48 rounded-2xl border border-white/25 bg-white/15 p-4 shadow-lg backdrop-blur-sm"
      >
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-secondary" />
          <p className="text-xs text-white/75">Projects Completed</p>
        </div>
        <p className="mt-1 text-xl font-bold text-white">850+</p>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/20">
          <div className="h-full w-[78%] rounded-full bg-secondary" />
        </div>
      </motion.div>

      <motion.div
        animate={prefersReducedMotion ? {} : { y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        className="absolute left-1/2 top-1/2 w-36 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/25 bg-white/10 p-3.5 shadow-lg backdrop-blur-sm"
      >
        <p className="text-[11px] font-medium text-white/80">Total Earnings</p>
        <p className="text-lg font-bold text-white">$128K+</p>
      </motion.div>
    </div>
  )
}

function ShowcaseFallback() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-2xl bg-white/10" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 rounded-2xl bg-white/10" />
        ))}
      </div>
    </div>
  )
}

function BackgroundShapes() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      <motion.div
        animate={prefersReducedMotion ? {} : { y: [0, -16, 0], x: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10"
        aria-hidden="true"
      />
      <motion.div
        animate={prefersReducedMotion ? {} : { y: [0, 12, 0], x: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-cyan-400/10"
        aria-hidden="true"
      />
      <motion.div
        animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute right-1/4 top-1/3 h-40 w-40 rounded-full bg-violet-300/10"
        aria-hidden="true"
      />
    </>
  )
}

export default function AuthLayout({ children, mode }: AuthLayoutProps) {
  const prefersReducedMotion = useReducedMotion()
  const isRegister = mode === 'register'

  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left — Auth Form */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center px-4 py-10 sm:px-8 lg:order-1 lg:px-12 xl:px-16"
        >
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <LaboraLogo />
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="w-full max-w-md rounded-2xl border border-slate-100/80 bg-surface p-6 shadow-card sm:p-8"
          >
            <div className="mb-6 hidden md:flex">
              <LaboraLogo />
            </div>

            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight text-text sm:text-[1.625rem]">
                {isRegister ? 'Create Your Account' : 'Welcome back'}
              </h1>
              <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                {isRegister
                  ? 'Start your journey on Labora — connect with top talent or find your next project.'
                  : 'Sign in to continue to your dashboard'}
              </p>
            </div>

            {!isRegister && (
              <div
                className="mb-6 flex rounded-xl bg-slate-100 p-1"
                role="tablist"
                aria-label="Authentication mode"
              >
                <Link
                  to="/login"
                  role="tab"
                  aria-selected={true}
                  className="flex-1 rounded-lg bg-white py-2 text-center text-sm font-semibold text-primary shadow-sm transition-all duration-300"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  role="tab"
                  aria-selected={false}
                  className="flex-1 rounded-lg py-2 text-center text-sm font-semibold text-text-muted transition-all duration-300 hover:text-text"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {children}
          </motion.div>
        </motion.div>

        {/* Right — Marketing Showcase */}
        {isRegister ? (
          <Suspense fallback={<ShowcaseFallback />}>
            <RegisterMarketingPanel />
          </Suspense>
        ) : (
          <div className="relative hidden overflow-hidden bg-gradient-brand lg:order-2 lg:block">
            <BackgroundShapes />

            <div className="relative flex h-full flex-col justify-center px-10 py-16 xl:px-14">
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h2 className="text-3xl font-bold leading-tight tracking-tight text-white xl:text-[2.75rem] xl:leading-[1.15]">
                  Build. Connect. Succeed.
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-white/85 xl:text-lg">
                  Labora is a modern freelancing platform that connects clients with top talent worldwide.
                </p>
              </motion.div>

              <div className="mt-8 space-y-6">
                <Suspense fallback={<ShowcaseFallback />}>
                  <AuthBenefits />
                  <AuthStats />
                </Suspense>
              </div>

              <FloatingDashboardPreviews />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function LaboraLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand shadow-glow-primary-sm">
        <Briefcase className="h-5 w-5 text-white" strokeWidth={2} />
      </div>
      <span className="text-xl font-bold tracking-tight text-text">Labora</span>
    </div>
  )
}



