'use client'

import { PageTitle } from '#/components/ui/page-title'

import { useToggle } from '#/hooks/use-toggle'

import { FormCreateStudent } from './form-create'

import { Fragment } from 'react'

export function StudentPageTitle() {
  const [createDialogOpen, setCreateDialog] = useToggle()

  return (
    <Fragment>
      <PageTitle
        title='Kelola Mahasiswa'
        action={{ text: 'Tambah', onClick: () => setCreateDialog(true) }}
      />

      <FormCreateStudent onOpenChange={setCreateDialog} open={createDialogOpen} />
    </Fragment>
  )
}
