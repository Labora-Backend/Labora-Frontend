interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`skeleton-shimmer rounded-lg bg-slate-200 ${className}`} aria-hidden="true" />
}

export function FreelancerCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-surface p-6 shadow-card" aria-hidden="true">
      <div className="flex flex-col items-center">
        <Skeleton className="h-20 w-20 rounded-full" />
        <Skeleton className="mt-4 h-4 w-32" />
        <Skeleton className="mt-2 h-3 w-24" />
        <Skeleton className="mt-4 h-4 w-16" />
        <Skeleton className="mt-4 h-6 w-20 rounded-full" />
      </div>
    </div>
  )
}

export function ArticleCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-surface shadow-card" aria-hidden="true">
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="p-5">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="mt-3 h-5 w-full" />
        <Skeleton className="mt-2 h-5 w-3/4" />
        <Skeleton className="mt-4 h-4 w-24" />
      </div>
    </div>
  )
}

export default Skeleton
