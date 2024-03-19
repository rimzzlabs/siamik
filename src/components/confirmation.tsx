'use client'

import { useConfirmation } from '#/hooks/use-confirmation'

import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'

import { Loader2Icon } from 'lucide-react'

export function Confirmation() {
  const isOpen = useConfirmation.use.isOpen()
  const isPending = useConfirmation.use.isPending()
  const title = useConfirmation.use.title()
  const description = useConfirmation.use.description()

  const confirmAlert = useConfirmation.use.onConfirm()
  const toggleConfirmation = useConfirmation.use.toggleConfirmation()
  const closeConfirmation = useConfirmation.use.closeConfirmation()
  const setPending = useConfirmation.use.setPending()
  const confirmText = useConfirmation.use.confirmText()

  const onOpenChange = (nextValue: boolean) => {
    if (isPending) return false
    toggleConfirmation(nextValue)
  }
  const onClick = async () => {
    await confirmAlert({ setPending, closeConfirmation })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent data-disabled>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={isPending} onClick={closeConfirmation} variant='ghost'>
            Batalkan
          </Button>

          <Button disabled={isPending} onClick={onClick} variant='destructive'>
            {isPending && <Loader2Icon size='1rem' className='animate-spin mr-1' />}
            {isPending ? 'Memproses' : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
