import { CourseDataTable } from '#/modules/course'
import { CourseCards } from '#/modules/course/cards'

import { Fragment } from 'react'

export default async function Page() {
  return (
    <Fragment>
      <CourseCards />

      <CourseDataTable />
    </Fragment>
  )
}
