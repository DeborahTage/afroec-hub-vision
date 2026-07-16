import * as React from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: 'default' | 'icon'
}

export function Button({ className, variant = 'primary', size = 'default', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn('btn', `btn-${variant}`, size === 'icon' && 'btn-icon', className)}
      {...props}
    />
  )
}
