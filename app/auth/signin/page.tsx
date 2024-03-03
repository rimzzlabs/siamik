import { SignInForm } from '#/src/modules/auth/signin'

export default function Page() {
  return (
    <main className='h-screen grid place-items-start pt-20 lg:pt-0 lg:place-items-center w-11/12 mx-auto'>
      <SignInForm />
    </main>
  )
}
