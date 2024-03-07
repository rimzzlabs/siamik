import { Button } from '#/components/ui/button'

import { DashboardSidebarItem } from './dashboard-sidebar-item'

import {
  LayoutDashboardIcon,
  LibraryBigIcon,
  Users2Icon,
  UsersIcon,
} from 'lucide-react'

const menuList = [
  { href: '/dashboard', text: 'Dashboard', icon: <LayoutDashboardIcon size='1em' /> },
  {
    href: '/dashboard/course',
    text: 'Mata Kuliah',
    icon: <LibraryBigIcon size='1em' />,
  },
]

export function DashboardSidebarAdmin() {
  return (
    <nav className='flex flex-col gap-1.5'>
      {menuList.map((item) => (
        <DashboardSidebarItem key={item.href} {...item} />
      ))}

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
