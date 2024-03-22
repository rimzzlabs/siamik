import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/components/ui/form'
import { Input } from '#/components/ui/input'
import { Separator } from '#/components/ui/separator'

import { useToggle } from '#/hooks/use-toggle'

import { createDefaultFormValues } from '#/lib/utils'
import { useUpdateLecturer } from '#/queries/use-lecturer'
import type { TUpdateLecturerSchema } from '#/validations/lecturer'
import { CreateLecturerSchema } from '#/validations/lecturer'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type TFormCreateLecturerProps = {
  open: boolean
  initialValue: TUpdateLecturerSchema
  onOpenChange: (nextValue: boolean) => void
}

export function FormUpdateLecturer(props: TFormCreateLecturerProps) {
  const [isPending, togglePending] = useToggle()
  const mutation = useUpdateLecturer()

  const form = useForm<TUpdateLecturerSchema>({
    defaultValues: createDefaultFormValues(['email', 'name']),
    resolver: zodResolver(CreateLecturerSchema),
  })

  const onSubmit = (formValues: TUpdateLecturerSchema) => {
    togglePending(true)
    toast.promise(mutation.mutateAsync({ ...formValues, id: props.initialValue.id }), {
      loading: 'Memperbarui data, harap tunggu ...',
      error: (error) => {
        return error?.message ?? 'Gagal memperbarui data, harap coba lagi nanti'
      },
      success: () => {
        form.reset()
        props.onOpenChange(false)
        return 'Berhasil memperbarui data'
      },
      finally: () => {
        togglePending(false)
        mutation.reset()
      },
    })
  }

  const onOpenChange = (nextValue: boolean) => {
    !isPending && props.onOpenChange(nextValue)
  }

  const updateInitialValue = () => {
    for (const key in props.initialValue) {
      form.setValue(
        key as keyof TUpdateLecturerSchema,
        props.initialValue[key as keyof TUpdateLecturerSchema],
      )
    }
  }

  useEffect(() => {
    if (props.open) updateInitialValue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open])

  return (
    <Dialog open={props.open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Perbarui data Dosen</DialogTitle>
          <DialogDescription>
            Anda dapat memperbarui data dosen disini
          </DialogDescription>
          <Separator />
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          <Form {...form}>
            <FormField
              name='name'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder='Nama Dosen' {...field} />
                  </FormControl>
                  <FormDescription>Maksimal 80 karakter</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name='email'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder='Alamat email Dosen'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type='button'
                variant='ghost'
                disabled={isPending}
                onClick={() => props.onOpenChange(false)}
              >
                Batal
              </Button>

              <Button disabled={isPending}>
                {isPending && <Loader2Icon size='1rem' className='animate-spin mr-1' />}
                Perbarui
              </Button>
            </DialogFooter>
          </Form>
        </form>
      </DialogContent>
    </Dialog>
  )
}
