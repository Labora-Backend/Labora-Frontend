import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'
import {
  Bell,
  Check,
  Folder,
  Heart,
  MessageCircle,
  Shield,
  Star,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface FeatureCard {
  title: string
  description: string
  icon: LucideIcon
  iconClassName: string
}

interface StatItem {
  value: number
  suffix: string
  label: string
  icon: LucideIcon
  iconClassName: string
}

const navLinks = ['Find Jobs', 'Find Freelancers', 'About', 'How It Works', 'Categories']

const features: FeatureCard[] = [
  {
    icon: Users,
    title: 'Choose Your Role',
    description: 'Join as a Client, Freelancer, or Admin and get personalized experience.',
    iconClassName: 'bg-violet-50 text-violet-600',
  },
  {
    icon: Shield,
    title: 'Secure & Trusted',
    description: 'Your data is protected with industry-standard security.',
    iconClassName: 'bg-emerald-50 text-emerald-500',
  },
  {
    icon: MessageCircle,
    title: 'Real-time Collaboration',
    description: 'Connect, chat, and collaborate seamlessly in real-time.',
    iconClassName: 'bg-sky-50 text-sky-500',
  },
  {
    icon: Star,
    title: 'Grow Together',
    description: 'Build your reputation, get more projects, and grow your network.',
    iconClassName: 'bg-pink-50 text-pink-500',
  },
]

const stats: StatItem[] = [
  {
    value: 10000,
    suffix: '+',
    label: 'Happy Clients',
    icon: Users,
    iconClassName: 'text-violet-500',
  },
  {
    value: 25000,
    suffix: '+',
    label: 'Projects Completed',
    icon: Folder,
    iconClassName: 'text-sky-500',
  },
  {
    value: 5000,
    suffix: '+',
    label: 'Verified Freelancers',
    icon: Shield,
    iconClassName: 'text-emerald-500',
  },
  {
    value: 98,
    suffix: '%',
    label: 'Satisfaction Rate',
    icon: Heart,
    iconClassName: 'text-pink-500',
  },
]

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

function formatStatValue(count: number, stat: StatItem) {
  if (stat.suffix === '%') return `${count}%`
  return `${count.toLocaleString()}${stat.suffix}`
}

function CountUpStat({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })
  const prefersReducedMotion = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    if (prefersReducedMotion) {
      setCount(stat.value)
      return
    }

    let frameId = 0
    let startTime: number | null = null
    const duration = 1400

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * stat.value))

      if (progress < 1) frameId = requestAnimationFrame(animate)
      else setCount(stat.value)
    }

    frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [isInView, prefersReducedMotion, stat.value])

  return (
    <motion.div
      ref={ref}
      variants={revealVariants}
      className="flex items-center justify-center gap-3 px-3 py-2 text-left lg:justify-start"
      transition={{ delay: index * 0.04 }}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white shadow-[0_10px_25px_rgba(124,58,237,0.12)]">
        <stat.icon className={`h-5 w-5 ${stat.iconClassName}`} strokeWidth={2.25} />
      </div>
      <div>
        <p className="text-lg font-extrabold leading-tight tabular-nums text-text sm:text-xl">
          {formatStatValue(count, stat)}
        </p>
        <p className="mt-0.5 text-[11px] font-medium leading-tight text-slate-500">{stat.label}</p>
      </div>
    </motion.div>
  )
}

function DecorativeBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -right-36 top-16 h-[31rem] w-[31rem] rounded-full bg-violet-200/35 blur-3xl" />
      <div className="absolute right-0 top-36 h-96 w-96 rounded-full bg-sky-100/55 blur-3xl" />
      <div className="absolute bottom-0 right-24 h-80 w-80 rounded-full bg-violet-100/40 blur-3xl" />
      <svg
        className="absolute right-0 top-36 h-[32rem] w-[36rem] text-violet-300/35"
        viewBox="0 0 580 520"
        fill="none"
      >
        <path
          d="M507 50C594 145 555 314 439 378C323 442 253 535 135 495C17 455 -35 319 24 207C83 95 206 37 331 17C399 6 465 4 507 50Z"
          fill="currentColor"
        />
      </svg>
      <svg
        className="absolute bottom-2 right-12 h-80 w-80 text-sky-100/70"
        viewBox="0 0 320 320"
        fill="none"
      >
        <path
          d="M266 61C310 111 314 194 267 242C219 291 133 306 77 265C21 224 -4 127 43 72C90 17 222 11 266 61Z"
          fill="currentColor"
        />
      </svg>
      <div className="absolute right-14 top-28 grid grid-cols-8 gap-3 opacity-30">
        {Array.from({ length: 64 }).map((_, index) => (
          <span key={index} className="h-1 w-1 rounded-full bg-violet-300" />
        ))}
      </div>
      <span className="absolute right-24 top-64 h-4 w-4 rounded-full border-2 border-violet-300/60" />
      <span className="absolute bottom-28 right-1/2 h-5 w-5 rounded-full border-2 border-sky-200/80" />
      <span className="absolute right-1/3 top-44 h-2.5 w-2.5 rounded-full bg-violet-300/50" />
    </div>
  )
}

