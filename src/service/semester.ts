import { db } from '#/lib/db'

import { getProfile } from './profile'

import { tryit } from 'radash'

export async function getAllSemester() {
  const profile = await getProfile()
  if (!profile) return []

  const [error, data] = await tryit(db.semester.findMany)({ orderBy: { grade: 'asc' } })
  if (error) return []

  return data
}
