import { motion, useReducedMotion } from 'framer-motion'
import { Star, CheckCircle2, Shield } from 'lucide-react'

const CARD_SHADOW = 'shadow-[0_20px_60px_rgba(124,58,237,0.12)]'

function floatMotion(
  prefersReducedMotion: boolean | null,
  duration: number,
  delay = 0,
) {
  if (prefersReducedMotion) return {}
  return {
    animate: { y: [0, -10, 0] },
    transition: {
      duration,
      repeat: Infinity,
      ease: 'easeInOut' as const,
      delay,
    },
  }
}

export default function HeroVisual() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className="relative mx-auto h-[380px] w-full max-w-[340px] sm:h-[420px] sm:max-w-[460px] lg:h-[460px] lg:max-w-[520px] xl:max-w-[550px]"
      aria-label="Freelancer profile and statistics"
    >
      {/* Large blurred gradient circle */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[280px] w-[280px] -translate-x-1/2 -translate-y-[45%] rounded-full bg-gradient-to-br from-[#7C3AED]/25 via-[#06B6D4]/20 to-[#7C3AED]/10 blur-3xl sm:h-[340px] sm:w-[340px] lg:h-[400px] lg:w-[400px]"
        aria-hidden="true"
      />

      {/* Curved SVG wave — connects lower cards */}
      <svg
        className="pointer-events-none absolute bottom-[72px] left-1/2 z-10 w-[88%] -translate-x-1/2 sm:bottom-[80px] lg:bottom-[88px]"
        viewBox="0 0 440 120"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M 20 90 C 80 30, 160 20, 220 55 C 280 90, 360 70, 420 40"
          stroke="url(#hero-wave-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.55"
        />
        <defs>
          <linearGradient id="hero-wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>

      {/* Freelancer Profile Card — top center, largest */}
      <motion.div
        {...floatMotion(prefersReducedMotion, 5.5, 0)}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute left-1/2 top-0 z-30 w-[92%] max-w-[360px] -translate-x-1/2 sm:w-[88%]"
      >
        <div
          className={`flex items-center gap-3 rounded-2xl border border-white/80 bg-white p-3 backdrop-blur-md sm:gap-4 sm:p-4 ${CARD_SHADOW}`}
        >
          <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face"
            alt="Rohan Singh"
            loading="lazy"
            decoding="async"
            width={72}
            height={72}
            className="h-14 w-14 shrink-0 rounded-xl object-cover ring-2 ring-primary/10 sm:h-[72px] sm:w-[72px] sm:rounded-2xl"
          />

          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-primary sm:text-xs">
              Top Rated Freelancer
            </p>
            <h3 className="truncate text-base font-bold text-text sm:text-lg">
              Rohan Singh
            </h3>
            <p className="truncate text-xs text-text-muted sm:text-sm">
              Full Stack Developer
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-center gap-0.5 rounded-xl bg-amber-50 px-2.5 py-2 sm:px-3">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-bold text-text">4.9</span>
            <span className="text-[9px] font-medium text-text-muted sm:text-[10px]">
              Top Rated
            </span>
          </div>
        </div>
      </motion.div>

      {/* Project Completed Card — lower left */}
      <motion.div
        {...floatMotion(prefersReducedMotion, 5, 0.4)}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="absolute bottom-4 left-0 z-20 sm:bottom-6 sm:left-2 lg:bottom-8 lg:left-4"
      >
        <div
          className={`flex items-center gap-2.5 rounded-2xl border border-white/80 bg-white px-3 py-2.5 backdrop-blur-md sm:gap-3 sm:px-4 sm:py-3 ${CARD_SHADOW}`}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#06B6D4] sm:h-10 sm:w-10">
            <CheckCircle2 className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[10px] font-medium text-text-muted sm:text-xs">
              Project Completed
            </p>
            <p className="text-base font-bold text-text sm:text-lg">850+</p>
          </div>
        </div>
      </motion.div>

      {/* Total Earnings Card — lower right */}
      <motion.div
        {...floatMotion(prefersReducedMotion, 6, 0.8)}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="absolute bottom-4 right-0 z-20 sm:bottom-6 sm:right-2 lg:bottom-8 lg:right-4"
      >
        <div
          className={`flex items-center gap-2.5 rounded-2xl border border-white/80 bg-white px-3 py-2.5 backdrop-blur-md sm:gap-3 sm:px-4 sm:py-3 ${CARD_SHADOW}`}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#7C3AED] sm:h-10 sm:w-10">
            <Shield className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[10px] font-medium text-text-muted sm:text-xs">
              Total Earnings
            </p>
            <p className="text-base font-bold text-text sm:text-lg">$128K+</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
