'use client'

import { PageTitle } from '#/components/ui/page-title'

import { useToggle } from '#/hooks/use-toggle'

import { useSemester } from '#/queries/use-semester'

import { FormCreateSemester } from './form-create'

import { Fragment } from 'react'

export function SemesterPageTitle() {
  const query = useSemester()
  const [dialogOpen, toggleDialogOpen] = useToggle()

  const REACHED_LIMIT = query.data.length === 6

  return (
    <Fragment>
      <PageTitle
        title='Kelola Semester'
        action={{
          text: 'Tambah',
          disabled: REACHED_LIMIT || query.isFetching,
          onClick: () => toggleDialogOpen(true),
        }}
      />

      <FormCreateSemester open={dialogOpen} onOpenChange={toggleDialogOpen} />
    </Fragment>
  )
}
