import type { Role } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

export function useProfile() {
  return useQuery({
    queryKey: ['get-profile'],
    queryFn: async () => {
      const res = await fetch('/api/profile')
      return (await res.json()) as TResponseApi<{
        id: string
        name: string
        email: string
        image: string | null
        role: Role
      }>
    },
    select: (data) => data.data,
  })
}
