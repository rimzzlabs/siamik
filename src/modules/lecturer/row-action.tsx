'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '#/components/ui/dropdown-menu'

import { useConfirmation } from '#/hooks/use-confirmation'

import { useDeleteLecturer } from '#/queries/use-lecturer'
import type { AllLecturer } from '#/service/lecturer'

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { EyeIcon, MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function LecturerRowAction(props: AllLecturer[0]) {
  const router = useRouter()
  const mutation = useDeleteLecturer()
  const openConfirmation = useConfirmation.use.openConfirmation()

  const onClickUpdate = () => {
    router.push('/dashboard/lecturer/manage?lecturerId=' + props.id + '&type=update')
  }

  const onClickDelete = () =>
    openConfirmation({
      title: 'Hapus data ini?',
      confirmText: 'Ya, hapus',
      description: `Anda akan menghapus data dosen atas nama: ${props.name}, pastikan anda sudah yakin akan aksi penghapusan data ini`,
      onConfirm: (fns) => {
        fns.setPending()
        toast.promise(mutation.mutateAsync(props.id), {
          success: 'Berhasil menghapus data dosen',
          loading: 'Memproses permintaan, harap tunggu ...',
          finally: fns.closeConfirmation,
          error: (error) => error?.message ?? '',
        })
      },
    })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontalIcon size='1rem' />
        <span className='sr-only'>Opsi</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Opsi Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <EyeIcon size='0.875rem' className='mr-1' />
          Detail
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onClickUpdate}>
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
  )
}
