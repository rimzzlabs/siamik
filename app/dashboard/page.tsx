import { PageTitle } from '#/components/ui/page-title'

import { DashboardCards, DashboardPresence } from '#/modules/dashboard'
import { getDashboardStatistics } from '#/service/dashboard'

import { Fragment } from 'react'

export default async function Page() {
  const data = await getDashboardStatistics()

  return (
    <Fragment>
      <PageTitle title='Dashboard' />
      <DashboardCards {...data} />
      <DashboardPresence />
    </Fragment>
  )
}
