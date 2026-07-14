import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { PropsWithChildren } from 'react'
import { useRef } from 'react'

interface AnimatedSectionProps extends PropsWithChildren {
  className?: string
  delay?: number
  id?: string
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  id,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  )
}
