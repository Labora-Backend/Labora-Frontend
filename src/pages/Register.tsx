import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useAppDispatch } from '@/app/store'
import { setCredentials } from '@/app/store/authSlice'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { register as registerUser } from '@/services/api/auth.api'
import type { UserRole } from '@/types/auth'

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['client', 'freelancer']),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

type RegisterForm = z.infer<typeof registerSchema>

export function Register() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'client',
    },
  })

  const onSubmit = async (values: RegisterForm) => {
    const response = await registerUser({
      name: values.name,
      email: values.email,
      password: values.password,
      role: values.role,
    })
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
        <h1 className="text-2xl font-semibold">Register</h1>
        <Input label="Name" {...register('name')} error={errors.name?.message} />
        <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
        <Input
          label="Password"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />
        <Input
          label="Confirm password"
          type="password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
        <label className="block space-y-1">
          <span className="text-sm font-medium text-slate-700">Account type</span>
          <select
            {...register('role')}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          >
            <option value="client">Client</option>
            <option value="freelancer">Freelancer</option>
          </select>
        </label>
        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </Button>
        <p className="text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-600">
            Sign in
          </Link>
        </p>
      </form>
    </main>
  )
}