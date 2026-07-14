import { memo } from 'react'

interface RegisterStepIndicatorProps {
  currentStep: 1 | 2 | 3
}

const STEPS = [
  { number: 1, label: 'Account Details' },
  { number: 2, label: 'Role & Profile' },
  { number: 3, label: 'Complete Registration' },
] as const

function RegisterStepIndicator({ currentStep }: RegisterStepIndicatorProps) {
  return (
    <nav aria-label="Registration progress" className="mb-6">
      <ol className="flex items-center justify-between gap-2">
        {STEPS.map((step, index) => {
          const isActive = step.number === currentStep
          const isComplete = step.number < currentStep

          return (
            <li key={step.number} className="flex flex-1 items-center">
              <div className="flex w-full flex-col items-center gap-1.5">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-white shadow-glow-primary-sm'
                      : isComplete
                        ? 'bg-primary-50 text-primary'
                        : 'bg-slate-100 text-text-muted'
                  }`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {step.number}
                </div>
                <span
                  className={`hidden text-center text-[10px] font-medium leading-tight sm:block ${
                    isActive ? 'text-primary' : isComplete ? 'text-text' : 'text-text-muted'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`mx-1 hidden h-px flex-1 sm:block ${
                    step.number < currentStep ? 'bg-primary/40' : 'bg-slate-200'
                  }`}
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default memo(RegisterStepIndicator)
