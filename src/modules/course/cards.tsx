import { Card, CardHeader, CardTitle } from '#/components/ui/card'

import { courses, lecturers } from '#/mock/course'

import { LibraryBigIcon, Users2Icon } from 'lucide-react'
import { uid } from 'radash'

const items = [
  {
    id: uid(64),
    title: 'Jumlah Mata Kuliah',
    href: '/dashboard/course',
    count: courses.length,
    icon: LibraryBigIcon,
  },
  {
    id: uid(64),
    title: 'Jumlah Dosen',
    href: '/dashboard/lecturer',
    count: lecturers.length,
    icon: Users2Icon,
  },
]

export function CourseCards() {
  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(min(100%,14rem),1fr))] gap-2'>
      {items.map((item) => (
        <Card key={item.id} className='hover:border-primary transition'>
          <CardHeader>
            <div className='inline-flex items-center align-middle gap-1 text-xl lg:text-2xl'>
              <item.icon size='1em' />
              <span className='font-bold'>{item.count}</span>
            </div>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
