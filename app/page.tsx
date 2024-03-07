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
      <section className='text-center relative z-10'>
        <h1 className='text-6xl lg:text-7xl font-bold text-center text-balance max-w-4xl dark:bg-gradient-to-b dark:from-white dark:to-black/80 dark:text-transparent bg-clip-text'>
          SIAMIK: Sistem Akademik AMIK Serang
        </h1>
        <p className='text-balance py-4 max-w-4xl text-stone-700 dark:text-stone-400'>
          Siamik adalah aplikasi website <em>back office</em> yang dikelola dan dimiliki
          oleh Akademi Manajemen Informatika dan Komputer Serang. Sistem ini dibuat agar
          memudahkan kampus dalam mengelola perkuliahan dan menggunakan sebuah sistem
          akademik yang ter-<em>centralized</em> dan mudah digunakan.
        </p>

        <Button asChild>
          <Link href={href}>{wording}</Link>
        </Button>
      </section>
      <Revealer />
    </main>
  )
}
