import { db } from '#/lib/db'
import type { TSignInSchema } from '#/validations/auth'

import bcrypt from 'bcrypt'
import { omit } from 'radash'

export async function signInWithEmail(payload: TSignInSchema) {
  const user = await db.user.findUniqueOrThrow({
    where: { email: payload.email },
    select: {
      id: true,
      email: true,
      createdAt: true,
      password: true,
      profile: true,
    },
  })

  const isAuthorized = await bcrypt.compare(payload.password, user.password)

  if (!isAuthorized) throw new Error('Unauthorized')

  return omit(user, ['password'])
}
