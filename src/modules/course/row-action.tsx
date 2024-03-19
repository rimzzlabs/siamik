import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'

import { useConfirmation } from '#/hooks/use-confirmation'
import { useToggle } from '#/hooks/use-toggle'

import { useDeleteCourse } from '#/queries/use-course'

import { FormUpdateCourse } from './form-update'

import type { Course } from '@prisma/client'
import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'
import { Fragment } from 'react'
import { toast } from 'sonner'

export function RowActionCourse(props: Course) {
  const openConirmation = useConfirmation.use.openConfirmation()
  const deleteMutation = useDeleteCourse()
  const [dialogOpen, toggleDialog] = useToggle()

  const onClickDelete = () => {
    openConirmation({
      title: 'Hapus mata kuliah ini?',
      description: 'Apa anda yakin ingin menghapus mata kuliah ini?',
      confirmText: 'Ya, Hapus',
      onConfirm: async (fns) => {
        fns.setPending()
        toast.promise(deleteMutation.mutateAsync(props.id), {
          loading: 'Menghapus MK, harap tunggu ...',
          success: 'Berhasil menghapus MK',
          error: (error) => {
            return error?.message ?? 'Gagal menghapus MK, harap coba beberapa saat lagi'
          },
          finally: () => {
            deleteMutation.reset()
            fns.closeConfirmation()
          },
        })
      },
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

          <DropdownMenuItem onClick={() => toggleDialog(true)}>
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

      <FormUpdateCourse
        open={dialogOpen}
        initialValue={props}
        onOpenChange={toggleDialog}
      />
    </Fragment>
  )
}
