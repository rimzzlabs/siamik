import { badRequest, ok, serverError, unauthorized } from '#/lib/api-route'
import { deleteCourse } from '#/service/course'
import { getProfile } from '#/service/profile'

import type { NextRequest } from 'next/server'
import { tryit } from 'radash'

type Params = {
  id: string
}

export async function DELETE(req: NextRequest, ctx: { params: Params }) {
  const profile = await getProfile()
  if (!profile) return unauthorized()

  if (!ctx.params.id) return badRequest(['Missing lecturer id'])

  const [error, res] = await tryit(deleteCourse)(ctx.params.id)

  if (error) return serverError(error)

  return ok({ id: res.id })
}
