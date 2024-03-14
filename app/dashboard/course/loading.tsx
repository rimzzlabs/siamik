import { Skeleton } from '#/components/ui/skeleton'

import { Loader2Icon } from 'lucide-react'
import { Fragment } from 'react'

export default function Loading() {
  return (
    <Fragment>
      <div className='flex gap-2'>
        <Skeleton className='w-full h-44 rounded-md' />
        <Skeleton className='w-full h-44 rounded-md' />
      </div>

      <Skeleton className='grid place-items-center h-[calc(60svh-var(--navbar-height))] mt-4 rounded-md'>
        <Loader2Icon size='3rem' className='animate-spin' />
        <span className='sr-only'>Memuat data</span>
      </Skeleton>
    </Fragment>
  )
}
