import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Skeleton from '@/components/ui/Skeleton'
import type { EarningsPoint } from '@/features/freelancer/types/dashboard'
import { formatCurrency } from '@/features/freelancer/utils/dashboardData'

interface EarningsChartProps {
  data: EarningsPoint[]
  loading: boolean
}

export function EarningsChart({ data, loading }: EarningsChartProps) {
  if (loading) return <Skeleton className="h-[290px] rounded-[20px]" />

  return (
    <section className="rounded-[20px] border border-[#E2E8F0] min-h-[290px] bg-white p-5 shadow-lg shadow-purple-100/20">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[16px] font-bold text-[#0F172A]">Earnings Overview</h2>
          <div className="flex items-center gap-2 text-[12px] font-semibold text-[#334155]"><span className="h-2.5 w-2.5 rounded-full bg-[#7C3AED]" /> Earnings (₹)</div>
        </div>
        <select className="h-[32px] rounded-[8px] border border-[#E2E8F0] bg-white px-3 text-[12px] font-bold text-[#0F172A] outline-none focus:ring-2 focus:ring-[#7C3AED]/20" aria-label="Earnings range">
          <option>Last 6 Months</option>
        </select>
      </div>
      <div className="h-[220px]">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="earningsGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.32} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `${Number(value) / 1000}K`} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} contentStyle={{ borderRadius: 12, borderColor: '#E2E8F0' }} />
              <Area type="monotone" dataKey="earnings" stroke="#7C3AED" fill="url(#earningsGradient)" strokeWidth={3} dot={{ r: 4, fill: '#7C3AED' }} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="grid h-full place-items-center rounded-[20px] border border-dashed border-[#E2E8F0] bg-[#F8FAFC] text-sm font-medium text-[#64748B]">No earnings data available yet.</div>
        )}
      </div>
    </section>
  )
}


