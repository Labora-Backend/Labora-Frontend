import { MoreHorizontal } from 'lucide-react'
import Skeleton from '@/components/ui/Skeleton'
import type { ActiveProject } from '@/features/freelancer/types/dashboard'
import { formatCurrency } from '@/features/freelancer/utils/dashboardData'

interface ActiveProjectsTableProps {
  projects: ActiveProject[]
  loading: boolean
}

const badgeClasses: Record<ActiveProject['status'], string> = {
  Completed: 'bg-blue-50 text-blue-700',
  'In Progress': 'bg-emerald-50 text-emerald-700',
  'Review Pending': 'bg-amber-50 text-amber-700',
}

export function ActiveProjectsTable({ projects, loading }: ActiveProjectsTableProps) {
  if (loading) return <Skeleton className="h-[285px] rounded-[20px]" />

  return (
    <section className="rounded-[20px] border border-[#E2E8F0] min-h-[285px] bg-white p-5 shadow-lg shadow-purple-100/20">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-[#0F172A]">Active Projects</h2>
        <a href="/freelancer/projects" className="text-sm font-semibold text-[#7C3AED] hover:underline">View All</a>
      </div>
      {projects.length > 0 ? (
        <>
          <div className="hidden overflow-hidden rounded-xl border border-[#E2E8F0] lg:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F8FAFC] text-xs uppercase tracking-wide text-[#64748B]">
                <tr>
                  {['Project', 'Client', 'Budget', 'Deadline', 'Status', 'Actions'].map((head) => <th key={head} className="px-4 py-3 font-bold">{head}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {projects.map((project) => (
                  <tr key={project.id} className="transition hover:bg-[#F8FAFC]">
                    <td className="px-4 py-3 font-semibold text-[#0F172A]">{project.project}</td>
                    <td className="px-4 py-3 text-[#64748B]">{project.client}</td>
                    <td className="px-4 py-3 font-semibold text-[#0F172A]">{formatCurrency(project.budget)}</td>
                    <td className="px-4 py-3 text-[#64748B]">{project.deadline ?? 'No deadline'}</td>
                    <td className="px-4 py-3"><span className={`rounded-full px-3 py-1 text-xs font-bold ${badgeClasses[project.status]}`}>{project.status}</span></td>
                    <td className="px-4 py-3"><button className="rounded-lg p-2 text-[#64748B] hover:bg-[#F3F4F6]" aria-label={`Open actions for ${project.project}`}><MoreHorizontal className="h-4 w-4" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-3 lg:hidden">
            {projects.map((project) => (
              <article key={project.id} className="rounded-xl border border-[#E2E8F0] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-[#0F172A]">{project.project}</p>
                    <p className="text-sm text-[#64748B]">{project.client}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${badgeClasses[project.status]}`}>{project.status}</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <span className="text-[#64748B]">Budget <b className="block text-[#0F172A]">{formatCurrency(project.budget)}</b></span>
                  <span className="text-[#64748B]">Deadline <b className="block text-[#0F172A]">{project.deadline ?? 'No deadline'}</b></span>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <div className="grid h-[210px] place-items-center rounded-[20px] border border-dashed border-[#E2E8F0] bg-[#F8FAFC] text-sm font-medium text-[#64748B]">No active project data available.</div>
      )}
    </section>
  )
}


