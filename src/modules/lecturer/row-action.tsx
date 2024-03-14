'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '#/components/ui/alert-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '#/components/ui/dropdown-menu'
import { Separator } from '#/components/ui/separator'

import { formatLongDate } from '#/lib/date'
import { useDeleteLecturer } from '#/queries/use-lecturer'
import type { AllLecturer } from '#/service/lecturer'

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import {
  EyeIcon,
  Loader2Icon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Fragment, useState } from 'react'
import { toast } from 'sonner'

export function LecturerRowAction(props: AllLecturer[0]) {
  const router = useRouter()
  const mutation = useDeleteLecturer()
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false)

  const onClickUpdate = () => {
    router.push('/dashboard/lecturer/update/' + props.id)
  }

  const onClickDelete = () => {
    toast.promise(mutation.mutateAsync(props.id), {
      loading: 'Memproses, harap tunggu ...',
      success: 'Berhasil menghapus data dosen!',
      error: (err) =>
        err?.message ?? 'Gagal menghapus data Dosen, harap coba beberapa saat lagi',
    })
  }

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
            <EyeIcon size='0.875rem' className='mr-1' />
            Detail
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onClickUpdate}>
            <PencilIcon size='0.875rem' className='mr-1' />
            Perbarui
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setDeleteAlertOpen(true)}
            className='bg-destructive text-destructive-foreground data-[highlighted]:bg-destructive/80'
          >
            <Trash2Icon size='0.875rem' className='mr-1' />
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={deleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Yakin hapus?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah anda yakin ingin menghapus data ini?
            </AlertDialogDescription>

            <Separator />
          </AlertDialogHeader>

          <div className='grid grid-cols-3 gap-x-2 gap-y-4 text-sm'>
            <p className='font-medium'>ID Dosen</p>
            <p className='col-span-2'>{props.id}</p>

            <p className='font-medium'>Nama Dosen</p>
            <p className='col-span-2'>{props.name}</p>

            <p className='font-medium'>Alamat Email Dosen</p>
            <p className='col-span-2'>{props.email}</p>

            <p className='font-medium'>Dibuat pada</p>
            <p className='col-span-2'>{formatLongDate(props.createdAt)}</p>
          </div>

          <Separator />

          <AlertDialogFooter>
            <AlertDialogCancel>Batalkan</AlertDialogCancel>
            <AlertDialogAction
              onClick={onClickDelete}
              disabled={mutation.isPending}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/80'
            >
              {mutation.isPending && (
                <Loader2Icon size='1rem' className='animate-spin mr-1' />
              )}
              {mutation.isPending ? 'Memproses' : 'Ya, hapus'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  )
}
