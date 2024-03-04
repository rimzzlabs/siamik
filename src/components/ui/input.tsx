import { cn } from '#/lib/utils'

import { Button } from './button'

import { EyeIcon, EyeOffIcon } from 'lucide-react'
import * as React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background',
          'px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent',
          'file:text-sm file:font-medium placeholder:text-muted-foreground',
          'focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition',
          'focus-visible:ring-1 focus-visible:ring-primary',
          'aria-[invalid=true]:bg-destructive/10 aria-[invalid=true]:border-destructive',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

const InputPassword = React.forwardRef<HTMLInputElement, Omit<InputProps, 'type'>>(
  ({ className, ...props }, ref) => {
    const [inputType, setInputType] = React.useState<'password' | 'text'>('password')

    const toggle = () =>
      setInputType((prev) => (prev === 'password' ? 'text' : 'password'))

    return (
      <div className='relative'>
        <Input
          type={inputType}
          className={cn(className, 'pr-10')}
          ref={ref}
          {...props}
        />

        <Button
          onClick={toggle}
          type='button'
          variant='ghost'
          className='absolute right-0 top-0 p-0 w-10'
        >
          <span className='sr-only'>Reveal or hide password</span>
          {inputType === 'password' ? (
            <EyeOffIcon size='0.875rem' />
          ) : (
            <EyeIcon size='0.875rem' />
          )}
        </Button>
      </div>
    )
  },
)
InputPassword.displayName = 'InputPassword'

export { Input, InputPassword }
