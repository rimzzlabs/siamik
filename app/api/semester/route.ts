import { db } from '#/lib/db'
import { getProfile } from '#/service/profile'
import { getAllSemester } from '#/service/semester'
import { SemesterSchema } from '#/validations/semester'

import { SemesterGrade } from '@prisma/client'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const res = NextResponse

  const profile = await getProfile()

  if (!profile) {
    return res.json({ message: 'Unauthorized!' }, { status: 401 })
  }

  const body = await req.json()
  const schema = SemesterSchema.safeParse(body)

  if (!schema.success) return res.json({ message: schema.error.formErrors.fieldErrors })
  const grade = await db.semester.findFirst({
    where: { grade: SemesterGrade[schema.data.grade] },
  })

  if (grade) {
    return res.json({ message: 'This semester is already added' }, { status: 409 })
  }

  const data = await db.semester.create({
    data: { grade: SemesterGrade[schema.data.grade] },
  })

  return res.json({ message: 'Success', data }, { status: 201 })
}

export async function GET() {
  const res = NextResponse

  const profile = await getProfile()

  if (!profile) {
    return res.json({ message: 'Unauthorized!' }, { status: 401 })
  }

  const semester = await getAllSemester()

  return res.json({ message: 'Success', data: semester ?? [] })
}
