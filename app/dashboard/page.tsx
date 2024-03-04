import { PageTitle } from '#/components/ui/page-title'

import { DashboardCards, DashboardPresence } from '#/modules/dashboard'

import { Fragment } from 'react'

export default function Page() {
  return (
    <Fragment>
      <PageTitle title='Dashboard' />
      <DashboardCards />
      <DashboardPresence />
    </Fragment>
  )
}
