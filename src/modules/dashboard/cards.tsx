import { Button } from '#/components/ui/button'
import { Card, CardHeader, CardTitle } from '#/components/ui/card'

import {
  ArrowUpRightFromSquareIcon,
  LibraryBigIcon,
  Users2Icon,
  UsersIcon,
} from 'lucide-react'
import Link from 'next/link'
import { random, uid } from 'radash'

const items = [
  {
    id: uid(64),
    title: 'Mata Kuliah',
    href: '/dashboard/course',
    count: random(10, 150),
    icon: LibraryBigIcon,
  },
  {
    id: uid(64),
    title: 'Dosen',
    href: '/dashboard/lecturer',
    count: random(10, 100),
    icon: Users2Icon,
  },
  {
    id: uid(64),
    title: 'Mahasiswa',
    href: '/dashboard/student',
    count: random(100, 200),
    icon: UsersIcon,
  },
]

export function DashboardCards() {
  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(min(100%,14rem),1fr))] gap-2'>
      {items.map((item) => (
        <Card key={item.id} className='hover:border-primary transition'>
          <CardHeader>
            <div className='inline-flex items-center align-middle gap-1 text-xl lg:text-2xl'>
              <item.icon size='1em' />
              <span className='font-bold'>{item.count}</span>

              <Button variant='ghost' size='icon' className='ml-auto' asChild>
                <Link href={item.href}>
                  <ArrowUpRightFromSquareIcon size='1rem' />
                  <span className='sr-only'>Kelola {item.title}</span>
                </Link>
              </Button>
            </div>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
