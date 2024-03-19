'use client'

import { PageTitle } from '#/components/ui/page-title'

import { useToggle } from '#/hooks/use-toggle'

import { FormCreateCourse } from './form-create'

import { Fragment } from 'react'

export function CoursePageTitle() {
  const [dialogOpen, toggleDialog] = useToggle()

  return (
    <Fragment>
      <PageTitle
        title='Kelola Mata kuliah'
        action={{ text: 'Tambah', onClick: () => toggleDialog(true) }}
      />

      <FormCreateCourse open={dialogOpen} onOpenChange={toggleDialog} />
    </Fragment>
  )
}
