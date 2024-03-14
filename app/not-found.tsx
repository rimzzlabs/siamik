import { Button } from '#/components/ui/button'
import { Revealer } from '#/components/ui/revealer'

import { getProfile } from '#/service/profile'

import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

export default async function Home() {
  const profile = await getProfile()

  const href = profile ? '/dashboard' : '/'

  return (
    <main className='relative h-screen grid place-items-center bg-dot'>
      <section className='text-center relative z-10 w-11/12 max-w-max'>
        <h1 className='text-3xl sm:text-5xl lg:text-7xl font-bold text-center text-balance max-w-4xl dark:bg-gradient-to-b dark:from-white dark:to-black/80 dark:text-transparent bg-clip-text'>
          404
          <br />
          Halaman Tidak Ditemukan
        </h1>
        <p className='text-balance text-sm lg:text-base py-4 max-w-2xl mx-auto text-stone-700 dark:text-stone-400'>
          Halaman yang anda kunjungi tidak ditemukan, jika anda merasa ini adalah
          kesalahan, anda bisi menghubungi staff engineering kampus.
        </p>

        <Button className='group' asChild>
          <Link href={href}>
            <ArrowLeftIcon
              size='1rem'
              className='group-hover:-translate-x-1 transition'
            />
            Kembali
          </Link>
        </Button>
      </section>
      <Revealer />
    </main>
  )
}
