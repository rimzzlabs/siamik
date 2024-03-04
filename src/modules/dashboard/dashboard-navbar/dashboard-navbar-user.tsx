'use client'

import { Button } from '#/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { Separator } from '#/components/ui/separator'

import { uppercase } from '#/lib/utils'

import { Loader2Icon, LogOutIcon } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

export function DashboardNavbarUser() {
  const session = useSession()

  const isPending = session.status === 'loading' || session.status === 'unauthenticated'

  const user = session.data?.user

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isPending} asChild>
        <Button variant='ghost' size='icon'>
          {isPending && <Loader2Icon size='1rem' className='animate-spin' />}
          {!isPending && uppercase(user?.name.slice(0, 2) ?? '')}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>
          <p className='text-sm'>Halo, {user?.name}</p>
        </DropdownMenuLabel>
        <Separator className='mb-2 mt-1' />
        <DropdownMenuItem className='gap-2' onClick={() => signOut()}>
          <LogOutIcon size='0.875rem' />
          Keluar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
