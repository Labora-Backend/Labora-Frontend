import { Badge } from '@/components/ui/Badge'
import { Table } from '@/components/ui/Table'
import { formatCurrency } from '@/utils/currency'

const rows = [
  { title: 'Senior React Developer', budget: 1800, status: 'Open' },
  { title: 'Django API Integration', budget: 950, status: 'In Review' },
]

export function ClientDashboard() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Client Dashboard</h1>
        <p className="text-sm text-slate-500">Manage your posted projects and proposals.</p>
      </header>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="mb-4 text-lg font-medium">Recent jobs</h2>
        <Table
          columns={['Title', 'Budget', 'Status']}
          rows={rows.map((row) => [
            row.title,
            formatCurrency(row.budget),
            <Badge key={row.title} variant="info">
              {row.status}
            </Badge>,
          ])}
        />
      </div>
    </section>
  )
}
