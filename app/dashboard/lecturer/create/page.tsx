import { PageTitle } from '#/components/ui/page-title'

import { CreateLecturerForm } from '#/modules/lecturer/create-form'

import type { Metadata } from 'next'
import { Fragment } from 'react'

export const metadata: Metadata = {
  title: 'Tambah data Dosen baru',
}

export default function Page() {
  return (
    <Fragment>
      <PageTitle title='Tambah Dosen baru' />

      <CreateLecturerForm />
    </Fragment>
  )
}
