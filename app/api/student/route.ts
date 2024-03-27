import {
  badRequest,
  conflict,
  created,
  ok,
  serverError,
  unauthorized,
} from '#/lib/api-route'
import { getProfile } from '#/service/profile'
import { createStudent, getAllStudent, isStudentExist } from '#/service/student'
import { CreateStudentSchema } from '#/validations/student'

import type { NextRequest } from 'next/server'
import { tryit } from 'radash'

export async function GET() {
  const profile = await getProfile()
  if (!profile) return unauthorized()

  const data = await getAllStudent()

  return ok(data)
}

export async function POST(req: NextRequest) {
  const profile = await getProfile()
  if (!profile) return unauthorized()

  const body = await req.json()
  const parse = CreateStudentSchema.safeParse(body)
  if (!parse.success) return badRequest(parse.error.formErrors.formErrors)

  const data = parse.data
  const isExist = await isStudentExist({ email: data.email, nim: data.nim })
  if (isExist) {
    return conflict(
      'Mahasiswa dengan data NIM atau email ini sudah ada, tidak bisa ditambahkan',
    )
  }

  const [error, resp] = await tryit(createStudent)(data)

  if (error) return serverError(error)

  return created(resp)
}
