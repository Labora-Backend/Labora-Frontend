import { motion } from 'framer-motion'
import { CreditCard, FileText, MessageSquare, UserPlus } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import AnimatedSection from '@/features/landing/components/AnimatedSection'
import SectionHeader from '@/features/landing/components/SectionHeader'

interface Step {
  number: number
  icon: LucideIcon
  title: string
  description: string
}

const steps: Step[] = [
  {
    number: 1,
    icon: FileText,
    title: 'Post a Job',
    description: 'Describe your project, set your budget, and publish your job listing to reach talented freelancers.',
  },
  {
    number: 2,
    icon: MessageSquare,
    title: 'Receive Proposals',
    description: 'Review proposals from qualified freelancers and compare their skills, experience, and rates.',
  },
  {
    number: 3,
    icon: UserPlus,
    title: 'Discuss & Hire',
    description: 'Chat with candidates in real time, discuss project details, and hire the best fit for your team.',
  },
  {
    number: 4,
    icon: CreditCard,
    title: 'Complete & Pay',
    description: 'Track progress, approve milestones, and release secure payments upon successful completion.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function HowItWorksSection() {
  return (
    <AnimatedSection className="bg-background py-20 sm:py-24" id="how-it-works">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="How It Works"
          subtitle="Get started in four simple steps and bring your projects to life."
          centered
        />

        <div className="relative">
          <div
            className="absolute left-0 right-0 top-[3.25rem] hidden h-0.5 border-t-2 border-dashed border-slate-200 lg:block"
            aria-hidden="true"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          >
            {steps.map((step) => (
              <motion.div key={step.number} variants={itemVariants} className="relative text-center">
                <div className="relative mx-auto mb-6 flex h-[4.5rem] w-[4.5rem] items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-primary-50" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand text-lg font-bold text-white shadow-md">
                    {step.number}
                  </div>
                </div>

                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-card">
                  <step.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>

                <h3 className="text-lg font-semibold text-text">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}
