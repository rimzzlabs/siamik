import { courses } from '#/mock/course'
import { CourseDataTable } from '#/modules/course'
import { CourseCards } from '#/modules/course/cards'

import { random, sleep } from 'radash'
import { Fragment } from 'react'

async function getCourses() {
  await sleep(random(1500, 3000))
  return courses
}

export default async function Page() {
  const data = await getCourses()

  return (
    <Fragment>
      <CourseCards />

      <CourseDataTable data={data} />
    </Fragment>
  )
}
