import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { JobOverviewPoint } from '@/features/client/types/dashboard'
import { ClientCard, ClientCardBody, ClientCardHeader } from '@/features/client/components/ClientCard'

const PERIODS = ['Last 6 Months', 'Last 3 Months', 'Last Year'] as const

interface JobOverviewChartProps {
  data: JobOverviewPoint[]
}

export default function JobOverviewChart({ data }: JobOverviewChartProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [period, setPeriod] = useState<(typeof PERIODS)[number]>('Last 6 Months')

  return (
    <ClientCard hover={false} className="h-full">
      <ClientCardHeader
        title="Job Overview"
        action={
          <div className="relative">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as (typeof PERIODS)[number])}
              className="appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-text-muted outline-none transition-colors hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20"
              aria-label="Select time period"
            >
              {PERIODS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-muted" />
          </div>
        }
      />
      <ClientCardBody>
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="h-72 w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748B', fontSize: 12 }}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 12px rgb(0 0 0 / 0.08)',
                }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
              />
              <Line
                type="monotone"
                dataKey="open"
                name="Open Jobs"
                stroke="#7C3AED"
                strokeWidth={2.5}
                dot={{ fill: '#7C3AED', r: 4 }}
                activeDot={{ r: 6 }}
                animationDuration={800}
                isAnimationActive={isInView}
              />
              <Line
                type="monotone"
                dataKey="inProgress"
                name="In Progress"
                stroke="#06B6D4"
                strokeWidth={2.5}
                dot={{ fill: '#06B6D4', r: 4 }}
                activeDot={{ r: 6 }}
                animationDuration={800}
                isAnimationActive={isInView}
              />
              <Line
                type="monotone"
                dataKey="completed"
                name="Completed"
                stroke="#10B981"
                strokeWidth={2.5}
                dot={{ fill: '#10B981', r: 4 }}
                activeDot={{ r: 6 }}
                animationDuration={800}
                isAnimationActive={isInView}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </ClientCardBody>
    </ClientCard>
  )
}
