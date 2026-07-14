import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import AnimatedSection from '@/features/landing/components/AnimatedSection'
import SectionHeader from '@/features/landing/components/SectionHeader'

interface Testimonial {
  name: string
  company: string
  review: string
  image: string
}

const testimonials: Testimonial[] = [
  {
    name: 'David Thompson',
    company: 'TechStart Inc.',
    review:
      'Labora helped us find an incredible developer who delivered our MVP ahead of schedule. The real-time messaging made collaboration seamless across time zones.',
    image: 'https://i.pravatar.cc/80?img=33',
  },
  {
    name: 'Maria Garcia',
    company: 'Creative Studio',
    review:
      'We\'ve hired multiple designers through Labora and the quality has been consistently outstanding. The review system gives us confidence in every hire.',
    image: 'https://i.pravatar.cc/80?img=25',
  },
  {
    name: 'Robert Kim',
    company: 'Growth Labs',
    review:
      'As a freelancer, Labora has transformed how I find clients. The platform\'s payment protection and instant notifications keep everything running smoothly.',
    image: 'https://i.pravatar.cc/80?img=53',
  },
  {
    name: 'Lisa Anderson',
    company: 'Nova Digital',
    review:
      'The hiring process is incredibly smooth. From posting a job to making the final payment, every step feels professional and secure.',
    image: 'https://i.pravatar.cc/80?img=44',
  },
]

const SLIDE_INTERVAL = 5000

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return
    const timer = setInterval(nextSlide, SLIDE_INTERVAL)
    return () => clearInterval(timer)
  }, [nextSlide, prefersReducedMotion])

  const visibleTestimonials = prefersReducedMotion
    ? testimonials.slice(0, 3)
    : [
        testimonials[activeIndex % testimonials.length],
        testimonials[(activeIndex + 1) % testimonials.length],
        testimonials[(activeIndex + 2) % testimonials.length],
      ]

  return (
    <AnimatedSection className="bg-white py-20 sm:py-24" id="testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="What Our Clients Say"
          viewAllHref="/reviews"
          viewAllLabel="View All Reviews"
        />

        {prefersReducedMotion ? (
          <div className="grid gap-6 md:grid-cols-3">
            {visibleTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} />
            ))}
          </div>
        ) : (
          <>
            <div className="hidden gap-6 md:grid md:grid-cols-3">
              <AnimatePresence mode="wait">
                {visibleTestimonials.map((testimonial, i) => (
                  <motion.div
                    key={`${testimonial.name}-${activeIndex}-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="md:hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <TestimonialCard testimonial={testimonials[activeIndex]} />
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 flex justify-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeIndex ? 'w-6 bg-primary' : 'w-2 bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8 hidden justify-center gap-2 md:flex">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === activeIndex ? 'w-6 bg-primary' : 'w-2 bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </AnimatedSection>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card hover className="flex h-full flex-col">
      <Quote className="h-8 w-8 text-secondary" strokeWidth={1.5} />
      <p className="mt-4 flex-1 text-sm leading-relaxed text-text-muted">{testimonial.review}</p>
      <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-6">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-text">{testimonial.name}</p>
          <p className="text-xs text-text-muted">{testimonial.company}</p>
        </div>
      </div>
    </Card>
  )
}
