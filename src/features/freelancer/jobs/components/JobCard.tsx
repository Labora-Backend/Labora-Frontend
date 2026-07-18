import { BriefcaseBusiness, Clock3, MapPin, MoreVertical } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import type { FreelanceJob } from '@/features/freelancer/jobs/types/jobs'
import { formatBudgetRange, formatPostedTime, type ViewMode } from '@/features/freelancer/jobs/utils/jobFilters'
import { SavedButton } from '@/features/freelancer/jobs/components/SavedButton'

interface JobCardProps {
  job: FreelanceJob
  saved: boolean
  view: ViewMode
  onToggleSaved: (id: string) => void
}

function CompanyLogo({ job }: { job: FreelanceJob }) {
  if (job.logoKind === 'figma') {
    return (
      <div className="grid h-[58px] w-[58px] place-items-center rounded-[16px] bg-white">
        <div className="grid grid-cols-2 gap-0.5">
          <span className="h-4 w-4 rounded-full bg-[#F24E1E]" />
          <span className="h-4 w-4 rounded-full bg-[#FF7262]" />
          <span className="h-4 w-4 rounded-full bg-[#A259FF]" />
          <span className="h-4 w-4 rounded-full bg-[#1ABCFE]" />
          <span className="col-start-1 h-4 w-4 rounded-full bg-[#0ACF83]" />
        </div>
      </div>
    )
  }

  if (job.logoKind === 'leaf') {
    return <div className="grid h-[58px] w-[58px] place-items-center rounded-[16px] bg-emerald-50 text-4xl">☘</div>
  }

  if (job.logoKind === 'grid') {
    return <div className="grid h-[58px] w-[58px] place-items-center rounded-[16px] bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] text-[18px] font-black text-white">{job.logoText}</div>
  }

  if (job.logoKind === 'letter') {
    return <div className="grid h-[58px] w-[58px] place-items-center rounded-[16px] bg-orange-50 text-[38px] font-black text-orange-500">{job.logoText.slice(0, 1)}</div>
  }

  return <div className="grid h-[58px] w-[58px] place-items-center rounded-full bg-[#2563EB] text-[18px] font-black text-white">{job.logoText}</div>
}

export function JobCard({ job, saved, view, onToggleSaved }: JobCardProps) {
  const grid = view === 'grid'

  return (
    <motion.article
      layout
      initial={{ y: 14, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`group rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-lg shadow-purple-100/20 transition duration-200 hover:shadow-xl hover:shadow-purple-100/30 ${grid ? 'min-h-[310px]' : 'min-h-[150px]'}`}
    >
      <div className={`grid gap-6 ${grid ? 'grid-cols-1' : 'lg:grid-cols-[120px_minmax(0,1fr)_310px]'}`}>
        <div className="flex items-center gap-4 lg:flex-col lg:items-center lg:justify-start">
          <CompanyLogo job={job} />
          <p className="text-center text-[14px] font-extrabold text-[#111827]">{job.company}</p>
        </div>

        <div className="min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-[24px] font-extrabold leading-tight tracking-[-0.01em] text-[#111827]">{job.title}</h2>
              <p className="mt-2 text-[15px] font-medium leading-6 text-[#475569]">{job.description}</p>
            </div>
            <button className="text-[#CBD5E1] transition hover:text-[#6D28D9] lg:hidden" aria-label={`More actions for ${job.title}`}><MoreVertical className="h-5 w-5" /></button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {job.skills.slice(0, 4).map((skill) => (
              <span key={skill} className="rounded-[8px] bg-[#F3F0FF] px-3 py-1.5 text-[13px] font-bold text-[#5B21B6]">{skill}</span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-7 text-[13px] font-bold text-[#64748B]">
            <span className="flex items-center gap-2 text-[#6D28D9]"><BriefcaseBusiness className="h-4 w-4" />{job.experience}</span>
            <span className="flex items-center gap-2"><Clock3 className="h-4 w-4" />{formatPostedTime(job.postedHoursAgo)}</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4" />{job.location}</span>
          </div>
        </div>

        <div className={`flex ${grid ? 'items-center justify-between border-t border-[#E5E7EB] pt-5' : 'items-center justify-end gap-6 border-l border-[#F1F5F9] pl-7'}`}>
          <div className={grid ? '' : 'w-[150px]'}>
            <p className="text-[18px] font-extrabold text-[#10B981]">{formatBudgetRange(job)}</p>
            <p className="mt-2 text-[14px] font-medium text-[#475569]">{job.type}</p>
          </div>
          <div className="flex items-center gap-5">
            <SavedButton saved={saved} onToggle={() => onToggleSaved(job.id)} label={job.title} />
            <Button href={`/jobs/${job.id}`} size="sm" className="h-[42px] w-[86px] rounded-[10px] bg-[#6D28D9] px-0 text-[14px] font-extrabold shadow-lg shadow-purple-100/20 transition group-hover:scale-[1.03] hover:bg-[#7C3AED]">Apply</Button>
            {!grid && <button className="text-[#CBD5E1] transition hover:text-[#6D28D9]" aria-label={`More actions for ${job.title}`}><MoreVertical className="h-5 w-5" /></button>}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
