import { getProfile } from '#/service/profile'

import { NextResponse } from 'next/server'

export async function GET() {
  const res = NextResponse
  const profile = await getProfile()
  if (!profile)
    return res.json({ message: 'Unauthorized!', data: null }, { status: 401 })

  return res.json({ message: 'success', data: profile })
}
