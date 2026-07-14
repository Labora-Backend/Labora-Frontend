import { z } from 'zod'
import {
  COMPANY_SIZES,
  EXPERIENCE_LEVELS,
  INDUSTRIES,
} from '@/features/auth/schemas/registerConstants'

const optionalUrl = z
  .string()
  .optional()
  .refine((val) => !val || val === '' || z.string().url().safeParse(val).success, {
    message: 'Please enter a valid URL',
  })

const accountBase = {
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Full name must be at least 2 characters'),
  username: z
    .string()
    .min(1, 'Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be at most 30 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Include at least one uppercase letter')
    .regex(/[a-z]/, 'Include at least one lowercase letter')
    .regex(/[0-9]/, 'Include at least one number'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  role: z.enum(['client', 'freelancer'], {
    message: 'Please select an account type',
  }),
  acceptTerms: z.boolean(),
  companyName: z.string().optional(),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  hiringNeeds: z.array(z.string()),
  description: z.string().optional(),
  professionalTitle: z.string().optional(),
  bio: z.string().optional(),
  skills: z.array(z.string()),
  experienceLevel: z.string().optional(),
  hourlyRate: z.string().optional(),
  portfolioUrl: optionalUrl,
  linkedinUrl: optionalUrl,
  githubUrl: optionalUrl,
  profileImage: z.custom<File | undefined>().optional(),
}

export const registerSchema = z
  .object(accountBase)
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })
  .superRefine((data, ctx) => {
    if (data.role === 'client') {
      if (!data.industry) {
        ctx.addIssue({
          code: 'custom',
          path: ['industry'],
          message: 'Industry is required',
        })
      } else if (!INDUSTRIES.includes(data.industry as (typeof INDUSTRIES)[number])) {
        ctx.addIssue({
          code: 'custom',
          path: ['industry'],
          message: 'Please select a valid industry',
        })
      }
    }

    if (data.role === 'freelancer') {
      if (!data.professionalTitle?.trim()) {
        ctx.addIssue({
          code: 'custom',
          path: ['professionalTitle'],
          message: 'Professional title is required',
        })
      }
      if (!data.skills || data.skills.length < 1) {
        ctx.addIssue({
          code: 'custom',
          path: ['skills'],
          message: 'At least one skill is required',
        })
      }
      if (!data.experienceLevel) {
        ctx.addIssue({
          code: 'custom',
          path: ['experienceLevel'],
          message: 'Experience level is required',
        })
      } else if (
        !EXPERIENCE_LEVELS.includes(data.experienceLevel as (typeof EXPERIENCE_LEVELS)[number])
      ) {
        ctx.addIssue({
          code: 'custom',
          path: ['experienceLevel'],
          message: 'Please select a valid experience level',
        })
      }
    }
  })

export const step1Schema = z
  .object({
    fullName: accountBase.fullName,
    username: accountBase.username,
    email: accountBase.email,
    password: accountBase.password,
    confirmPassword: accountBase.confirmPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

export const step2ClientSchema = z.object({
  industry: z.string().min(1, 'Industry is required'),
  companyName: z.string().optional(),
  companySize: z
    .string()
    .optional()
    .refine((val) => !val || COMPANY_SIZES.includes(val as (typeof COMPANY_SIZES)[number]), {
      message: 'Please select a valid company size',
    }),
  hiringNeeds: z.array(z.string()),
  description: z.string().optional(),
})

export const step2FreelancerSchema = z.object({
  professionalTitle: z.string().min(1, 'Professional title is required'),
  bio: z.string().optional(),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  experienceLevel: z.string().min(1, 'Experience level is required'),
  hourlyRate: z.string().optional(),
  portfolioUrl: optionalUrl,
  linkedinUrl: optionalUrl,
  githubUrl: optionalUrl,
  profileImage: z.custom<File | undefined>().optional(),
})

export const step3Schema = z.object({
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
})

export type RegisterFormValues = z.infer<typeof registerSchema>

/** Default values for client-only step-2 fields — cleared when switching to freelancer */
export const CLIENT_FIELD_DEFAULTS = {
  companyName: '',
  industry: '',
  companySize: '',
  hiringNeeds: [] as string[],
  description: '',
} as const satisfies Partial<RegisterFormValues>

/** Default values for freelancer-only step-2 fields — cleared when switching to client */
export const FREELANCER_FIELD_DEFAULTS = {
  professionalTitle: '',
  bio: '',
  skills: [] as string[],
  experienceLevel: '',
  hourlyRate: '',
  portfolioUrl: '',
  linkedinUrl: '',
  githubUrl: '',
  profileImage: undefined as File | undefined,
} as const satisfies Partial<RegisterFormValues>

/** Shared step-1 defaults */
export const REGISTER_COMMON_DEFAULTS = {
  fullName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
} as const satisfies Partial<RegisterFormValues>

/** Full form defaults for a given role — used by useForm and reset() */
export function getRegisterFormDefaults(
  role: RegisterFormValues['role'] = 'client',
): RegisterFormValues {
  return {
    ...REGISTER_COMMON_DEFAULTS,
    role,
    ...CLIENT_FIELD_DEFAULTS,
    ...FREELANCER_FIELD_DEFAULTS,
  }
}

/**
 * Preserve step-1 (and step-3) values while wiping the previous role's
 * profile fields and applying fresh defaults for the newly selected role.
 */
export function getValuesAfterRoleSwitch(
  current: RegisterFormValues,
  newRole: RegisterFormValues['role'],
): RegisterFormValues {
  return {
    fullName: current.fullName,
    username: current.username,
    email: current.email,
    password: current.password,
    confirmPassword: current.confirmPassword,
    acceptTerms: current.acceptTerms,
    role: newRole,
    ...CLIENT_FIELD_DEFAULTS,
    ...FREELANCER_FIELD_DEFAULTS,
  }
}

export const STEP1_FIELDS = [
  'fullName',
  'username',
  'email',
  'password',
  'confirmPassword',
] as const satisfies readonly (keyof RegisterFormValues)[]

export const STEP2_CLIENT_FIELDS = [
  'companyName',
  'industry',
  'companySize',
  'hiringNeeds',
  'description',
] as const satisfies readonly (keyof RegisterFormValues)[]

export const STEP2_FREELANCER_FIELDS = [
  'professionalTitle',
  'bio',
  'skills',
  'experienceLevel',
  'hourlyRate',
  'portfolioUrl',
  'linkedinUrl',
  'githubUrl',
  'profileImage',
] as const satisfies readonly (keyof RegisterFormValues)[]

export const STEP3_FIELDS = ['acceptTerms'] as const satisfies readonly (keyof RegisterFormValues)[]
