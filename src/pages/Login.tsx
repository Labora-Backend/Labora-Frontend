import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useAppDispatch } from '@/app/store'
import { setCredentials } from '@/app/store/authSlice'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { login } from '@/services/api/auth.api'
import type { UserRole } from '@/types/auth'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginForm = z.infer<typeof loginSchema>

export function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (values: LoginForm) => {
    const response = await login(values)
    dispatch(setCredentials(response))
    const rolePath: Record<UserRole, string> = {
      client: '/client/dashboard',
      freelancer: '/freelancer/dashboard',
      admin: '/admin/dashboard',
    }
    navigate(rolePath[response.user.role])
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4 rounded-xl bg-white p-6 shadow">
        <h1 className="text-2xl font-semibold">Login</h1>
        <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
        <Input
          label="Password"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />
        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>
        <p className="text-sm text-slate-500">
          New to Labora?{' '}
          <Link to="/register" className="text-brand-600">
            Create an account
          </Link>
        </p>
      </form>
    </main>
  )
}