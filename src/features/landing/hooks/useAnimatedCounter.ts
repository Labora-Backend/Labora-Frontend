import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface CounterConfig {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
}

export function useAnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2000,
}: CounterConfig) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const prefersReducedMotion = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    if (prefersReducedMotion) {
      setCount(value)
      return
    }

    let startTime: number | null = null
    let frameId: number

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))
      if (progress < 1) {
        frameId = requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [isInView, value, duration, prefersReducedMotion])

  const formatted =
    value >= 1000
      ? `${prefix}${count >= 1000 ? `${Math.floor(count / 1000)}K` : count}${suffix}`
      : `${prefix}${count}${suffix}`

  return { ref, display: formatted }
}
