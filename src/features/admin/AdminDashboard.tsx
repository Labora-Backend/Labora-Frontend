import { Badge } from '@/components/ui/Badge'

export function AdminDashboard() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="text-sm text-slate-500">Platform oversight and moderation controls.</p>
      </header>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="mb-3 text-lg font-medium">System status</h2>
        <div className="flex items-center gap-3">
          <Badge variant="success">Healthy</Badge>
          <span className="text-sm text-slate-600">Core services are operational.</span>
        </div>
      </div>
    </section>
  )
}
