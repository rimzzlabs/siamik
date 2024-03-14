import { db } from '#/lib/db'
import type { TSignInSchema } from '#/validations/auth'

import bcrypt from 'bcrypt'

export async function signInWithEmail(payload: TSignInSchema) {
  const user = await db.user.findUniqueOrThrow({
    where: { email: payload.email },
    include: { profile: true },
  })

  const profile = user?.profile
  if (!user || !profile) throw new Error('User not found')

  const isAuthorized = await bcrypt.compare(payload.password, user.password)

  if (!isAuthorized) throw new Error('Unauthorized')

  return { id: user.id, email: user.email, profile }
}
