import { motion, useReducedMotion } from 'framer-motion'
import {
  Cpu,
  MessageSquare,
  Search,
  Shield,
  Star,
  type LucideIcon,
} from 'lucide-react'

interface Feature {
  title: string
  description: string
  icon: LucideIcon
  accent: string
  iconBg: string
}

const features: Feature[] = [
  {
    title: 'Find Clients & Projects',
    description: 'Discover opportunities matched to your skills and career goals.',
    icon: Search,
    accent: 'text-primary',
    iconBg: 'bg-white/20',
  },
  {
    title: 'Real-Time Collaboration',
    description: 'Work together seamlessly with live messaging and updates.',
    icon: MessageSquare,
    accent: 'text-secondary',
    iconBg: 'bg-white/20',
  },
  {
    title: 'Secure Payments',
    description: 'Protected escrow and milestone-based payment workflows.',
    icon: Shield,
    accent: 'text-emerald-300',
    iconBg: 'bg-white/20',
  },
  {
    title: 'Reviews & Reputation',
    description: 'Build trust with transparent ratings and verified feedback.',
    icon: Star,
    accent: 'text-amber-300',
    iconBg: 'bg-white/20',
  },
  {
    title: 'Microservice Powered Platform',
    description: 'Built on scalable architecture for speed and reliability.',
    icon: Cpu,
    accent: 'text-violet-200',
    iconBg: 'bg-white/20',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

export default function RegisterBenefits() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-3 sm:grid-cols-2"
      aria-label="Platform features"
    >
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          variants={itemVariants}
          className={`group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-shadow duration-300 hover:bg-white/15 hover:shadow-lg ${
            index === features.length - 1 ? 'sm:col-span-2' : ''
          }`}
        >
          <div
            className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/5"
            aria-hidden="true"
          />
          <div
            className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${feature.iconBg} ring-1 ring-white/20`}
          >
            <feature.icon className={`h-5 w-5 ${feature.accent}`} strokeWidth={1.75} />
          </div>
          <h3 className="text-sm font-semibold text-white">{feature.title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-white/75">{feature.description}</p>
          {!prefersReducedMotion && (
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}
