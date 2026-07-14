import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { JobStatusSlice } from '@/features/client/types/dashboard'
import { ClientCard, ClientCardBody, ClientCardHeader } from '@/features/client/components/ClientCard'

interface JobStatusChartProps {
  data: JobStatusSlice[]
}

export default function JobStatusChart({ data }: JobStatusChartProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const total = data.reduce((sum, item) => sum + item.count, 0)

  return (
    <ClientCard hover={false} className="h-full">
      <ClientCardHeader title="Job Status" />
      <ClientCardBody>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto h-52 w-full max-w-[220px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={82}
                paddingAngle={3}
                animationDuration={800}
                isAnimationActive={isInView}
              >
                {data.map((entry) => (
                  <Cell key={entry.status} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 12px rgb(0 0 0 / 0.08)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-text">{total}</span>
            <span className="text-xs text-text-muted">Total Jobs</span>
          </div>
        </motion.div>

        <div className="mt-4 space-y-2.5">
          {data.map((item) => (
            <div key={item.status} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="flex-1 text-xs text-text-muted">{item.label}</span>
              <span className="text-xs font-semibold text-text">{item.count}</span>
              <span className="w-8 text-right text-xs text-text-muted">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </ClientCardBody>
    </ClientCard>
  )
}
