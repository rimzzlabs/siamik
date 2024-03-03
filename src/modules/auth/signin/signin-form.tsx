'use client'

import { Button } from '#/src/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/src/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/src/components/ui/form'
import { Input, InputPassword } from '#/src/components/ui/input'
import { Separator } from '#/src/components/ui/separator'
import type { TSignInSchema } from '#/src/validations/auth'
import { SignInSchema } from '#/src/validations/auth'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export function SignInForm() {
  const router = useRouter()

  const form = useForm<TSignInSchema>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(SignInSchema),
  })

  const onSubmit = async (formValues: TSignInSchema) => {
    const toastId = toast.loading('Memproses kredensial, harap tunggu...')

    const res = await signIn('credentials', { ...formValues, redirect: false })
    toast.dismiss(toastId)
    if (res?.ok) {
      toast.success('Berhasil masuk, mengalihkan...')
      router.replace('/dashboard')
      return
    }
    toast.error('Gagal masuk, cek email atau password anda')
  }

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle>Masuk</CardTitle>
        <CardDescription>
          Untuk mengakses aplikasi ini, anda harus masuk sebagai administrasi kampus.
        </CardDescription>
        <Separator />
      </CardHeader>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Form {...form}>
          <CardContent className='space-y-4'>
            <FormField
              name='email'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='Alamat email anda'
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
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
                      placeholder='Password anda'
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className='justify-end'>
            <Button
              isPending={form.formState.isSubmitting}
              disabled={form.formState.isSubmitting || !form.formState.isValid}
            >
              Masuk
            </Button>
          </CardFooter>
        </Form>
      </form>
    </Card>
  )
}
