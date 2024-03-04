import { Button } from '#/components/ui/button'

import {
  CalendarDaysIcon,
  LayoutDashboardIcon,
  LibraryBigIcon,
  Users2Icon,
  UsersIcon,
} from 'lucide-react'
import Link from 'next/link'

export function DashboardSidebarAdmin() {
  return (
    <nav className='flex flex-col gap-1'>
      <Button className='w-full justify-normal gap-2' asChild>
        <Link href='/dashboard'>
          <LayoutDashboardIcon size='1rem' />
          Dashboard
        </Link>
      </Button>

      <Button className='w-full justify-normal gap-2' variant='ghost'>
        <CalendarDaysIcon size='1rem' />
        Jadwal
      </Button>
      <Button className='w-full justify-normal gap-2' variant='ghost'>
        <LibraryBigIcon size='1rem' />
        Mata Kuliah
      </Button>
      <Button className='w-full justify-normal gap-2' variant='ghost'>
        <Users2Icon size='1rem' />
        Dosen
      </Button>
      <Button className='w-full justify-normal gap-2' variant='ghost'>
        <UsersIcon size='1rem' />
        Mahasiswa
      </Button>
    </nav>
  )
}
