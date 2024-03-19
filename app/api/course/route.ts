import { badRequest, created, ok, serverError, unauthorized } from '#/lib/api-route'
import { createCourse, getAllCourse, updateCourse } from '#/service/course'
import { getProfile } from '#/service/profile'
import { CourseSchema, CourseUpdateSchema } from '#/validations/course'

import type { NextRequest } from 'next/server'
import { tryit } from 'radash'

export async function GET() {
  const profile = await getProfile()
  if (!profile) return unauthorized()

  const course = await getAllCourse()

  return ok(course)
}

export async function POST(req: NextRequest) {
  const profile = await getProfile()
  if (!profile) return unauthorized()
  const body = await req.json()
  const parse = CourseSchema.safeParse(body)
  if (!parse.success) {
    console.info(parse.error.errors)
    return badRequest(parse.error.formErrors.formErrors)
  }

  const [error, res] = await tryit(createCourse)(parse.data)
  if (error) return serverError(error)

  return created(res)
}

export async function PATCH(req: NextRequest) {
  const profile = await getProfile()
  if (!profile) return unauthorized()

  const body = await req.json()

  const parse = CourseUpdateSchema.safeParse(body)
  if (!parse.success) {
    console.info(parse.error)
    return badRequest(parse.error.formErrors.formErrors)
  }

  const [error, data] = await tryit(updateCourse)(parse.data)
  if (error) return serverError(error)

  return created(data)
}
