import { forwardRef, type SelectHTMLAttributes } from 'react'

interface AuthSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  hint?: string
  placeholder?: string
  options: readonly string[]
}

const AuthSelect = forwardRef<HTMLSelectElement, AuthSelectProps>(
  ({ label, error, hint, placeholder, options, className = '', id, ...props }, ref) => {
    const selectId = id ?? props.name

    return (
      <div className="space-y-1.5">
        <label htmlFor={selectId} className="block text-sm font-medium text-text">
          {label}
        </label>
        <select
          ref={ref}
          id={selectId}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
          className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-text outline-none transition-all duration-300 ${
            error
              ? 'border-rose-300 focus:border-rose-400 focus:shadow-focus-input focus:ring-2 focus:ring-rose-100'
              : 'border-slate-200 hover:border-slate-300 focus:border-primary focus:shadow-focus-input focus:ring-2 focus:ring-primary/20'
          } ${!props.value ? 'text-slate-400' : ''} ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option} value={option} className="text-text">
              {option}
            </option>
          ))}
        </select>
        {hint && !error && (
          <p id={`${selectId}-hint`} className="text-xs text-text-muted">
            {hint}
          </p>
        )}
        {error && (
          <p id={`${selectId}-error`} className="text-xs text-rose-600" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)

AuthSelect.displayName = 'AuthSelect'

export default AuthSelect
