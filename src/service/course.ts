import { db } from '#/lib/db'
import type { TCourseSchema, TCourseUpdateSchema } from '#/validations/course'

import { getProfile } from './profile'

import { omit, tryit } from 'radash'

export async function getAllCourse() {
  const profile = await getProfile()
  if (!profile) return []

  const [error, course] = await tryit(db.course.findMany)({
    orderBy: { createdAt: 'asc' },
    include: { semester: true },
  })

  if (error) return []

  return course
}

export async function createCourse(data: TCourseSchema) {
  return await db.course.create({ data })
}

export async function deleteCourse(courseId: string) {
  return await db.course.delete({ where: { id: courseId } })
}

export async function updateCourse(data: TCourseUpdateSchema) {
  return await db.course.update({
    data: omit(data, ['id']),
    where: { id: data.id },
  })
}
