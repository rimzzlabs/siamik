import { badRequest, conflict, created, ok, unauthorized } from '#/lib/api-route'
import { db } from '#/lib/db'
import { getProfile } from '#/service/profile'
import { getAllSemester } from '#/service/semester'
import { SemesterSchema } from '#/validations/semester'

import { SemesterGrade } from '@prisma/client'
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const profile = await getProfile()

  if (!profile) return unauthorized()

  const body = await req.json()
  const schema = SemesterSchema.safeParse(body)

  if (!schema.success) return badRequest(schema.error.formErrors.fieldErrors)

  const grade = await db.semester.findFirst({
    where: { grade: SemesterGrade[schema.data.grade] },
  })

  if (grade) return conflict('Semester ini sudah ditambahkan')

  const data = await db.semester.create({
    data: { grade: SemesterGrade[schema.data.grade] },
  })

  return created(data)
}

export async function GET() {
  const profile = await getProfile()

  if (!profile) unauthorized()

  const semester = await getAllSemester()

  return ok(semester)
}
