import { forwardRef, type InputHTMLAttributes } from 'react'

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, hint, className = '', id, ...props }, ref) => {
    const inputId = id ?? props.name

    return (
      <div className="space-y-1.5">
        <label htmlFor={inputId} className="block text-sm font-medium text-text">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-text outline-none transition-all duration-300 placeholder:text-slate-400 ${
            error
              ? 'border-rose-300 focus:border-rose-400 focus:shadow-focus-input focus:ring-2 focus:ring-rose-100'
              : 'border-slate-200 hover:border-slate-300 focus:border-primary focus:shadow-focus-input focus:ring-2 focus:ring-primary/20'
          } ${className}`}
          {...props}
        />
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-text-muted">
            {hint}
          </p>
        )}
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-rose-600" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)

AuthInput.displayName = 'AuthInput'

export default AuthInput
