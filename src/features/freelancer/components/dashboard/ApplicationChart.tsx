import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import Skeleton from '@/components/ui/Skeleton'
import type { ApplicationStatusPoint } from '@/features/freelancer/types/dashboard'

interface ApplicationChartProps {
  data: ApplicationStatusPoint[]
  loading: boolean
}

export function ApplicationChart({ data, loading }: ApplicationChartProps) {
  if (loading) return <Skeleton className="h-[290px] rounded-[20px]" />

  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <section className="rounded-[20px] border border-[#E2E8F0] min-h-[290px] bg-white p-5 shadow-lg shadow-purple-100/20">
      <h2 className="text-[16px] font-bold text-[#0F172A]">Application Status</h2>
      
      <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,1fr)_180px] sm:items-center">
        <div className="relative h-[220px]">
          {total > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" innerRadius={62} outerRadius={88} paddingAngle={2} animationDuration={700}>
                  {data.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="grid h-full place-items-center rounded-[20px] border border-dashed border-[#E2E8F0] bg-[#F8FAFC] text-sm font-medium text-[#64748B]">No application data.</div>
          )}
          {total > 0 && (
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#0F172A]">{total}</p>
                <p className="text-xs text-[#64748B]">Total</p>
              </div>
            </div>
          )}
        </div>
        <div className="space-y-3">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-2 font-medium text-[#0F172A]"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />{item.name}</span>
              <span className="font-bold text-[#0F172A]">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


