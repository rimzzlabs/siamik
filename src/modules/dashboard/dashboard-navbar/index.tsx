import { DashboardNavbarTheme } from './dashboard-navbar-theme'
import { DashboardNavbarUser } from './dashboard-navbar-user'

export function DashboardNavbar() {
  return (
    <header className='fixed top-0 inset-x-0 z-50'>
      <div className='flex items-center h-[var(--navbar-height)] px-4 border-b bg-background'>
        <p>Lapormik</p>

        <div className='inline-flex items-center gap-2 ml-auto'>
          <DashboardNavbarTheme />
          <DashboardNavbarUser />
        </div>
      </div>
    </header>
  )
}
