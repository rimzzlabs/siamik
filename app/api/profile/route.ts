import { getProfile } from '#/service/profile'

import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { tryit } from 'radash'

export async function GET() {
  const res = NextResponse
  const session = await getServerSession()
  if (!session) return res.json({ message: 'Unauthorized!' }, { status: 401 })

  const [err, data] = await tryit(getProfile)()

  if (err) return res.json({ message: `Error: ${err.message}` }, { status: 500 })
  if (!data) return res.json({ message: `User not found` }, { status: 404 })

  return res.json({ message: 'success', data })
}
