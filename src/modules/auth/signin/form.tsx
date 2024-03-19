'use client'

import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/components/ui/form'
import { Input, InputPassword } from '#/components/ui/input'
import { Separator } from '#/components/ui/separator'

import type { TSignInSchema } from '#/validations/auth'
import { SignInSchema } from '#/validations/auth'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { sleep } from 'radash'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export function SignInForm() {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const session = useSession()

  const form = useForm<TSignInSchema>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(SignInSchema),
  })

  const signInPromise = (formValues: TSignInSchema) => {
    return new Promise(async (res, rej) => {
      const resp = await signIn('credentials', { ...formValues, redirect: false })
      if (resp?.ok) {
        res(true)
      }
      rej(new Error('Invalid email or password'))
    })
  }

  const onSubmit = async (formValues: TSignInSchema) => {
    setIsPending(true)

    toast.promise(signInPromise(formValues), {
      loading: 'Memproses kredensial',
      error: 'Email atau password tidak valid',
      finally: () => setIsPending(false),
      success: () => {
        toast.info('Anda akan diarahkan ke dashboard dalam beberapa saat')
        return 'Berhasil masuk!'
      },
    })
  }

  const isPreventSubmit = isPending || !form.formState.isValid

  useEffect(() => {
    ;(async () => {
      if (session.status === 'authenticated') {
        await sleep(50)
        router.push('/dashboard')
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.status])

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
                      disabled={isPending}
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
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className='justify-end'>
            <Button disabled={isPreventSubmit}>Masuk</Button>
          </CardFooter>
        </Form>
      </form>
    </Card>
  )
}
