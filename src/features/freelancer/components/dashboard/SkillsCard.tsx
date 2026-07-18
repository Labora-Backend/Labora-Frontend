import { Plus } from 'lucide-react'
import Skeleton from '@/components/ui/Skeleton'

interface SkillsCardProps {
  skills: string[]
  loading: boolean
}

export function SkillsCard({ skills, loading }: SkillsCardProps) {
  if (loading) return <Skeleton className="h-[210px] rounded-[20px]" />

  return (
    <section className="rounded-[20px] border border-[#E2E8F0] min-h-[210px] bg-white p-5 shadow-lg shadow-purple-100/20">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-[#0F172A]">Skills</h2>
        <a href="/freelancer/profile/setup" className="text-sm font-semibold text-[#7C3AED] hover:underline">Edit Skills</a>
      </div>
      {skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => <span key={skill} className="rounded-xl bg-violet-50 px-3 py-2 text-sm font-semibold text-[#7C3AED]">{skill}</span>)}
          <a href="/freelancer/profile/setup" className="inline-flex items-center gap-1 rounded-xl border border-dashed border-[#C4B5FD] px-3 py-2 text-sm font-semibold text-[#7C3AED] hover:bg-violet-50"><Plus className="h-4 w-4" /> Add Skill</a>
        </div>
      ) : (
        <div className="grid h-36 place-items-center rounded-[20px] border border-dashed border-[#E2E8F0] bg-[#F8FAFC] text-center text-sm font-medium text-[#64748B]">Add skills to improve your profile matching.</div>
      )}
    </section>
  )
}


