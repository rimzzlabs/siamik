import type { Role } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

export type TUseProfile = {
  id: string
  name: string
  image: string | null
  role: Role
}

export function useProfile(initialData: TUseProfile) {
  return useQuery({
    queryKey: ['get-profile'],
    queryFn: async () => {
      const res = await fetch('/api/profile')
      const data = (await res.json()) as TResponseApi<TUseProfile>
      return data.data
    },
    initialData,
  })
}
