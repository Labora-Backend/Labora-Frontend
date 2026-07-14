import { Briefcase, CheckCircle2, Globe, Users, UserCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import AnimatedSection from '@/features/landing/components/AnimatedSection'
import { useAnimatedCounter } from '@/features/landing/hooks/useAnimatedCounter'

interface StatItem {
  icon: LucideIcon
  label: string
  value: number
  suffix: string
}

const stats: StatItem[] = [
  { icon: Briefcase, label: 'Jobs Posted', value: 10, suffix: 'K+' },
  { icon: CheckCircle2, label: 'Projects Completed', value: 25, suffix: 'K+' },
  { icon: Users, label: 'Freelancers', value: 15, suffix: 'K+' },
  { icon: UserCheck, label: 'Clients', value: 8, suffix: 'K+' },
  { icon: Globe, label: 'Countries', value: 120, suffix: '+' },
]

function StatCounter({ stat }: { stat: StatItem }) {
  const { ref, display } = useAnimatedCounter({
    value: stat.value,
    suffix: stat.suffix,
  })

  return (
    <div ref={ref} className="flex flex-col items-center gap-3 px-4 text-center sm:flex-row sm:text-left">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-50">
        <stat.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
      </div>
      <div>
        <p className="text-2xl font-bold text-text sm:text-3xl">{display}</p>
        <p className="text-sm text-text-muted">{stat.label}</p>
      </div>
    </div>
  )
}

export default function StatsSection() {
  return (
    <AnimatedSection className="border-y border-slate-200/80 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex justify-center ${
                index === stats.length - 1 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              <StatCounter stat={stat} />
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
