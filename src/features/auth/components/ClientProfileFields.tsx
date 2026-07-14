import { Controller, type Control, type FieldErrors, type UseFormRegister } from 'react-hook-form'
import AuthInput from '@/features/auth/components/AuthInput'
import AuthSelect from '@/features/auth/components/AuthSelect'
import AuthTextarea from '@/features/auth/components/AuthTextarea'
import MultiSelect from '@/features/auth/components/MultiSelect'
import {
  COMPANY_SIZES,
  HIRING_NEEDS,
  INDUSTRIES,
} from '@/features/auth/schemas/registerConstants'
import type { RegisterFormValues } from '@/features/auth/schemas/registerSchema'

interface ClientProfileFieldsProps {
  register: UseFormRegister<RegisterFormValues>
  control: Control<RegisterFormValues>
  errors: FieldErrors<RegisterFormValues>
}

function ClientProfileFields({ register, control, errors }: ClientProfileFieldsProps) {
  return (
    <div className="space-y-4">
      <AuthInput
        label="Company Name"
        type="text"
        autoComplete="organization"
        placeholder="Acme Inc. (optional)"
        error={errors.companyName?.message}
        {...register('companyName')}
      />

      <AuthSelect
        label="Industry"
        placeholder="Select industry"
        options={INDUSTRIES}
        error={errors.industry?.message}
        {...register('industry')}
      />

      <AuthSelect
        label="Company Size"
        placeholder="Select company size"
        options={COMPANY_SIZES}
        error={errors.companySize?.message}
        {...register('companySize')}
      />

      <Controller
        name="hiringNeeds"
        control={control}
        render={({ field }) => (
          <MultiSelect
            label="Hiring Needs"
            options={HIRING_NEEDS}
            value={field.value ?? []}
            onChange={field.onChange}
            hint="Select all areas where you need talent"
            error={errors.hiringNeeds?.message}
          />
        )}
      />

      <AuthTextarea
        label="Short Description"
        placeholder="Describe your company or hiring needs"
        rows={3}
        error={errors.description?.message}
        {...register('description')}
      />
    </div>
  )
}

export default ClientProfileFields
