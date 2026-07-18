import { Star } from 'lucide-react'
import Skeleton from '@/components/ui/Skeleton'
import type { ReviewItem } from '@/features/freelancer/types/dashboard'

interface ReviewsSectionProps {
  reviews: ReviewItem[]
  loading: boolean
}

export function ReviewsSection({ reviews, loading }: ReviewsSectionProps) {
  if (loading) return <Skeleton className="h-[210px] rounded-[20px]" />

  const average = reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : undefined

  return (
    <section className="rounded-[20px] border border-[#E2E8F0] min-h-[210px] bg-white p-5 shadow-lg shadow-purple-100/20">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-[#0F172A]">Reviews & Ratings</h2>
        <a href="/reviews" className="text-sm font-semibold text-[#7C3AED] hover:underline">View All</a>
      </div>
      <div className="grid gap-4 md:grid-cols-[160px_minmax(0,1fr)]">
        <div className="rounded-[20px] bg-[#F8FAFC] p-4 text-center">
          <p className="text-4xl font-bold text-[#0F172A]">{average ? average.toFixed(1) : '-'}</p>
          <p className="text-sm text-[#64748B]">Average rating</p>
          <div className="mt-3 flex justify-center gap-1 text-[#F59E0B]">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}</div>
        </div>
        {reviews.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2">
            {reviews.slice(0, 2).map((review) => (
              <article key={review.id} className="rounded-[20px] border border-[#E2E8F0] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold text-[#0F172A]">{review.client}</p>
                  <span className="flex items-center gap-1 text-sm font-bold text-[#F59E0B]"><Star className="h-4 w-4 fill-current" />{review.rating.toFixed(1)}</span>
                </div>
                <p className="mt-3 text-sm text-[#64748B]">{review.comment ?? 'No written review provided.'}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid min-h-40 place-items-center rounded-[20px] border border-dashed border-[#E2E8F0] bg-[#F8FAFC] text-sm font-medium text-[#64748B]">No reviews yet.</div>
        )}
      </div>
    </section>
  )
}


