import { Button } from '#/components/ui/button'
import {
  Sheet,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetContent,
  SheetFooter,
} from '#/components/ui/sheet'

import { DashboardMenu } from '../menu'
import { DashboardNavbarSignOutButton } from './signout-button'
import { DashboardNavbarThemeSwitch } from './theme-switch'
import { DashboardNavbarUserDropdown } from './user-dropdown'

import { MenuIcon } from 'lucide-react'

export function DashboardNavbar() {
  return (
    <header className='fixed top-0 inset-x-0 z-50'>
      <div className='flex items-center h-[var(--navbar-height)] lg:px-8 px-4 border-b bg-background'>
        <p className='text-lg lg:text-xl font-semibold'>Siamik</p>

        <div className='items-center gap-2 ml-auto hidden md:inline-flex'>
          <DashboardNavbarThemeSwitch />
          <DashboardNavbarUserDropdown />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant='ghost' size='icon' className='md:hidden ml-auto'>
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
              <DashboardNavbarSignOutButton />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
