import { forwardRef, type TextareaHTMLAttributes } from 'react'

interface AuthTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  hint?: string
}

const AuthTextarea = forwardRef<HTMLTextAreaElement, AuthTextareaProps>(
  ({ label, error, hint, className = '', id, ...props }, ref) => {
    const textareaId = id ?? props.name

    return (
      <div className="space-y-1.5">
        <label htmlFor={textareaId} className="block text-sm font-medium text-text">
          {label}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
          className={`min-h-[96px] w-full resize-y rounded-xl border bg-white px-4 py-2.5 text-sm text-text outline-none transition-all duration-300 placeholder:text-slate-400 ${
            error
              ? 'border-rose-300 focus:border-rose-400 focus:shadow-focus-input focus:ring-2 focus:ring-rose-100'
              : 'border-slate-200 hover:border-slate-300 focus:border-primary focus:shadow-focus-input focus:ring-2 focus:ring-primary/20'
          } ${className}`}
          {...props}
        />
        {hint && !error && (
          <p id={`${textareaId}-hint`} className="text-xs text-text-muted">
            {hint}
          </p>
        )}
        {error && (
          <p id={`${textareaId}-error`} className="text-xs text-rose-600" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)

AuthTextarea.displayName = 'AuthTextarea'

export default AuthTextarea
