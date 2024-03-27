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
import { Input, InputPassword } from '#/components/ui/input'
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
import { createDefaultFormValues } from '#/lib/utils'
import { onChangeNumber } from '#/lib/web-events'
import { useSemester } from '#/queries/use-semester'
import { useCreateStudent } from '#/queries/use-student'
import type { TCreateStudentSchema } from '#/validations/student'
import { CreateStudentSchema } from '#/validations/student'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { P, match } from 'ts-pattern'

type TFormCreateStudentProps = {
  open: boolean
  onOpenChange: (nextValue: boolean) => void
}

export function FormCreateStudent(props: TFormCreateStudentProps) {
  const [isPending, togglePending] = useToggle()
  const mutation = useCreateStudent()
  const semesters = useSemester([])

  const form = useForm<TCreateStudentSchema>({
    defaultValues: createDefaultFormValues(['nim', 'email', 'password', 'semesterId']),
    resolver: zodResolver(CreateStudentSchema),
  })

  const onSubmit = (formValues: TCreateStudentSchema) => {
    togglePending(true)
    toast.promise(mutation.mutateAsync(formValues), {
      loading: 'Menambahkan data, harap tunggu ...',
      error: (error) => {
        return error?.message ?? 'Gagal menambahkan data, harap coba lagi nanti'
      },
      success: () => {
        form.reset({
          email: '',
          image: '',
          name: '',
          nim: '',
          password: '',
          semesterId: undefined,
        })
        props.onOpenChange(false)
        return 'Berhasil menambahkan data'
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

  const semestersDropdown = match(semesters)
    .with({ status: 'success', data: P.not(P.nullish) }, (query) => query.data)
    .otherwise(() => [])

  return (
    <Dialog open={props.open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Mahasiswa baru</DialogTitle>
          <DialogDescription>
            Anda bisa menambahkan data mahasiswa baru disini
          </DialogDescription>
          <Separator />
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          <Form {...form}>
            <FormField
              name='nim'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIM</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='text'
                      inputMode='numeric'
                      disabled={isPending}
                      placeholder='Nomor Induk Mahasiswa'
                      onChange={onChangeNumber(field.onChange)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='name'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      autoComplete='name'
                      placeholder='Nama mahasiswa'
                    />
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
                      {...field}
                      type='email'
                      disabled={isPending}
                      autoComplete='email'
                      placeholder='Alamat email mahasiswa'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name='semesterId'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tingkat Semester</FormLabel>
                  <Select
                    disabled={mutation.isPending || semestersDropdown.length === 0}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Pilih tingkat semester' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {semestersDropdown.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {getSemesterText(option.grade)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name='password'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <InputPassword
                      {...field}
                      disabled={isPending}
                      autoComplete='new-password'
                      placeholder='Buat password awal untuk mahasiswa'
                    />
                  </FormControl>
                  <FormDescription>
                    Password harus mengandung setidaknya 8 karakter atau lebih, memiliki
                    1 angka, dan 1 karakter spesial atau simbol.
                  </FormDescription>
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
                Tambah
              </Button>
            </DialogFooter>
          </Form>
        </form>
      </DialogContent>
    </Dialog>
  )
}
