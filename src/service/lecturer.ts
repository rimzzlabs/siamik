import { db } from '#/lib/db'
import type {
  TCreateLecturerSchema,
  TUpdateLecturerSchema,
} from '#/validations/lecturer'

import { getProfile } from './profile'

import { tryit } from 'radash'

export async function getAllLecturer() {
  const profile = await getProfile()
  if (!profile) return []

  const [error, lecturers] = await tryit(db.lecturer.findMany)({
    orderBy: { createdAt: 'asc' },
    include: { courses: true, semesters: true, _count: true },
  })

  if (error) return []

  return lecturers
}

export async function getLecturer(lecturerId: string) {
  const profile = await getProfile()
  if (!profile) return null

  const [error, data] = await tryit(db.lecturer.findUniqueOrThrow)({
    where: { id: lecturerId },
  })
  if (error) return null

  return data
}

export type AllLecturer = Awaited<ReturnType<typeof getAllLecturer>>

export async function createLecturer(args: TCreateLecturerSchema) {
  const profile = await getProfile()
  if (!profile) throw new Error('Unauthorized')

  const [err, res] = await tryit(db.lecturer.create)({
    data: args,
  })

  if (err) throw err

  return res
}

export async function updateLecturer(args: TUpdateLecturerSchema) {
  const profile = await getProfile()
  if (!profile) throw new Error('Unauthorized')

  const [err, res] = await tryit(db.lecturer.update)({
    data: { email: args.email, name: args.name },
    where: { id: args.id },
  })
  if (err) throw err

  return res
}

export async function deleteLecturer(lecturerId: string) {
  const profile = await getProfile()
  if (!profile) throw new Error('Unauthorized')

  const [err, res] = await tryit(db.lecturer.delete)({
    where: { id: lecturerId },
  })
  if (err) throw err

  return res
}
