import { LecturerDataTable } from '#/modules/lecturer'
import { LecturerPageTitle } from '#/modules/lecturer/page-title'
import { getAllLecturer } from '#/service/lecturer'

import { Fragment } from 'react'

export default async function Page() {
  const lecturers = await getAllLecturer()

  return (
    <Fragment>
      <LecturerPageTitle />

      <LecturerDataTable initialData={lecturers} />
    </Fragment>
  )
}
