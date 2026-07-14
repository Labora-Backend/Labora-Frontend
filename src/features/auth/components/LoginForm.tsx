import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import AuthInput from '@/features/auth/components/AuthInput'
import SocialLoginButtons from '@/features/auth/components/SocialLoginButtons'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { loginSchema, type LoginFormValues } from '@/features/auth/schemas/loginSchema'

export default function LoginForm() {
  const { login, loading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: '', password: '', rememberMe: false },
  })

  const onSubmit = async (values: LoginFormValues) => {
    setSubmitError(null)
    try {
      await login(values)
    } catch {
      setSubmitError('Invalid credentials. Please check your email/username and password.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <AuthInput
        label="Email or Username"
        type="text"
        autoComplete="username"
        placeholder="you@example.com"
        error={errors.identifier?.message}
        {...register('identifier')}
      />

      <div className="relative">
        <AuthInput
          label="Password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register('password')}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[2.125rem] text-text-muted transition-colors hover:text-text"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/20"
            {...register('rememberMe')}
          />
          <span className="text-sm text-text-muted">Remember me</span>
        </label>
        <Link
          to="/forgot-password"
          className="text-sm font-medium text-primary transition-colors hover:text-primary-dark"
        >
          Forgot password?
        </Link>
      </div>

      {submitError && (
        <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600" role="alert">
          {submitError}
        </p>
      )}

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
        <Button type="submit" variant="primary" fullWidth disabled={loading}>
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in...
            </span>
          ) : (
            'Sign In'
          )}
        </Button>
      </motion.div>

      <SocialLoginButtons />

      <p className="text-center text-xs text-text-muted">
        By continuing, you agree to our{' '}
        <Link to="/terms" className="font-medium text-primary hover:underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link to="/privacy" className="font-medium text-primary hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  )
}
