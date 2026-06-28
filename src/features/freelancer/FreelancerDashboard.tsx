import { Badge } from '@/components/ui/Badge'
import { Table } from '@/components/ui/Table'

const rows = [
  { project: 'UI Revamp', status: 'Submitted', updated: '2h ago' },
  { project: 'Payment Module', status: 'Shortlisted', updated: '1d ago' },
]

export function FreelancerDashboard() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Freelancer Dashboard</h1>
        <p className="text-sm text-slate-500">Track active bids and ongoing work.</p>
      </header>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="mb-4 text-lg font-medium">Applications</h2>
        <Table
          columns={['Project', 'Status', 'Updated']}
          rows={rows.map((row) => [
            row.project,
            <Badge key={row.project} variant="success">
              {row.status}
            </Badge>,
            row.updated,
          ])}
        />
      </div>
    </section>
  )
}
