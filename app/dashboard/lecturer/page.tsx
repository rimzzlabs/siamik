import { PageTitle } from '#/components/ui/page-title'

import { LecturerDataTable } from '#/modules/lecturer'
import { getAllLecturer } from '#/service/lecturer'

import { Fragment } from 'react'

export default async function Page() {
  const lecturers = await getAllLecturer()

  return (
    <Fragment>
      <PageTitle title='Kelola Dosen' />

      <LecturerDataTable initialData={lecturers} />
    </Fragment>
  )
}
