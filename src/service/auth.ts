import { db } from '@/lib/db'
import type { TSignInSchema } from '@/validations/auth'

import bcrypt from 'bcrypt'

export async function signInWithEmail(payload: TSignInSchema) {
  const user = await db.user.findUniqueOrThrow({
    where: { email: payload.email },
    select: {
      id: true,
      image: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      password: true,
    },
  })

  const isAuthorized = await bcrypt.compare(payload.password, user.password)

  if (!isAuthorized) throw new Error('Unauthorized')

  return user
}
