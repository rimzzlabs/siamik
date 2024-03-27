import { ok, unauthorized } from '#/lib/api-route'
import { getDashboardStatistics } from '#/service/dashboard'
import { getProfile } from '#/service/profile'

export async function GET() {
  const profile = await getProfile()
  if (!profile) return unauthorized()

  const data = await getDashboardStatistics()

  return ok(data)
}
