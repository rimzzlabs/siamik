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
