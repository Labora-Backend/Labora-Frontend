import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { startTransition, useCallback, useState } from 'react'
import { useForm, type UseFormSetError } from 'react-hook-form'
import { Link } from 'react-router-dom'
import type { ZodIssue } from 'zod'
import Button from '@/components/ui/Button'
import AuthInput from '@/features/auth/components/AuthInput'
import ClientProfileFields from '@/features/auth/components/ClientProfileFields'
import FreelancerProfileFields from '@/features/auth/components/FreelancerProfileFields'
import PasswordStrength from '@/features/auth/components/PasswordStrength'
import RegisterStepIndicator from '@/features/auth/components/RegisterStepIndicator'
import RoleSelector from '@/features/auth/components/RoleSelector'
import { useAuth } from '@/features/auth/hooks/useAuth'
import type { RegisterPayload } from '@/features/auth/types/auth'
import {
  registerSchema,
  step1Schema,
  step2ClientSchema,
  step2FreelancerSchema,
  step3Schema,
  CLIENT_FIELD_DEFAULTS,
  FREELANCER_FIELD_DEFAULTS,
  getRegisterFormDefaults,
  type RegisterFormValues,
} from '@/features/auth/schemas/registerSchema'

const fadeSlide = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
  transition: { duration: 0.25 },
}

function applyZodErrors(issues: ZodIssue[], setError: UseFormSetError<RegisterFormValues>) {
  issues.forEach((issue) => {
    const field = issue.path[0]
    if (typeof field === 'string') {
      setError(field as keyof RegisterFormValues, { message: issue.message })
    }
  })
}

function buildRegisterPayload(values: RegisterFormValues): RegisterPayload {
  const base = {
    fullName: values.fullName,
    username: values.username,
    email: values.email,
    password: values.password,
  }

  if (values.role === 'client') {
    return {
      ...base,
      role: 'client',
      companyName: values.companyName || undefined,
      industry: values.industry!,
      companySize: values.companySize || undefined,
      hiringNeeds: values.hiringNeeds ?? [],
      description: values.description || undefined,
    }
  }

  return {
    ...base,
    role: 'freelancer',
    professionalTitle: values.professionalTitle!,
    bio: values.bio || undefined,
    skills: values.skills ?? [],
    experienceLevel: values.experienceLevel!,
    hourlyRate: values.hourlyRate || undefined,
    portfolioUrl: values.portfolioUrl || undefined,
    linkedinUrl: values.linkedinUrl || undefined,
    githubUrl: values.githubUrl || undefined,
    profileImage: values.profileImage instanceof File ? values.profileImage : undefined,
  }
}

function clearRoleSpecificFields(
  role: RegisterFormValues['role'],
  setValue: ReturnType<typeof useForm<RegisterFormValues>>['setValue'],
) {
  const fieldsToClear = role === 'client' ? FREELANCER_FIELD_DEFAULTS : CLIENT_FIELD_DEFAULTS

  Object.entries(fieldsToClear).forEach(([field, value]) => {
    setValue(field as keyof RegisterFormValues, value, {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    })
  })
}

