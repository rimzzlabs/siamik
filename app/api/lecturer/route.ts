import {
  badRequest,
  conflict,
  created,
  ok,
  serverError,
  unauthorized,
} from '#/lib/api-route'
import { lowercase } from '#/lib/utils'
import { createLecturer, getAllLecturer, updateLecturer } from '#/service/lecturer'
import { getProfile } from '#/service/profile'
import { CreateLecturerSchema, UpdateLecturerSchema } from '#/validations/lecturer'

import type { NextRequest } from 'next/server'
import { tryit } from 'radash'

export async function POST(req: NextRequest) {
  const profile = await getProfile()
  if (!profile) return unauthorized()

  const body = await req.json()
  const parse = CreateLecturerSchema.safeParse(body)
  if (!parse.success) return badRequest(parse.error.formErrors.formErrors)

  const [error, data] = await tryit(createLecturer)(parse.data)
  if (error) {
    if (lowercase(error.message).includes('unique'))
      return conflict('Data dosen dengan alamat email ini sudah ada')

    return serverError(error)
  }

  return created(data)
}

export async function GET() {
  const profile = await getProfile()

  if (!profile) unauthorized()

  const data = await getAllLecturer()

  return ok(data)
}

export async function PATCH(req: NextRequest) {
  const profile = await getProfile()
  if (!profile) return unauthorized()

  const body = await req.json()

  const parse = UpdateLecturerSchema.safeParse(body)
  if (!parse.success) return badRequest(parse.error.formErrors.formErrors)

  const [error, data] = await tryit(updateLecturer)(parse.data)
  if (error) return serverError(error)

  return created(data)
}
