import { ok, unauthorized } from '#/lib/api-route'
import { getProfile } from '#/service/profile'

export async function GET() {
  const profile = await getProfile()

  if (!profile) return unauthorized()

  return ok(profile)
}
