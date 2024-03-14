import { PageTitle } from '#/components/ui/page-title'

import { LecturerDataTable } from '#/modules/lecturer'
import { getAllLecturer } from '#/service/lecturer'

import type { Metadata } from 'next'
import { Fragment } from 'react'

export const metadata: Metadata = {
  title: 'Kelola data Dosen',
}

export default async function Page() {
  const lecturers = await getAllLecturer()

  return (
    <Fragment>
      <PageTitle title='Kelola Dosen' />

      <LecturerDataTable initialData={lecturers} />
    </Fragment>
  )
}
