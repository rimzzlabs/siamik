'use client'

import { Button } from '#/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/components/ui/form'
import { Input } from '#/components/ui/input'

import { useUpdateLecturer } from '#/queries/use-lecturer'
import type { TUpdateLecturerSchema } from '#/validations/lecturer'
import { UpdateLecturerSchema } from '#/validations/lecturer'

import { zodResolver } from '@hookform/resolvers/zod'
import type { Lecturer } from '@prisma/client'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export function UpdateLecturerForm(props: Lecturer) {
  const router = useRouter()

  const mutation = useUpdateLecturer()
  const form = useForm<TUpdateLecturerSchema>({
    defaultValues: { email: props.email, name: props.name, id: props.id },
    resolver: zodResolver(UpdateLecturerSchema),
  })

  const onSubmit = (formValues: TUpdateLecturerSchema) => {
    toast.promise(mutation.mutateAsync(formValues), {
      loading: 'Membeperbarui dosen, harap tunggu...',
      success: () => {
        form.reset()
        mutation.reset()
        router.push('/dashboard/lecturer')
        return 'Berhasil memberbarui data dosen!'
      },
      error(error) {
        mutation.reset()
        return (
          error?.message ??
          'Gagal memberbarui data dosen, harap coba beberapa saat lagi'
        )
      },
    })
  }

  return (
    <div className='max-w-2xl'>
      <Form {...form}>
        <form
          className='grid md:grid-cols-2 gap-4'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Nama dosen'
                    disabled={mutation.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='email'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Dosen</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Alamat email dosen'
                    disabled={mutation.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-end md:col-span-2'>
            <Button disabled={mutation.isPending || !form.formState.isValid}>
              {mutation.isPending && (
                <Loader2Icon size='1rem' className='animate-spin mr-1' />
              )}
              {mutation.isPending ? 'Memproses' : 'Perbarui'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
