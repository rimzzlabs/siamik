import { getUser } from '#/service/user'

import { DashboardMenu } from '../menu'

import { P, match } from 'ts-pattern'

export async function DashboardSidebar() {
  const user = await getUser()

  if (!user) return null

  const menu = match(user.role)
    .with(P.shape('ADMIN').or('SUPER_ADMIN'), () => <DashboardMenu />)
    .otherwise(() => null)

  return (
    <aside className='fixed top-[calc(var(--navbar-height))] bottom-0 left-0 z-50 border-r bg-background hidden lg:block'>
      <div className='w-[var(--sidebar-width)] h-full p-4'>{menu}</div>
    </aside>
  )
}
