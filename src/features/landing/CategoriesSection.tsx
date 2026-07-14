import { motion } from 'framer-motion'
import {
  Brain,
  Cloud,
  Code2,
  PenLine,
  Smartphone,
  Palette,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Card from '@/components/ui/Card'
import AnimatedSection from '@/features/landing/components/AnimatedSection'
import SectionHeader from '@/features/landing/components/SectionHeader'

interface Category {
  icon: LucideIcon
  title: string
  jobs: string
  color: string
  bgColor: string
}

const categories: Category[] = [
  {
    icon: Code2,
    title: 'Web Development',
    jobs: '12,500+ Jobs',
    color: 'text-primary',
    bgColor: 'bg-primary-50',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    jobs: '8,200+ Jobs',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    jobs: '9,800+ Jobs',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    jobs: '5,400+ Jobs',
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
  },
  {
    icon: Cloud,
    title: 'DevOps & Cloud',
    jobs: '6,100+ Jobs',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
  },
  {
    icon: PenLine,
    title: 'Writing & Content',
    jobs: '7,300+ Jobs',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function CategoriesSection() {
  return (
    <AnimatedSection className="bg-background py-20 sm:py-24" id="categories">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Popular Categories"
          viewAllHref="/categories"
          viewAllLabel="View All Categories"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((category) => (
            <motion.div key={category.title} variants={itemVariants}>
              <Card
                hover
                className="group cursor-pointer transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${category.bgColor} transition-transform duration-300 group-hover:-translate-y-1`}
                  >
                    <category.icon className={`h-6 w-6 ${category.color}`} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text">{category.title}</h3>
                    <p className="mt-1 text-sm text-text-muted">{category.jobs}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
