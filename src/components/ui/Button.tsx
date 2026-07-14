import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'white' | 'white-outline' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps extends PropsWithChildren {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
}

interface ButtonAsButton extends ButtonBaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string
  onClick?: never
  type?: never
  disabled?: never
}

type ButtonProps = ButtonAsButton | ButtonAsLink

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white shadow-sm hover:bg-primary-dark hover:shadow-md active:scale-[0.98]',
  secondary:
    'bg-secondary text-white shadow-sm hover:bg-cyan-600 hover:shadow-md active:scale-[0.98]',
  outline:
    'border-2 border-primary bg-transparent text-primary hover:bg-primary-50 active:scale-[0.98]',
  ghost: 'bg-transparent text-text-muted hover:bg-slate-100 hover:text-text active:scale-[0.98]',
  white:
    'bg-white text-primary shadow-sm hover:bg-slate-50 hover:shadow-md active:scale-[0.98]',
  'white-outline':
    'border-2 border-white/80 bg-transparent text-white hover:bg-white/10 active:scale-[0.98]',
  danger: 'bg-rose-600 text-white hover:bg-rose-700 active:scale-[0.98]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

function buildClassName(variant: ButtonVariant, size: ButtonSize, fullWidth: boolean, className: string) {
  return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`.trim()
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const classes = buildClassName(variant, size, fullWidth, className)

  if ('href' in props && props.href) {
    return (
      <Link to={props.href} className={classes}>
        {children}
      </Link>
    )
  }

  const { href: _, ...buttonProps } = props as ButtonAsButton
  return (
    <button {...buttonProps} className={classes}>
      {children}
    </button>
  )
}

export default Button
