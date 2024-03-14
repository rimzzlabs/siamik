import { authConfig } from '#/lib/auth'
import { db } from '#/lib/db'

import { getServerSession } from 'next-auth'
import { tryit } from 'radash'

export async function getProfile() {
  const session = await getServerSession(authConfig)

  if (!session) return null

  const [error, user] = await tryit(db.user.findUniqueOrThrow)({
    where: { id: session.user.userId },
    select: { profile: true, email: true },
  })

  if (error) return null
  if (!user.profile) return null

  return { email: user.email, ...user.profile }
}
