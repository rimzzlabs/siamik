import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function lowercase(text: string) {
  return text.toLowerCase()
}

export function uppercase(text: string) {
  return text.toUpperCase()
}

export function createDefaultFormValues<TObject extends object>(
  obj: Readonly<Array<keyof TObject>>,
) {
  return Object.entries(obj).reduce(
    (acc, [, key]) => {
      acc[key as keyof TObject] = ''
      return acc
    },
    // eslint-disable-next-line @typescript-eslint/ban-types
    {} as { [K in keyof TObject]: '' } & {},
  )
}
