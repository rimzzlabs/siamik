import { Loader2Icon } from 'lucide-react'

export default function LoadingPage() {
  return (
    <div className='min-h-[calc(100svh-var(--navbar-height)-4rem)] grid place-items-center'>
      <div className='flex flex-col gap-2'>
        <Loader2Icon size='6rem' className='animate-spin' />
        <p className='sr-only'>Memuat halaman, mohon tunggu</p>
      </div>
    </div>
  )
}
