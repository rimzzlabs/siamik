'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '#/components/ui/dropdown-menu'

import { useConfirmation } from '#/hooks/use-confirmation'

import type { AllStudent } from '#/service/student'

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'
import { random, sleep } from 'radash'
import { Fragment } from 'react'
import { toast } from 'sonner'

export function StudentRowAction(props: AllStudent[0]) {
  const openConfirmation = useConfirmation.use.openConfirmation()

  const onClickDelete = () =>
    openConfirmation({
      title: 'Hapus data ini?',
      confirmText: 'Ya, hapus',
      description: `Anda akan menghapus data mahasiswa atas nama: ${props.name}, pastikan anda sudah yakin akan aksi penghapusan data ini`,
      onConfirm: async (fns) => {
        fns.setPending()
        await sleep(random(500, 1200))
        toast.success('Berhasil hapus (demo)')
        fns.closeConfirmation()
      },
    })

  return (
    <Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontalIcon size='1rem' />
          <span className='sr-only'>Opsi</span>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Opsi Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <PencilIcon size='0.875rem' className='mr-1' />
            Perbarui
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={onClickDelete}
            className='bg-destructive text-destructive-foreground data-[highlighted]:bg-destructive/80'
          >
            <Trash2Icon size='0.875rem' className='mr-1' />
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Fragment>
  )
}
