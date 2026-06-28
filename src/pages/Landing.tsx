import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { APP_NAME } from '@/utils/constants'

export function Landing() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-8 px-6">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">{APP_NAME}</h1>
        <p className="max-w-2xl text-slate-600">
          A modern freelancing platform connecting clients, freelancers, and admins in one
          workflow.
        </p>
      </div>
      <div className="flex gap-3">
        <Link to="/login">
          <Button>Login</Button>
        </Link>
        <Link to="/register">
          <Button variant="secondary">Create account</Button>
        </Link>
      </div>
    </main>
  )
}