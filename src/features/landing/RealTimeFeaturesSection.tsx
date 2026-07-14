import { motion } from 'framer-motion'
import { Bell, CreditCard, MessageCircle, Star } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import AnimatedSection from '@/features/landing/components/AnimatedSection'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: MessageCircle,
    title: 'Instant Messaging',
    description: 'Real-time chat powered by Django Channels and WebSockets.',
  },
  {
    icon: Bell,
    title: 'Live Notifications',
    description: 'Instant updates for applications, payments, reviews, and messages.',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Protected payment workflows with transaction tracking and verification.',
  },
  {
    icon: Star,
    title: 'Review System',
    description: 'Transparent ratings and reviews after project completion.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function RealTimeFeaturesSection() {
  return (
    <AnimatedSection className="relative overflow-hidden py-20 sm:py-24">
      <div
        className="absolute inset-0 bg-gradient-brand bg-[length:200%_200%] animate-gradient-shift"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Real-Time Features
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-white/85">
            Powering seamless collaboration through modern microservice architecture.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <div className="group h-full rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 transition-transform duration-300 group-hover:scale-105">
                  <feature.icon className="h-6 w-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
