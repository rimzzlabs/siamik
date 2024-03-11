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
import { useProfile } from '#/queries/use-profile'

import { CogIcon, Loader2Icon, LogOutIcon, User2Icon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export function DashboardNavbarUserDropdown() {
  const query = useProfile()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={query.isPending} asChild>
        <Button variant='ghost' size='icon'>
          {query.isPending && <Loader2Icon size='1rem' className='animate-spin' />}
          {query.isSuccess && query.data.image ? (
            <Image
              src={query.data.image}
              alt={query.data.name}
              width={28}
              height={28}
              className='rounded-full'
            />
          ) : (
            uppercase(query.data?.name?.slice?.(0, 2) ?? '')
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>
          <p className='text-sm'>Halo, {query.data?.name}</p>
        </DropdownMenuLabel>
        <Separator className='mb-2 mt-1' />
        <DropdownMenuItem asChild className='gap-2'>
          <Link href='/dashboard/profile'>
            <User2Icon size='0.875rem' />
            Profil
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className='gap-2'>
          <CogIcon size='0.875rem' />
          Pengaturan
        </DropdownMenuItem>
        <Separator className='mb-2 mt-1' />
        <DropdownMenuItem className='gap-2' onClick={() => signOut()}>
          <LogOutIcon size='0.875rem' />
          Keluar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
