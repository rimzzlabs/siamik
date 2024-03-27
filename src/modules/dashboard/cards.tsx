'use client'

import { Button } from '#/components/ui/button'
import { Card, CardHeader, CardTitle } from '#/components/ui/card'

import { useDashboard } from '#/queries/use-dashboard'
import type { DashboardStatistics } from '#/service/dashboard'

import {
  ArrowUpRightFromSquareIcon,
  LibraryBigIcon,
  Users2Icon,
  UsersIcon,
} from 'lucide-react'
import Link from 'next/link'
import { uid } from 'radash'

export function DashboardCards(props: DashboardStatistics) {
  const query = useDashboard(props)

  const items = [
    {
      id: uid(64),
      title: 'Mata Kuliah',
      href: '/dashboard/course',
      count: query.data?.counter?.course ?? 0,
      icon: LibraryBigIcon,
    },
    {
      id: uid(64),
      title: 'Dosen',
      href: '/dashboard/lecturer',
      count: query.data?.counter?.lecturer ?? 0,
      icon: Users2Icon,
    },
    {
      id: uid(64),
      title: 'Mahasiswa',
      href: '/dashboard/student',
      count: query.data?.counter?.student ?? 0,
      icon: UsersIcon,
    },
  ]

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
