import { CheckCircle2, CircleAlert } from 'lucide-react'
import Skeleton from '@/components/ui/Skeleton'
import Button from '@/components/ui/Button'
import type { ProfileStrengthItem } from '@/features/freelancer/types/dashboard'

interface ProfileStrengthProps {
  percent?: number
  checklist: ProfileStrengthItem[]
  loading: boolean
}

export function ProfileStrength({ percent, checklist, loading }: ProfileStrengthProps) {
  if (loading) return <Skeleton className="h-[210px] rounded-[20px]" />

  const progress = percent ?? 0
  const angle = progress * 3.6

  return (
    <section className="rounded-[20px] border border-[#E2E8F0] min-h-[210px] bg-white p-5 shadow-lg shadow-purple-100/20">
      <h2 className="text-[16px] font-bold text-[#0F172A]">Profile Strength</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-[140px_minmax(0,1fr)] sm:items-center">
        <div className="mx-auto grid h-32 w-32 place-items-center rounded-full" style={{ background: `conic-gradient(#7C3AED ${angle}deg, #EDE9FE 0deg)` }}>
          <div className="grid h-24 w-24 place-items-center rounded-full bg-white text-center">
            <span className="text-2xl font-bold text-[#0F172A]">{percent === undefined ? '-' : `${percent}%`}</span>
            <span className="text-xs text-[#64748B]">Complete</span>
          </div>
        </div>
        <div className="space-y-3">
          {(checklist.length > 0 ? checklist : [{ label: 'Portfolio', completed: false }, { label: 'Certifications', completed: false }, { label: 'Skills', completed: false }, { label: 'Profile Photo', completed: false }]).map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-sm text-[#64748B]">
              {item.completed ? <CheckCircle2 className="h-4 w-4 text-[#10B981]" /> : <CircleAlert className="h-4 w-4 text-[#EF4444]" />}
              <span>{item.label}</span>
            </div>
          ))}
          <Button href="/freelancer/profile/setup" size="sm" className="mt-2 bg-[#7C3AED] hover:bg-[#6D28D9]">Complete Profile</Button>
        </div>
      </div>
    </section>
  )
}


