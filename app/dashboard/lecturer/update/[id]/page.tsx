import { PageTitle } from '#/components/ui/page-title'

import { UpdateLecturerForm } from '#/modules/lecturer/update-form'
import { getLecturer } from '#/service/lecturer'

import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Fragment } from 'react'

export const metadata: Metadata = {
  title: 'Perbarui Data Dosen',
}

export default async function Page(args: { params: { id: string } }) {
  const intialData = await getLecturer(args.params.id)

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
