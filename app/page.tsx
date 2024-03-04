import { Button } from '#/components/ui/button'

import { getServerSession } from 'next-auth'
import Link from 'next/link'

export default async function Home() {
  const session = await getServerSession()

  const wording = session ? 'Dashboard' : 'Masuk'
  const href = session ? '/dashboard' : '/auth/signin'

  return (
    <main className='h-screen grid place-items-center'>
      <section className='text-center'>
        <h1 className='text-6xl lg:text-7xl font-bold'>Lapormik</h1>
        <p className='text-balance py-4 max-w-xl'>
          Lapormik adalah aplikasi manajemen pelayanan laporan publik yang dimiliki oleh
          AMIK Serang, aplikasi ini hanya bisa diakses oleh staff yang terdaftar.
        </p>

        <Button asChild>
          <Link href={href}>{wording}</Link>
        </Button>
      </section>
    </main>
  )
}
