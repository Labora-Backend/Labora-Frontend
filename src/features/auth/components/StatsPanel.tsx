import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface StatItem {
  label: string
  value: number
  suffix: string
  prefix?: string
  isPercentage?: boolean
}

const stats: StatItem[] = [
  { label: 'Clients', value: 10000, suffix: '+', prefix: '' },
  { label: 'Projects', value: 25000, suffix: '+', prefix: '' },
  { label: 'Freelancers', value: 5000, suffix: '+', prefix: '' },
  { label: 'Satisfaction Rate', value: 98, suffix: '%', prefix: '', isPercentage: true },
]

function formatStatValue(count: number, stat: StatItem): string {
  if (stat.isPercentage) return `${count}${stat.suffix}`
  return `${count.toLocaleString()}${stat.suffix}`
}

function AnimatedStat({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const prefersReducedMotion = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    if (prefersReducedMotion) {
      setCount(stat.value)
      return
    }

    let startTime: number | null = null
    let frameId: number
    const duration = 1600

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
  }, [isInView, stat.value, prefersReducedMotion])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
      className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3.5 text-center backdrop-blur-sm"
    >
      <p className="text-xl font-bold tabular-nums text-white sm:text-2xl">
        {formatStatValue(count, stat)}
      </p>
      <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-white/70">
        {stat.label}
      </p>
    </motion.div>
  )
}

export default function StatsPanel() {
  return (
    <div
      className="grid grid-cols-2 gap-3 lg:grid-cols-4"
      aria-label="Platform statistics"
    >
      {stats.map((stat, index) => (
        <AnimatedStat key={stat.label} stat={stat} index={index} />
      ))}
    </div>
  )
}
