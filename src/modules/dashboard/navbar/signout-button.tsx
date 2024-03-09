'use client'

import { Button } from '#/components/ui/button'

import { Loader2Icon, LogOutIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { PrefetchKind } from 'next/dist/client/components/router-reducer/router-reducer-types'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'
import { sleep } from 'radash'
import { useTransition } from 'react'

const processLogout = async (router: AppRouterInstance) => {
  router.prefetch('/auth/signin', { kind: PrefetchKind.FULL })
  await sleep(10)
  await signOut({ redirect: true })
}
export function DashboardNavbarSignOutButton() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const onClick = () => {
    startTransition(async () => {
      await processLogout(router)
    })
  }

  return (
    <Button
      variant='destructive'
      className='justify-normal gap-1'
      disabled={isPending}
      onClick={onClick}
    >
      {isPending ? <Loader2Icon size='1rem' /> : <LogOutIcon size='1rem' />}
      Keluar
    </Button>
  )
}
