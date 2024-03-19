'use client'

import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '#/components/ui/dropdown-menu'

import { useConfirmation } from '#/hooks/use-confirmation'

import { uppercase } from '#/lib/utils'
import { useProfile } from '#/queries/use-profile'

import type { Role } from '@prisma/client'
import { CogIcon, Loader2Icon, LogOutIcon, User2Icon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

type TProps = {
  profile: { id: string; name: string; image: string | null; role: Role }
}

export function DashboardNavbarUserDropdown(props: TProps) {
  const query = useProfile(props.profile)
  const openConfirmation = useConfirmation.use.openConfirmation()

  const onOpenConfirmation = () =>
    openConfirmation({
      title: 'Yakin keluar?',
      description:
        'Apakah anda yakin ingin keluar? anda perlu memasukan password anda ketika ingin masuk kemabli',
      onConfirm: async (fns) => {
        fns.setPending()
        await signOut()
        fns.closeConfirmation()
      },
    })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={query.isPending}>
        {query.isPending && <Loader2Icon size='1rem' className='animate-spin' />}
        {query.isSuccess && query.data?.image ? (
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
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>
          <p className='text-sm'>Halo, {query.data?.name}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className='mb-2 mt-1' />

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
        <DropdownMenuSeparator className='mb-2 mt-1' />

        <DropdownMenuItem onClick={onOpenConfirmation} className='gap-2'>
          <LogOutIcon size='0.875rem' />
          Keluar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
