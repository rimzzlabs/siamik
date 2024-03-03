import { Button } from '@/components/ui/button'

import { FileArchiveIcon, LayoutDashboardIcon, Users2Icon } from 'lucide-react'
import Link from 'next/link'

export function DashboardSidebar() {
  return (
    <aside className='fixed top-[calc(var(--navbar-height))] bottom-0 left-0 z-50 border-r bg-background'>
      <div className='w-[var(--sidebar-width)] h-full p-4'>
        <nav className='flex flex-col gap-2'>
          <Button className='w-full justify-normal gap-2' asChild>
            <Link href='/dashboard'>
              <LayoutDashboardIcon size='1rem' />
              Dashboard
            </Link>
          </Button>

          <Button className='w-full justify-normal gap-2' variant='ghost'>
            <FileArchiveIcon size='1rem' />
            Laporan
          </Button>
          <Button className='w-full justify-normal gap-2' variant='ghost'>
            <Users2Icon size='1rem' />
            Pengguna
          </Button>
        </nav>
      </div>
    </aside>
  )
}
