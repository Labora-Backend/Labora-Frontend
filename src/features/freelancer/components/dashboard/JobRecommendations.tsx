import { Bookmark, Building2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Skeleton from '@/components/ui/Skeleton'
import type { JobRecommendation } from '@/features/freelancer/types/dashboard'

interface JobRecommendationsProps {
  jobs: JobRecommendation[]
  loading: boolean
}

export function JobRecommendations({ jobs, loading }: JobRecommendationsProps) {
  if (loading) return <Skeleton className="h-[285px] rounded-[20px]" />

  return (
    <section className="rounded-[20px] border border-[#E2E8F0] min-h-[285px] bg-white p-5 shadow-lg shadow-purple-100/20">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-[#0F172A]">Recent Job Opportunities</h2>
        <a href="/jobs" className="text-sm font-semibold text-[#7C3AED] hover:underline">View All</a>
      </div>
      {jobs.length > 0 ? (
        <div className="space-y-2">
          {jobs.map((job) => (
            <article key={job.id} className="flex flex-col gap-3 rounded-xl border border-[#E2E8F0] p-3 transition hover:border-[#C4B5FD] hover:bg-[#F8FAFC] sm:flex-row sm:items-center">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-50 text-[#7C3AED]"><Building2 className="h-5 w-5" /></div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-bold text-[#0F172A]">{job.title}</h3>
                <p className="text-sm text-[#64748B]">{job.company}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {job.skills.slice(0, 3).map((skill) => <span key={skill} className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-[#7C3AED]">{skill}</span>)}
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                <div className="text-right">
                  <p className="text-sm font-bold text-[#7C3AED]">{job.salary ?? 'Budget not listed'}</p>
                  <p className="text-xs text-[#64748B]">{job.postedAt ?? 'Recently posted'}</p>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-xl border border-[#E2E8F0] p-2 text-[#64748B] hover:bg-[#F3F4F6]" aria-label={`Bookmark ${job.title}`}><Bookmark className="h-4 w-4" /></button>
                  <Button href={`/jobs/${job.id}`} size="sm" className="bg-[#7C3AED] hover:bg-[#6D28D9]">Apply</Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="grid h-[210px] place-items-center rounded-[20px] border border-dashed border-[#E2E8F0] bg-[#F8FAFC] text-sm font-medium text-[#64748B]">No job recommendations available.</div>
      )}
    </section>
  )
}


