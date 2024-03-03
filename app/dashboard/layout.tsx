import {
  DashboardMain,
  DashboardNavbar,
  DashboardSidebar,
} from '#/src/modules/dashboard'

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Fragment } from 'react'

export default async function Layout(props: React.PropsWithChildren) {
  const session = await getServerSession()

  if (!session) {
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
