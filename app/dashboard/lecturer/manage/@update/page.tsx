import { PageTitle } from '#/components/ui/page-title'

import { UpdateLecturerForm } from '#/modules/lecturer/update-form'
import { getLecturer } from '#/service/lecturer'

import { redirect } from 'next/navigation'
import { Fragment } from 'react'

export default async function Page(args: { searchParams: { lecturerId: string } }) {
  const intialData = await getLecturer(args.searchParams.lecturerId)

  if (!intialData) {
    redirect('/dashboard/lecturer')
  }

  return (
    <Fragment>
      <PageTitle title='Perbarui Data Dosen' />

      <UpdateLecturerForm {...intialData} />
    </Fragment>
  )
}
