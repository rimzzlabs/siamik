import { CoursePageTitle } from '#/modules/course'
import { CourseDataTable } from '#/modules/course/data-table'
import { getAllCourse } from '#/service/course'

import { Fragment } from 'react'

export default async function Page() {
  const initialData = await getAllCourse()

  return (
    <Fragment>
      <CoursePageTitle />

      <CourseDataTable initialData={initialData} />
    </Fragment>
  )
}
