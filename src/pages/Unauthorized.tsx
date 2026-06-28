import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

export function Unauthorized() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl font-semibold text-slate-900">Unauthorized</h1>
      <p className="text-slate-600">You do not have permission to access this page.</p>
      <Link to="/">
        <Button variant="secondary">Return home</Button>
      </Link>
    </main>
  )
}