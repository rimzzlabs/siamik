'use client'

import { Button } from '#/components/ui/button'
import { Dialog } from '#/components/ui/dialog'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'

import { useToggle } from '#/hooks/use-toggle'

import { semesterGradeOptions } from '#/constants/semester'
import { useCreateSemester } from '#/queries/use-semester'
import type { TSemesterSchema } from '#/validations/semester'
import { SemesterSchema } from '#/validations/semester'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type TFormCreateSemesterProps = {
  open: boolean
  onOpenChange: (nextValue: boolean) => void
}
export function FormCreateSemester(props: TFormCreateSemesterProps) {
  const [isPending, togglePending] = useToggle()

  const mutation = useCreateSemester()

  const form = useForm<TSemesterSchema>({
    resolver: zodResolver(SemesterSchema),
  })

  const onSubmit = async (formValues: TSemesterSchema) => {
    togglePending(true)
    toast.promise(mutation.mutateAsync(formValues), {
      loading: 'Memproses, harap tunggu...',
      error: 'Semester ini sudah ada, harap jangan menambahkan semester lain',
      success: 'Berhasil menambahkan semester',
      finally() {
        mutation.reset()
        togglePending(false)
      },
    })
  }
  const onOpenChange = (nextValue: boolean) => {
    !mutation.isPending && props.onOpenChange(nextValue)
  }

  return (
    <Dialog open={props.open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah data semester</DialogTitle>
          <DialogDescription>Tambah data semester baru</DialogDescription>
        </DialogHeader>

        <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
          <Form {...form}>
            <FormField
              name='grade'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tingkat Semester</FormLabel>
                  <Select
                    disabled={mutation.isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Pilih tingkat semester yang belum tersedia' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {semesterGradeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.text}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>

          <DialogFooter>
            <Button disabled={isPending}>
              {mutation.isPending && (
                <Loader2Icon size='1rem' className='animate-spin' />
              )}
              Tambah
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
