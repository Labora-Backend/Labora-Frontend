import { motion } from 'framer-motion'
import { BadgeCheck, Star } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import { FreelancerCardSkeleton } from '@/components/ui/Skeleton'
import AnimatedSection from '@/features/landing/components/AnimatedSection'
import SectionHeader from '@/features/landing/components/SectionHeader'
import { useSectionLoading } from '@/features/landing/hooks/useSectionLoading'

interface Freelancer {
  name: string
  role: string
  rating: number
  rate: string
  image: string
  available: boolean
}

const freelancers: Freelancer[] = [
  {
    name: 'Sarah Chen',
    role: 'UI/UX Designer',
    rating: 4.9,
    rate: '$65/hr',
    image: 'https://i.pravatar.cc/150?img=5',
    available: true,
  },
  {
    name: 'Marcus Johnson',
    role: 'Full Stack Developer',
    rating: 4.8,
    rate: '$85/hr',
    image: 'https://i.pravatar.cc/150?img=12',
    available: true,
  },
  {
    name: 'Elena Rodriguez',
    role: 'Data Scientist',
    rating: 5.0,
    rate: '$95/hr',
    image: 'https://i.pravatar.cc/150?img=9',
    available: false,
  },
  {
    name: 'James Wilson',
    role: 'DevOps Engineer',
    rating: 4.7,
    rate: '$75/hr',
    image: 'https://i.pravatar.cc/150?img=15',
    available: true,
  },
  {
    name: 'Aisha Patel',
    role: 'Content Strategist',
    rating: 4.9,
    rate: '$55/hr',
    image: 'https://i.pravatar.cc/150?img=16',
    available: true,
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function FreelancersSection() {
  const isLoading = useSectionLoading(500)

  return (
    <AnimatedSection className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Top Rated Freelancers"
          viewAllHref="/freelancers"
          viewAllLabel="View All Freelancers"
        />

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <FreelancerCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0"
          >
            {freelancers.map((freelancer) => (
              <motion.div
                key={freelancer.name}
                variants={itemVariants}
                className="min-w-[220px] shrink-0 lg:min-w-0"
              >
                <Card hover className="text-center">
                  <div className="relative mx-auto w-fit">
                    <img
                      src={freelancer.image}
                      alt={freelancer.name}
                      className="mx-auto h-20 w-20 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm">
                      <BadgeCheck className="h-5 w-5 text-primary" strokeWidth={2} />
                    </div>
                  </div>
                  <h3 className="mt-4 font-semibold text-text">{freelancer.name}</h3>
                  <p className="mt-1 text-sm text-text-muted">{freelancer.role}</p>
                  <div className="mt-3 flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold">{freelancer.rating}</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-primary">{freelancer.rate}</p>
                  <div className="mt-4">
                    <Badge variant="success" dot={freelancer.available}>
                      {freelancer.available ? 'Available' : 'Busy'}
                    </Badge>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </AnimatedSection>
  )
}