function DashboardIllustration() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={
        prefersReducedMotion
          ? { opacity: 1 }
          : {
              opacity: 1,
              y: [0, -12, 0],
            }
      }
      transition={{
        opacity: { duration: 0.35, delay: 0.2 },
        y: { duration: 6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
      }}
      className="relative mx-auto h-[25rem] w-full max-w-[34rem] lg:mx-0 lg:ml-auto"
      aria-hidden="true"
    >
      <div className="absolute right-16 top-2 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-card-lg">
        <Users className="h-7 w-7 text-violet-500" />
        <span className="absolute right-4 top-5 h-2 w-2 rounded-full bg-violet-500" />
      </div>

      <div className="absolute left-6 top-[5.2rem] w-[24rem] overflow-hidden rounded-xl border border-violet-100 bg-white/90 shadow-[0_30px_80px_rgba(91,33,182,0.18)] backdrop-blur-md sm:left-10 sm:w-[26rem]">
        <div className="flex h-9 items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-500 px-4">
          <span className="h-3 w-3 rounded-full bg-rose-400" />
          <span className="h-3 w-3 rounded-full bg-amber-300" />
          <span className="h-3 w-3 rounded-full bg-emerald-300" />
          <span className="ml-auto h-2.5 w-12 rounded-full bg-white/20" />
        </div>
        <div className="grid grid-cols-[1.15fr_0.85fr] gap-5 p-5">
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-end justify-center overflow-hidden rounded-full bg-gradient-to-br from-violet-100 to-blue-100">
                <div className="h-8 w-8 rounded-t-full bg-slate-800" />
              </div>
              <div>
                <div className="h-2.5 w-16 rounded-full bg-violet-200" />
                <div className="mt-2 flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                      strokeWidth={2}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="rounded-lg bg-violet-50 p-2">
                <div className="mx-auto h-3 w-3 rounded bg-violet-200" />
                <div className="mx-auto mt-1.5 h-1.5 w-5 rounded bg-violet-100" />
              </div>
            ))}
          </div>

          <div className="col-span-2 grid grid-cols-[0.85fr_1.15fr] gap-5">
            <div className="space-y-3 rounded-xl border border-slate-100 bg-white p-4">
              <div className="h-2.5 w-20 rounded-full bg-violet-200" />
              <div className="h-2.5 w-16 rounded-full bg-slate-200" />
              <div className="h-2.5 w-24 rounded-full bg-slate-100" />
              <div className="h-2.5 w-14 rounded-full bg-slate-100" />
            </div>
            <div className="rounded-xl border border-violet-50 bg-white p-4">
              <div className="mb-4 h-2.5 w-20 rounded-full bg-violet-200" />
              <div className="flex h-24 items-end gap-2">
                {[24, 34, 38, 56, 49, 68, 62, 78].map((height, index) => (
                  <span
                    key={index}
                    className="flex-1 rounded-t bg-gradient-to-t from-violet-500 to-sky-300"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-14 right-0 w-[18rem] rounded-xl border border-white/90 bg-white/90 p-5 shadow-[0_22px_60px_rgba(91,33,182,0.18)] backdrop-blur-md">
        <div className="mb-5 h-2.5 w-28 rounded-full bg-violet-200" />
        <svg viewBox="0 0 260 110" className="h-28 w-full overflow-visible">
          <path d="M8 87L36 76L64 62L92 68L120 35L148 46L176 27L204 38L252 18" fill="none" stroke="#7C3AED" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {[8, 36, 64, 92, 120, 148, 176, 204, 252].map((x, index) => {
            const y = [87, 76, 62, 68, 35, 46, 27, 38, 18][index]
            return <circle key={x} cx={x} cy={y} r="4" fill="#7C3AED" />
          })}
        </svg>
      </div>

      <div className="absolute bottom-20 left-10 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-card-lg">
        <Check className="h-7 w-7 text-emerald-500" strokeWidth={3} />
      </div>
      <div className="absolute right-0 top-40 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-card-lg">
        <MessageCircle className="h-7 w-7 fill-violet-500 text-violet-500" strokeWidth={2} />
      </div>
      <div className="absolute left-1 top-48 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 shadow-card-lg">
        <Bell className="h-5 w-5 text-sky-500" />
      </div>
      <div className="absolute left-24 top-24 rounded-2xl bg-white/90 px-4 py-3 shadow-card-lg">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-violet-500" />
          <span className="text-xs font-bold text-slate-600">+48%</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function RegisterMarketingPanel() {
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.aside
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="relative flex min-h-full overflow-hidden bg-[#fbfbff] px-6 py-10 text-text sm:px-10 lg:px-12 xl:px-16"
      aria-label="Labora registration benefits"
    >
      <DecorativeBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-start pt-5 sm:pt-8 xl:pt-10">
        <nav className="absolute right-0 top-0 hidden flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-500 xl:flex">
          {navLinks.map((link) => (
            <motion.button
              key={link}
              type="button"
              onClick={() => navigate('/login')}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="rounded-md px-1 py-1 transition-colors hover:text-violet-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
            >
              {link}
            </motion.button>
          ))}
        </nav>



        <div className="grid items-center gap-10 xl:grid-cols-[0.9fr_1.1fr]">
          <div>
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              <h2 className="text-[1.85rem] font-extrabold leading-[1.08] tracking-tight text-slate-950 sm:text-[2rem] xl:text-[2.15rem]">
                Join Thousands
                <br />
                of{' '}
                <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-violet-600 bg-clip-text text-transparent">
                  Professionals
                </span>
              </h2>
              <p className="mt-4 max-w-md text-sm font-medium leading-7 text-slate-600">
                Create your account and unlock a world of opportunities.
                <br />
                Whether you're hiring or looking for work,
                <br />
                Labora is here to help you succeed.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-9 space-y-6"
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={revealVariants}
                  whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="group flex max-w-md items-start gap-4 rounded-2xl border border-white/80 bg-white/75 p-3 shadow-[0_14px_40px_rgba(91,33,182,0.08)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(124,58,237,0.16)]"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-[0_10px_26px_rgba(15,23,42,0.07)] ${feature.iconClassName}`}
                  >
                    <feature.icon className="h-6 w-6" strokeWidth={2.35} />
                  </div>
                  <div className="pt-0.5">
                    <h3 className="text-sm font-extrabold text-slate-950">{feature.title}</h3>
                    <p className="mt-1.5 text-xs font-medium leading-5 text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <DashboardIllustration />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-10 grid rounded-2xl border border-white/80 bg-white/85 px-4 py-5 shadow-[0_18px_60px_rgba(91,33,182,0.10)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Labora platform statistics"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="border-slate-200/80 last:border-0 sm:even:border-0 lg:border-r lg:even:border-r"
            >
              <CountUpStat stat={stat} index={index} />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.aside>
  )
}
