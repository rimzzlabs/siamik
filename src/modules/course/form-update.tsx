'use client'

import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'
import { Separator } from '#/components/ui/separator'

import { useToggle } from '#/hooks/use-toggle'

import { getSemesterText } from '#/lib/semester'
import { useUpdateCourse } from '#/queries/use-course'
import { useSemester } from '#/queries/use-semester'
import type { TCourseUpdateSchema } from '#/validations/course'
import { CourseSchema } from '#/validations/course'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { P, match } from 'ts-pattern'

type TProps = {
  open: boolean
  onOpenChange: (nextValue?: boolean) => void
  initialValue: TCourseUpdateSchema
}

export function FormUpdateCourse(props: TProps) {
  const [isPending, togglePending] = useToggle()

  const form = useForm<TCourseUpdateSchema>({
    defaultValues: { id: props.initialValue.id },
    resolver: zodResolver(CourseSchema),
  })

  const semesters = useSemester()
  const mutation = useUpdateCourse()

  const onSubmit = (formValues: TCourseUpdateSchema) => {
    togglePending(true)
    toast.promise(mutation.mutateAsync({ ...formValues, id: props.initialValue.id }), {
      loading: 'Memberbarui data, harap tunggu ...',
      finally: () => {
        togglePending(false)
        mutation.reset()
      },
      error: (error) => {
        return error?.message ?? 'Gagal memberbarui data, harap coba lagi nanti'
      },
      success: () => {
        props.onOpenChange(false)
        return 'Berhasil memberbarui data'
      },
    })
  }

  const onOpenChange = (nextValue: boolean) => {
    !isPending && props.onOpenChange(nextValue)
  }

  const updateInitialValue = () => {
    const items = {
      credit: props.initialValue.credit,
      id: props.initialValue.id,
      name: props.initialValue.name,
      semesterId: props.initialValue.semesterId,
    }

    for (const key in items) {
      form.setValue(
        key as keyof TCourseUpdateSchema,
        items[key as keyof TCourseUpdateSchema],
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
          <DialogTitle>Tambah mata kuliah</DialogTitle>
          <DialogDescription>
            Anda bisa menambahkan mata kuliah baru disini
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
                    <Input
                      disabled={isPending}
                      placeholder='Nama mata kuliah'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Maksimal 80 karakter</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name='credit'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah SKS</FormLabel>
                  <FormControl>
                    <Input
                      min={0}
                      type='number'
                      placeholder='Jumlah SKS (1 - 5)'
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Masukkan jumlah SKS dari 1 sampai 5</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {match(semesters.data)
              .with(P.not(P.nullish), (semesterOptions) => (
                <FormField
                  name='semesterId'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tingkat Semester</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Pilih tingkat semester' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {semesterOptions.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {getSemesterText(option.grade)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Untuk semester berapa mata kuliah ini?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))
              .otherwise(() => null)}

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
