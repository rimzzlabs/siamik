import { DashboardMain, DashboardNavbar, DashboardSidebar } from '#/modules/dashboard'
import { getProfile } from '#/service/profile'

import { redirect } from 'next/navigation'
import { Fragment } from 'react'

export default async function Layout(props: React.PropsWithChildren) {
  const profile = await getProfile()

  if (!profile) {
    redirect('/auth/signin')
  }

  return (
    <Fragment>
      <DashboardNavbar />
      <DashboardSidebar />

      <DashboardMain>{props.children}</DashboardMain>
    </Fragment>
  )
}
