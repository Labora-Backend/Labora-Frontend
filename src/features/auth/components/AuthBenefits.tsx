import { motion } from 'framer-motion'
import { MessageSquare, Shield, Star, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Benefit {
  title: string
  description: string
  icon: LucideIcon
  color: string
  bgColor: string
}

const benefits: Benefit[] = [
  {
    title: 'Find the Right Talent',
    description: 'Access thousands of verified freelancers across every skill category.',
    icon: Users,
    color: 'text-primary',
    bgColor: 'bg-primary-50',
  },
  {
    title: 'Real-Time Communication',
    description: 'Chat instantly with candidates using our WebSocket-powered messaging.',
    icon: MessageSquare,
    color: 'text-secondary',
    bgColor: 'bg-secondary-50',
  },
  {
    title: 'Secure Payments',
    description: 'Protected escrow workflows with milestone tracking and verification.',
    icon: Shield,
    color: 'text-success',
    bgColor: 'bg-success-50',
  },
  {
    title: 'Quality Work Delivery',
    description: 'Review ratings and transparent feedback after every completed project.',
    icon: Star,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

export default function AuthBenefits() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-4 sm:grid-cols-2"
    >
      {benefits.map((benefit) => (
        <motion.div
          key={benefit.title}
          variants={itemVariants}
          className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm"
        >
          <div
            className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${benefit.bgColor}`}
          >
            <benefit.icon className={`h-5 w-5 ${benefit.color}`} strokeWidth={1.75} />
          </div>
          <h3 className="text-sm font-semibold text-white">{benefit.title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-white/75">{benefit.description}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}
