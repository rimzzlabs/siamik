'use client'

import { PageTitle } from '#/components/ui/page-title'

import { useToggle } from '#/hooks/use-toggle'

import { FormCreateLecturer } from './form-create'

import { Fragment } from 'react'

export function LecturerPageTitle() {
  const [dialogOpen, setDialogOpen] = useToggle()

  return (
    <Fragment>
      <PageTitle
        title='Kelola Dosen'
        action={{ text: 'Tambah', onClick: () => setDialogOpen(true) }}
      />

      <FormCreateLecturer open={dialogOpen} onOpenChange={setDialogOpen} />
    </Fragment>
  )
}
