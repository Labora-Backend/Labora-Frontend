interface PasswordStrengthProps {
  password: string
}

interface StrengthLevel {
  label: 'Weak' | 'Medium' | 'Strong' | 'Very Strong' | ''
  score: number
  color: string
  textColor: string
}

function getStrength(password: string): StrengthLevel {
  if (!password) return { label: '', score: 0, color: 'bg-slate-200', textColor: 'text-text-muted' }

  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  if (password.length >= 12) score++

  if (score <= 2) {
    return { label: 'Weak', score: 1, color: 'bg-rose-500', textColor: 'text-rose-600' }
  }
  if (score <= 3) {
    return { label: 'Medium', score: 2, color: 'bg-amber-500', textColor: 'text-amber-600' }
  }
  if (score <= 4) {
    return { label: 'Strong', score: 3, color: 'bg-secondary', textColor: 'text-cyan-600' }
  }
  return { label: 'Very Strong', score: 4, color: 'bg-success', textColor: 'text-emerald-600' }
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength = getStrength(password)

  if (!password) return null

  return (
    <div className="space-y-2" aria-live="polite" aria-label="Password strength indicator">
      <div
        className="flex gap-1.5"
        role="progressbar"
        aria-valuenow={strength.score}
        aria-valuemin={0}
        aria-valuemax={4}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
            <div
              className={`h-full rounded-full transition-transform duration-200 ${strength.color} ${
                i < strength.score ? 'scale-x-100' : 'scale-x-0'
              } origin-left`}
            />
          </div>
        ))}
      </div>
      <p className="text-xs text-text-muted">
        Password strength:{' '}
        <span className={`font-semibold ${strength.textColor}`}>{strength.label}</span>
      </p>
    </div>
  )
}
