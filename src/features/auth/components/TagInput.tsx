import { memo, useState, type KeyboardEvent } from 'react'
import { X } from 'lucide-react'

interface TagInputProps {
  label: string
  value: string[]
  onChange: (value: string[]) => void
  suggestions?: readonly string[]
  error?: string
  hint?: string
  placeholder?: string
}

function TagInput({
  label,
  value,
  onChange,
  suggestions = [],
  error,
  hint,
  placeholder = 'Type and press Enter',
}: TagInputProps) {
  const [input, setInput] = useState('')

  const addTag = (tag: string) => {
    const trimmed = tag.trim()
    if (!trimmed || value.includes(trimmed)) return
    onChange([...value, trimmed])
    setInput('')
  }

  const removeTag = (tag: string) => {
    onChange(value.filter((item) => item !== tag))
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      addTag(input)
    } else if (event.key === 'Backspace' && !input && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  const unusedSuggestions = suggestions.filter((s) => !value.includes(s))

  return (
    <div className="space-y-2">
      <label htmlFor="skills-input" className="block text-sm font-medium text-text">
        {label}
      </label>
      <div
        className={`rounded-xl border bg-white px-3 py-2 transition-all duration-300 ${
          error
            ? 'border-rose-300 focus-within:border-rose-400 focus-within:ring-2 focus-within:ring-rose-100'
            : 'border-slate-200 hover:border-slate-300 focus-within:border-primary focus-within:shadow-focus-input focus-within:ring-2 focus-within:ring-primary/20'
        }`}
      >
        <div className="flex flex-wrap gap-1.5">
          {value.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-md bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="rounded text-primary/70 hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                aria-label={`Remove ${tag}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <input
            id="skills-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={value.length === 0 ? placeholder : ''}
            aria-invalid={error ? 'true' : 'false'}
            className="min-w-[120px] flex-1 border-0 bg-transparent py-1 text-sm text-text outline-none placeholder:text-slate-400"
          />
        </div>
      </div>
      {unusedSuggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          <span className="text-xs text-text-muted">Suggestions:</span>
          {unusedSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => addTag(suggestion)}
              className="rounded-md border border-slate-200 px-2 py-0.5 text-xs text-text-muted transition-colors duration-200 hover:border-primary/30 hover:text-primary"
            >
              + {suggestion}
            </button>
          ))}
        </div>
      )}
      {hint && !error && <p className="text-xs text-text-muted">{hint}</p>}
      {error && (
        <p className="text-xs text-rose-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default memo(TagInput)
