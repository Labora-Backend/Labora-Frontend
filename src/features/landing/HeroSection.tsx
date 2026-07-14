import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles, Star } from 'lucide-react'
import Button from '@/components/ui/Button'
import AnimatedSection from '@/features/landing/components/AnimatedSection'
import HeroVisual from '@/features/landing/components/HeroVisual'

const avatars = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face',
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.25, 0.1, 0.25, 1] },
})

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion()
  const motionProps = (delay = 0) =>
    prefersReducedMotion ? {} : fadeUp(delay)

  return (
    <AnimatedSection className="relative overflow-hidden bg-background">
      {/* Section background — subtle, non-competing */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(124,58,237,0.07),transparent)]" />
        <div className="absolute -right-32 top-20 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-primary/6 to-secondary/4 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-[280px] w-[280px] rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* Left column */}
          <div className="flex flex-col justify-center">
            <motion.div {...motionProps(0)}>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary-50/80 px-4 py-2 text-sm font-semibold text-primary shadow-sm backdrop-blur-sm">
                <Sparkles className="h-4 w-4" strokeWidth={2} />
                Welcome to Labora
              </span>
            </motion.div>

            <motion.h1
              {...motionProps(0.08)}
              className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-text sm:text-5xl lg:text-[3.5rem] xl:text-[3.75rem]"
            >
              Find Top Freelancers{' '}
              <span className="gradient-text">For Any Project</span>
            </motion.h1>

            <motion.p
              {...motionProps(0.16)}
              className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted sm:text-xl"
            >
              Connect with skilled professionals from around the world. Post jobs,
              receive proposals, and hire the perfect talent for your next big idea.
            </motion.p>

            <motion.div
              {...motionProps(0.24)}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button href="/register" variant="primary" size="lg">
                Hire a Freelancer
              </Button>
              <Button href="/jobs" variant="outline" size="lg">
                Find Work
              </Button>
            </motion.div>

            <motion.div
              {...motionProps(0.32)}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <div className="flex -space-x-3">
                {avatars.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm ring-1 ring-slate-100"
                    style={{ zIndex: avatars.length - i }}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                  <span className="ml-1 text-sm font-semibold text-text">
                    4.9/5
                  </span>
                </div>
                <p className="text-sm text-text-muted">
                  Trusted by 10,000+ users worldwide
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right column — reference illustration */}
          <div className="flex items-center justify-center lg:justify-end">
            <HeroVisual />
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
