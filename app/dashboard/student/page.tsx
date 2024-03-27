import { StudentDataTable } from '#/modules/student/data-table'
import { StudentPageTitle } from '#/modules/student/page-title'
import { getAllStudent } from '#/service/student'

import { Fragment } from 'react'

export default async function Page() {
  const data = await getAllStudent()

  return (
    <Fragment>
      <StudentPageTitle />

      <StudentDataTable data={data} />
    </Fragment>
  )
}
