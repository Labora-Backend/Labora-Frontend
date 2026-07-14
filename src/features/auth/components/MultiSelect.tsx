import { memo } from 'react'
import { Check } from 'lucide-react'

interface MultiSelectProps {
  label: string
  options: readonly string[]
  value: string[]
  onChange: (value: string[]) => void
  error?: string
  hint?: string
}

function MultiSelect({ label, options, value, onChange, error, hint }: MultiSelectProps) {
  const toggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((item) => item !== option))
    } else {
      onChange([...value, option])
    }
  }

  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium text-text">{label}</legend>
      <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
        {options.map((option) => {
          const selected = value.includes(option)
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => toggle(option)}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                selected
                  ? 'border-primary bg-primary-50 text-primary shadow-sm'
                  : 'border-slate-200 bg-white text-text-muted hover:border-primary/30 hover:text-text'
              }`}
            >
              {selected && <Check className="h-3 w-3" aria-hidden="true" />}
              {option}
            </button>
          )
        })}
      </div>
      {hint && !error && <p className="text-xs text-text-muted">{hint}</p>}
      {error && (
        <p className="text-xs text-rose-600" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  )
}

export default memo(MultiSelect)
