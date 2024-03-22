import { SemesterDataTable } from '#/modules/semester/data-table'
import { SemesterPageTitle } from '#/modules/semester/page-title'
import { getAllSemester } from '#/service/semester'

import { Fragment } from 'react'

export default async function Page() {
  const data = await getAllSemester()

  return (
    <Fragment>
      <SemesterPageTitle />

      <SemesterDataTable data={data} />
    </Fragment>
  )
}
