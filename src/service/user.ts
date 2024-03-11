import { db } from '#/lib/db'

import { getServerSession } from 'next-auth'
import { omit, tryit } from 'radash'

export async function getUser() {
  const session = await getServerSession()
  if (!session) return null

  const [error, user] = await tryit(db.user.findUniqueOrThrow)({
    where: { email: session.user.email, id: session.user.id },
  })

  if (error) return null

  return omit(user, ['password'])
}
