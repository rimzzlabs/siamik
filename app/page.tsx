import { Button } from '#/components/ui/button'
import { Revealer } from '#/components/ui/revealer'

import { getServerSession } from 'next-auth'
import Link from 'next/link'

export default async function Home() {
  const session = await getServerSession()

  const wording = session ? 'Dashboard' : 'Masuk'
  const href = session ? '/dashboard' : '/auth/signin'

  return (
    <main className='relative h-screen grid place-items-center bg-dot'>
      <section className='text-center relative z-10 w-11/12 max-w-max'>
        <h1 className='text-3xl sm:text-5xl lg:text-7xl font-bold text-center text-balance max-w-4xl dark:bg-gradient-to-b dark:from-white dark:to-black/80 dark:text-transparent bg-clip-text'>
          SIAMIK: Sistem Akademik AMIK Serang
        </h1>
        <p className='text-balance text-sm lg:text-base py-4 max-w-2xl mx-auto text-stone-700 dark:text-stone-400'>
          Siamik adalah aplikasi website <em>back office</em> yang dikelola dan dimiliki
          oleh Akademi Manajemen Informatika dan Komputer Serang.
        </p>

        <Button asChild>
          <Link href={href}>{wording}</Link>
        </Button>
      </section>
      <Revealer />
    </main>
  )
}
