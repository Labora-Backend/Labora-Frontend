import { motion, useReducedMotion } from 'framer-motion'
import Button from '@/components/ui/Button'
import AnimatedSection from '@/features/landing/components/AnimatedSection'

function CTAIllustration() {
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full max-w-md"
      aria-hidden="true"
    >
      <ellipse cx="200" cy="280" rx="160" ry="20" fill="white" fillOpacity="0.15" />
      <rect x="60" y="120" width="120" height="80" rx="12" fill="white" fillOpacity="0.2" />
      <rect x="70" y="130" width="100" height="60" rx="8" fill="white" fillOpacity="0.3" />
      <circle cx="120" cy="100" r="28" fill="white" fillOpacity="0.25" />
      <rect x="220" y="100" width="120" height="80" rx="12" fill="white" fillOpacity="0.2" />
      <rect x="230" y="110" width="100" height="60" rx="8" fill="white" fillOpacity="0.3" />
      <circle cx="280" cy="80" r="28" fill="white" fillOpacity="0.25" />
      <path
        d="M140 180 L200 140 L260 180"
        stroke="white"
        strokeOpacity="0.3"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="200" cy="60" r="8" fill="white" fillOpacity="0.4" />
      <circle cx="340" cy="160" r="6" fill="white" fillOpacity="0.3" />
      <circle cx="50" cy="180" r="5" fill="white" fillOpacity="0.25" />
    </svg>
  )
}

export default function CTASection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <AnimatedSection className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-brand bg-[length:200%_200%] p-8 shadow-card-lg animate-gradient-shift sm:p-12 lg:p-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <motion.h2
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="text-3xl font-bold text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight"
              >
                Ready to get started?
              </motion.h2>
              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mt-4 max-w-lg text-lg text-white/90"
              >
                Join thousands of clients and freelancers achieving amazing results together.
              </motion.p>
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Button href="/register" variant="white" size="lg">
                  Hire a Freelancer
                </Button>
                <Button href="/jobs" variant="white-outline" size="lg">
                  Find Work
                </Button>
              </motion.div>
            </div>

            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden justify-end lg:flex"
            >
              <CTAIllustration />
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
