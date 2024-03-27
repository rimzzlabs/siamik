import { db } from '#/lib/db'
import type { TCreateStudentSchema } from '#/validations/student'

import { getProfile } from './profile'

import { omit, tryit } from 'radash'

export async function getAllStudent() {
  const profile = await getProfile()
  if (!profile) return []

  const [error, students] = await tryit(db.student.findMany)({
    orderBy: { createdAt: 'asc' },
    include: { semester: true },
  })

  if (error) return []

  return students.map((student) => omit(student, ['password']))
}

export type AllStudent = Awaited<ReturnType<typeof getAllStudent>>

export async function isStudentExist(payload: Partial<{ nim: string; email: string }>) {
  const profile = await getProfile()
  if (!profile) return null

  const [error] = await tryit(db.student.findFirstOrThrow)({
    where: {
      AND: [
        {
          OR: [{ email: payload.email }, { nim: payload.nim }],
        },
      ],
    },
    select: {
      id: true,
      email: true,
      nim: true,
      name: true,
      image: true,
      courses: true,
      semester: true,
      createdAt: true,
      updatedAt: true,
    },
  })
  if (error) return false

  return true
}

export async function getStudent(nim: string) {
  const profile = await getProfile()
  if (!profile) return null

  const [error, student] = await tryit(db.student.findUniqueOrThrow)({
    where: { nim },
    select: {
      id: true,
      email: true,
      nim: true,
      name: true,
      image: true,
      courses: true,
      semester: true,
      createdAt: true,
      updatedAt: true,
    },
  })
  if (error) return null

  return student
}

export async function createStudent(data: TCreateStudentSchema) {
  const [err, resp] = await tryit(db.student.create)({ data, select: { nim: true } })
  if (err) throw err

  return resp
}
