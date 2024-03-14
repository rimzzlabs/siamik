import { getProfile } from '#/service/profile'

import { NavbarSheet } from './sheet'
import { DashboardNavbarThemeSwitch } from './theme-switch'
import { DashboardNavbarUserDropdown } from './user-dropdown'

export async function DashboardNavbar() {
  const profile = await getProfile()

  if (!profile) return null

  return (
    <header className='fixed top-0 inset-x-0 z-50 navbar'>
      <div className='flex items-center h-[var(--navbar-height)] lg:px-8 px-4 border-b bg-background'>
        <p className='text-lg lg:text-xl font-semibold'>Siamik</p>

        <div className='inline-flex items-center gap-2 ml-auto '>
          <DashboardNavbarThemeSwitch />
          <DashboardNavbarUserDropdown profile={profile} />
          <NavbarSheet />
        </div>
      </div>
    </header>
  )
}
