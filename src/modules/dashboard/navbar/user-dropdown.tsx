'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '#/components/ui/alert-dialog'
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

import type { Role } from '@prisma/client'
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog'
import { CogIcon, Loader2Icon, LogOutIcon, User2Icon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

type TProps = {
  profile: { id: string; name: string; email: string; image: string | null; role: Role }
}

export function DashboardNavbarUserDropdown(props: TProps) {
  const query = useProfile(props.profile)

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
        <DropdownMenuItem asChild>
          <AlertDialog>
            <AlertDialogTrigger className='w-full relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 gap-2'>
              <LogOutIcon size='0.875rem' />
              Keluar
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Yakin keluar?</AlertDialogTitle>
                <AlertDialogDescription>
                  Apakah anda yakin ingin keluar dari aplikasi?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batalkan</AlertDialogCancel>
                <AlertDialogAction onClick={() => signOut()}>Keluar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
