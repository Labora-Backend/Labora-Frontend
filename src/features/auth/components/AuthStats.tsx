import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface StatItem {
  label: string
  value: number
  suffix: string
}

const stats: StatItem[] = [
  { label: 'Happy Clients', value: 10, suffix: 'K+' },
  { label: 'Projects Completed', value: 25, suffix: 'K+' },
  { label: 'Verified Freelancers', value: 5, suffix: 'K+' },
]

function AnimatedStat({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
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
    const duration = 1500

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
      className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-center backdrop-blur-sm"
    >
      <p className="text-2xl font-bold text-white">
        {count.toLocaleString()}
        {stat.suffix}
      </p>
      <p className="mt-1 text-xs text-white/75">{stat.label}</p>
    </motion.div>
  )
}

export default function AuthStats() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat, index) => (
        <AnimatedStat key={stat.label} stat={stat} index={index} />
      ))}
    </div>
  )
}
