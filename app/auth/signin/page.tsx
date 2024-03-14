import { Revealer } from '#/components/ui/revealer'

import { SignInForm } from '#/modules/auth/signin'
import { getProfile } from '#/service/profile'

import { redirect } from 'next/navigation'

export default async function Page() {
  const profile = await getProfile()

  if (profile) {
    redirect('/dashboard')
  }

  return (
    <div className='relative bg-dot'>
      <main className='relative z-10 h-screen grid place-items-start pt-20 lg:pt-0 lg:place-items-center w-11/12 mx-auto'>
        <SignInForm />
      </main>
      <Revealer />
    </div>
  )
}
