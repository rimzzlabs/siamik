'use client'

import { Button } from '#/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'

import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { match } from 'ts-pattern'

const dropdownItems = [
  { text: 'Terang', value: 'light' },
  { text: 'Gelap', value: 'dark' },
  { text: 'Sistem', value: 'system' },
]

export function DashboardNavbarTheme() {
  const { setTheme, resolvedTheme } = useTheme()

  const updateTheme = (newTheme: string) => setTheme(newTheme)

  const icon = match(resolvedTheme)
    .with('dark', () => <MoonIcon size='1rem' />)
    .otherwise(() => <SunIcon size='1rem' />)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='ghost'>
          {icon}
          <span className='sr-only'>Pilih Tema</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        {dropdownItems.map((item) => (
          <DropdownMenuItem key={item.value} onClick={() => updateTheme(item.value)}>
            {item.text}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
