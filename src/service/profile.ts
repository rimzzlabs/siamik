import { db } from '#/lib/db'

import { getServerSession } from 'next-auth'
import { tryit } from 'radash'

export async function getProfile() {
  const session = await getServerSession()

  if (!session) return null

  const [error, user] = await tryit(db.user.findUniqueOrThrow)({
    where: { id: session.user.id },
    select: { profile: true },
  })

  if (error) return null

  return user.profile
}