export default function RegisterForm() {
  const { register: registerUser, loading } = useAuth()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // React state is the source of truth for role UI rendering.
  // RHF cannot be relied on because shouldUnregister:true removes `role`
  // when step-1 unmounts, resetting it back to default `client` on step-2.
  const [selectedRole, setSelectedRole] = useState<RegisterFormValues['role']>('client')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: getRegisterFormDefaults('client'),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    shouldUnregister: true,
  })

  // Only watch password — avoids re-rendering the entire form on every keystroke.
  const password = watch('password')

  const getFormValuesWithRole = useCallback((): RegisterFormValues => {
    return { ...getValues(), role: selectedRole }
  }, [getValues, selectedRole])

  /**
   * Update role instantly for UI (low INP), then clear stale fields in a
   * transition so the click handler returns quickly.
   */
  const handleRoleChange = useCallback(
    (newRole: RegisterFormValues['role']) => {
      if (newRole === selectedRole) return

      setSelectedRole(newRole)
      setValue('role', newRole, { shouldValidate: false, shouldDirty: true })
      clearErrors()

      startTransition(() => {
        clearRoleSpecificFields(newRole, setValue)
      })
    },
    [clearErrors, selectedRole, setValue],
  )

  const validateStep = useCallback(
    (currentStep: 1 | 2 | 3): boolean => {
      clearErrors()
      setValue('role', selectedRole, { shouldValidate: false })
      const values = getFormValuesWithRole()

      if (currentStep === 1) {
        const result = step1Schema.safeParse(values)
        if (!result.success) {
          applyZodErrors(result.error.issues, setError)
          return false
        }
        return true
      }

      if (currentStep === 2) {
        const result =
          selectedRole === 'client'
            ? step2ClientSchema.safeParse(values)
            : step2FreelancerSchema.safeParse(values)
        if (!result.success) {
          applyZodErrors(result.error.issues, setError)
          return false
        }
        return true
      }

      const result = step3Schema.safeParse(values)
      if (!result.success) {
        applyZodErrors(result.error.issues, setError)
        return false
      }
      return true
    },
    [clearErrors, getFormValuesWithRole, selectedRole, setError, setValue],
  )

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => (prev === 3 ? 3 : ((prev + 1) as 1 | 2 | 3)))
    }
  }

  const handleBack = () => {
    clearErrors()
    setStep((prev) => (prev === 1 ? 1 : ((prev - 1) as 1 | 2 | 3)))
  }

  const onSubmit = async (values: RegisterFormValues) => {
    const merged = { ...values, role: selectedRole }
    if (!validateStep(3)) return

    setSubmitError(null)
    try {
      await registerUser(buildRegisterPayload(merged))
    } catch {
      setSubmitError('Unable to create account. Please try again.')
    }
  }

  const reviewValues = getFormValuesWithRole()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate aria-label="Registration form">
      <RegisterStepIndicator currentStep={step} />

      <div className="relative min-h-[200px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step-1" {...fadeSlide} className="space-y-4">
              <AuthInput
                label="Full Name"
                type="text"
                autoComplete="name"
                placeholder="John Doe"
                error={errors.fullName?.message}
                {...register('fullName')}
              />

              <AuthInput
                label="Username"
                type="text"
                autoComplete="username"
                placeholder="johndoe"
                hint="Letters, numbers, and underscores only"
                error={errors.username?.message}
                {...register('username')}
              />

              <AuthInput
                label="Email Address"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register('email')}
              />

              <div className="relative">
                <AuthInput
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Create a strong password"
                  error={errors.password?.message}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-[2.125rem] rounded-md text-text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              <PasswordStrength password={password} />

              <div className="relative">
                <AuthInput
                  label="Confirm Password"
                  type={showConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  className="absolute right-3 top-[2.125rem] rounded-md text-text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                  aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              <p className="rounded-xl bg-primary-50/60 px-3 py-2.5 text-xs leading-relaxed text-text-muted">
                You&apos;ll choose whether you&apos;re hiring or freelancing on the next step.
              </p>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step-2" {...fadeSlide} className="space-y-5">
              <div className="space-y-1">
                <h2 className="text-base font-semibold text-text">How will you use Labora?</h2>
                <p className="text-sm text-text-muted">
                  Pick a role below — the profile fields update instantly.
                </p>
              </div>

              <RoleSelector
                value={selectedRole}
                onChange={handleRoleChange}
                error={errors.role?.message}
              />

              <div className="border-t border-slate-100 pt-5">
                <p className="mb-4 text-sm font-medium text-text">
                  {selectedRole === 'client'
                    ? 'Client profile — tell us about your hiring needs'
                    : 'Freelancer profile — tell us about your expertise'}
                </p>

                {/* key={selectedRole} forces a clean remount when role changes */}
                <div key={selectedRole}>
                  {selectedRole === 'client' ? (
                    <ClientProfileFields
                      register={register}
                      control={control}
                      errors={errors}
                    />
                  ) : (
                    <FreelancerProfileFields
                      register={register}
                      control={control}
                      errors={errors}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step-3" {...fadeSlide} className="space-y-4">
              <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                <h3 className="text-sm font-semibold text-text">Review your details</h3>
                <dl className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-text-muted">Name</dt>
                    <dd className="font-medium text-text">{reviewValues.fullName}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-text-muted">Email</dt>
                    <dd className="font-medium text-text">{reviewValues.email}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-text-muted">Role</dt>
                    <dd className="font-medium capitalize text-text">{selectedRole}</dd>
                  </div>
                  {selectedRole === 'client' ? (
                    <>
                      {reviewValues.companyName && (
                        <div className="flex justify-between gap-4">
                          <dt className="text-text-muted">Company</dt>
                          <dd className="font-medium text-text">{reviewValues.companyName}</dd>
                        </div>
                      )}
                      <div className="flex justify-between gap-4">
                        <dt className="text-text-muted">Industry</dt>
                        <dd className="font-medium text-text">{reviewValues.industry}</dd>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between gap-4">
                        <dt className="text-text-muted">Title</dt>
                        <dd className="font-medium text-text">
                          {reviewValues.professionalTitle}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-text-muted">Skills</dt>
                        <dd className="max-w-[60%] text-right font-medium text-text">
                          {reviewValues.skills?.join(', ')}
                        </dd>
                      </div>
                    </>
                  )}
                </dl>
              </div>

              <div className="space-y-1.5">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-primary transition-colors focus:ring-2 focus:ring-primary/20"
                    aria-invalid={errors.acceptTerms ? 'true' : 'false'}
                    {...register('acceptTerms')}
                  />
                  <span className="text-sm leading-relaxed text-text-muted">
                    I agree to the{' '}
                    <Link
                      to="/terms"
                      className="font-medium text-primary hover:text-primary-dark hover:underline"
                    >
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link
                      to="/privacy"
                      className="font-medium text-primary hover:text-primary-dark hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.acceptTerms && (
                  <p className="text-xs text-rose-600" role="alert">
                    {errors.acceptTerms.message}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {submitError && (
        <p className="rounded-xl bg-rose-50 px-3 py-2.5 text-sm text-rose-600" role="alert">
          {submitError}
        </p>
      )}

      <div className="flex gap-3">
        {step > 1 && (
          <Button type="button" variant="outline" fullWidth onClick={handleBack}>
            Back
          </Button>
        )}

        {step < 3 ? (
          <Button type="button" variant="primary" fullWidth onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Creating account...
              </span>
            ) : (
              'Create Account'
            )}
          </Button>
        )}
      </div>

      <p className="text-center text-sm text-text-muted">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-semibold text-primary transition-colors hover:text-primary-dark hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  )
}
