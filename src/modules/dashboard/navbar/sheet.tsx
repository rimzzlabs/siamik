'use client'

import { Button } from '#/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '#/components/ui/sheet'
import { ToggleGroup, ToggleGroupItem } from '#/components/ui/toggle-group'

import { useMediaQuery } from '#/hooks/use-media-query'

import { DashboardMenu } from '../menu'

import { MenuIcon, MonitorSmartphoneIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

const toggleItems = [
  { value: 'light', text: 'Terang', icon: SunIcon },
  { value: 'dark', text: 'Gelap', icon: MoonIcon },
  { value: 'system', text: 'System', icon: MonitorSmartphoneIcon },
]

export function NavbarSheet() {
  const theme = useTheme()
  const isTabletOrDesktop = useMediaQuery('only screen and (min-width: 768px)')

  if (isTabletOrDesktop) return null

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='md:hidden'>
          <MenuIcon size='1rem' />
          <span className='sr-only'>Open Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent className='flex flex-col p-4'>
        <SheetHeader>
          <SheetTitle>SIAMIK - Menu</SheetTitle>
        </SheetHeader>

        <DashboardMenu insideSheet />

        <SheetFooter className='mt-auto'>
          <p className='sr-only'>Tema Aplikasi</p>
          <ToggleGroup
            type='single'
            value={theme.theme}
            onValueChange={(val) => {
              val && theme.setTheme(val)
            }}
            className='grid grid-cols-3'
          >
            {toggleItems.map((item) => (
              <ToggleGroupItem
                size='sm'
                className='gap-1'
                value={item.value}
                key={item.value}
              >
                {<item.icon size='1rem' className='shrink-0' />}
                {item.text}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
