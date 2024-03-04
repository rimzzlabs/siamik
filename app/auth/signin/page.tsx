import { SignInForm } from '#/modules/auth/signin'

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await getServerSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <main className='h-screen grid place-items-start pt-20 lg:pt-0 lg:place-items-center w-11/12 mx-auto'>
      <SignInForm />
    </main>
  )
}
