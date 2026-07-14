import { Briefcase, Menu, Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'

const navLinks = [
  { label: 'Find Jobs', href: '/jobs' },
  { label: 'Find Freelancers', href: '/freelancers' },
  { label: 'Categories', href: '#categories' },
  { label: 'About', href: '#about' },
  { label: 'How It Works', href: '#how-it-works' },
]

function LaboraLogo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="Labora home">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand shadow-sm transition-transform duration-300 group-hover:scale-105">
        <Briefcase className="h-5 w-5 text-white" strokeWidth={2} />
      </div>
      <span className="text-xl font-bold text-text">Labora</span>
    </Link>
  )
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md'
          : 'border-b border-transparent bg-white'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[72px]">
          <LaboraLogo />

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-slate-50 hover:text-text"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
                strokeWidth={2}
              />
              <input
                type="search"
                placeholder="Search jobs, skills..."
                aria-label="Search jobs and skills"
                className="w-48 rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm text-text outline-none transition-all duration-300 placeholder:text-slate-400 focus:w-56 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 xl:w-56 xl:focus:w-64"
              />
            </div>
            <Button href="/login" variant="ghost" size="sm">
              Login
            </Button>
            <Button href="/register" variant="primary" size="sm">
              Register
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-text-muted transition-colors hover:bg-slate-100 lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-slate-200 bg-white lg:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              <div className="relative mb-4">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
                  strokeWidth={2}
                />
                <input
                  type="search"
                  placeholder="Search jobs, skills..."
                  aria-label="Search jobs and skills"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted hover:bg-slate-50 hover:text-text"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4">
                <Button href="/login" variant="outline" fullWidth>
                  Login
                </Button>
                <Button href="/register" variant="primary" fullWidth>
                  Register
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
