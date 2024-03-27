import type { DashboardStatistics } from '#/service/dashboard'

import { useQuery } from '@tanstack/react-query'

export type TDashboardResponse = {
  lecturers: number
  courses: number
  students: number
}

async function getDashboardStatistics() {
  const resp = await fetch('/api/dashboard')
  const data = (await resp.json()) as TResponseApi<DashboardStatistics>

  return data.data
}

export function useDashboard(initialData?: DashboardStatistics) {
  return useQuery({
    queryKey: ['get-dashboard-statistics'],
    queryFn: getDashboardStatistics,
    initialData,
  })
}
