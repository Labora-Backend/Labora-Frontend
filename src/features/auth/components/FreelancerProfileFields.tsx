import { useRef } from 'react'
import { Upload } from 'lucide-react'
import { Controller, type Control, type FieldErrors, type UseFormRegister } from 'react-hook-form'
import AuthInput from '@/features/auth/components/AuthInput'
import AuthSelect from '@/features/auth/components/AuthSelect'
import AuthTextarea from '@/features/auth/components/AuthTextarea'
import TagInput from '@/features/auth/components/TagInput'
import { EXPERIENCE_LEVELS, SUGGESTED_SKILLS } from '@/features/auth/schemas/registerConstants'
import type { RegisterFormValues } from '@/features/auth/schemas/registerSchema'

interface FreelancerProfileFieldsProps {
  register: UseFormRegister<RegisterFormValues>
  control: Control<RegisterFormValues>
  errors: FieldErrors<RegisterFormValues>
}

function FreelancerProfileFields({ register, control, errors }: FreelancerProfileFieldsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="space-y-4">
      <AuthInput
        label="Professional Title"
        type="text"
        placeholder="Full Stack Developer"
        error={errors.professionalTitle?.message}
        {...register('professionalTitle')}
      />

      <AuthTextarea
        label="Bio"
        placeholder="Tell clients about your background and expertise"
        rows={3}
        error={errors.bio?.message}
        {...register('bio')}
      />

      <Controller
        name="skills"
        control={control}
        render={({ field }) => (
          <TagInput
            label="Skills"
            value={field.value ?? []}
            onChange={field.onChange}
            suggestions={SUGGESTED_SKILLS}
            hint="Press Enter to add a skill"
            error={errors.skills?.message}
          />
        )}
      />

      <AuthSelect
        label="Experience Level"
        placeholder="Select experience level"
        options={EXPERIENCE_LEVELS}
        error={errors.experienceLevel?.message}
        {...register('experienceLevel')}
      />

      <div className="space-y-1.5">
        <label htmlFor="hourlyRate" className="block text-sm font-medium text-text">
          Hourly Rate
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-text-muted">
            $
          </span>
          <input
            id="hourlyRate"
            type="number"
            min="0"
            step="0.01"
            placeholder="75.00"
            aria-invalid={errors.hourlyRate ? 'true' : 'false'}
            className={`w-full rounded-xl border bg-white py-2.5 pl-8 pr-4 text-sm text-text outline-none transition-all duration-300 placeholder:text-slate-400 ${
              errors.hourlyRate
                ? 'border-rose-300 focus:border-rose-400 focus:shadow-focus-input focus:ring-2 focus:ring-rose-100'
                : 'border-slate-200 hover:border-slate-300 focus:border-primary focus:shadow-focus-input focus:ring-2 focus:ring-primary/20'
            }`}
            {...register('hourlyRate')}
          />
        </div>
        {errors.hourlyRate && (
          <p className="text-xs text-rose-600" role="alert">
            {errors.hourlyRate.message}
          </p>
        )}
      </div>

      <AuthInput
        label="Portfolio URL"
        type="url"
        placeholder="https://yourportfolio.com"
        error={errors.portfolioUrl?.message}
        {...register('portfolioUrl')}
      />

      <AuthInput
        label="LinkedIn URL"
        type="url"
        placeholder="https://linkedin.com/in/username"
        error={errors.linkedinUrl?.message}
        {...register('linkedinUrl')}
      />

      <AuthInput
        label="GitHub URL"
        type="url"
        placeholder="https://github.com/username"
        error={errors.githubUrl?.message}
        {...register('githubUrl')}
      />

      <Controller
        name="profileImage"
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className="space-y-1.5">
            <span className="block text-sm font-medium text-text">Profile Image</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              id="profileImage"
              onChange={(e) => onChange(e.target.files?.[0])}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 bg-white px-4 py-3 text-sm text-text-muted transition-all duration-300 hover:border-primary/30 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
            >
              <Upload className="h-4 w-4" aria-hidden="true" />
              {value instanceof File ? value.name : 'Upload profile image (optional)'}
            </button>
          </div>
        )}
      />
    </div>
  )
}

export default FreelancerProfileFields
