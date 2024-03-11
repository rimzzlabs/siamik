import { db } from '#/lib/db'

import { getServerSession } from 'next-auth'

export async function getProfile() {
  const session = await getServerSession()
  if (!session) throw new Error('Unauthorized')

  const user = await db.user.findUnique({
    where: { id: session.user.id, email: session.user.email },
    select: { profile: true },
  })

  if (!user) throw new Error('Profile not found')

  return user.profile
}
