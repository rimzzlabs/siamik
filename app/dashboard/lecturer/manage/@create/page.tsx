import { PageTitle } from '#/components/ui/page-title'

import { CreateLecturerForm } from '#/modules/lecturer/create-form'

import { Fragment } from 'react'

export default function Page() {
  return (
    <Fragment>
      <PageTitle title='Tambah Dosen baru' />

      <CreateLecturerForm />
    </Fragment>
  )
}
