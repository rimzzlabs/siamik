import { PageTitle } from '#/components/ui/page-title'

import { SemesterDataTable } from '#/modules/semester/data-table'
import { getAllSemester } from '#/service/semester'

import { Fragment } from 'react'

export default async function Page() {
  const data = await getAllSemester()

  return (
    <Fragment>
      <PageTitle title='Kelola Semester' />

      <SemesterDataTable data={data ?? []} />
    </Fragment>
  )
}
