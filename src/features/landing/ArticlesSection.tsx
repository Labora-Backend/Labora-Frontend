import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import { ArticleCardSkeleton } from '@/components/ui/Skeleton'
import AnimatedSection from '@/features/landing/components/AnimatedSection'
import SectionHeader from '@/features/landing/components/SectionHeader'
import { useSectionLoading } from '@/features/landing/hooks/useSectionLoading'

interface Article {
  image: string
  category: string
  date: string
  title: string
  slug: string
}

const articles: Article[] = [
  {
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
    category: 'Tips & Tricks',
    date: 'Mar 15, 2026',
    title: '10 Tips for Hiring the Perfect Freelancer for Your Startup',
    slug: 'hiring-perfect-freelancer',
  },
  {
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    category: 'Freelancing',
    date: 'Mar 12, 2026',
    title: 'How to Build a Standout Freelancer Profile That Gets You Hired',
    slug: 'standout-freelancer-profile',
  },
  {
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
    category: 'Industry News',
    date: 'Mar 8, 2026',
    title: 'The Future of Remote Work: Trends Shaping 2026 and Beyond',
    slug: 'future-remote-work-2026',
  },
  {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    category: 'Product Updates',
    date: 'Mar 5, 2026',
    title: 'Introducing Real-Time Messaging: Collaborate Faster Than Ever',
    slug: 'real-time-messaging-launch',
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

export default function ArticlesSection() {
  const isLoading = useSectionLoading(600)

  return (
    <AnimatedSection className="bg-background py-20 sm:py-24" id="articles">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Latest Articles & Resources"
          viewAllHref="/blog"
          viewAllLabel="View All Articles"
        />

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {articles.map((article) => (
              <motion.div key={article.slug} variants={itemVariants}>
                <Card hover padding="none" className="group overflow-hidden">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={article.image}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3">
                      <Badge variant="primary">{article.category}</Badge>
                      <span className="text-xs text-text-muted">{article.date}</span>
                    </div>
                    <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-snug text-text">
                      {article.title}
                    </h3>
                    <Link
                      to={`/blog/${article.slug}`}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
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
