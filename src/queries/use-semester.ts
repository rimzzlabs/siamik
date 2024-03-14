import type { TSemesterSchema } from '#/validations/semester'

import type { Semester } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useSemester(initialData: Array<Semester>) {
  return useQuery({
    queryKey: ['get-all-semester'],
    queryFn: async () => {
      const resp = await fetch('/api/semester')
      const data = (await resp.json()) as TResponseApi<typeof initialData>
      return data.data
    },
    initialData,
  })
}

export function useCreateSemester() {
  const cq = useQueryClient()

  return useMutation({
    mutationFn: async (payload: TSemesterSchema) => {
      const resp = await fetch('/api/semester', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      })
      if (!resp.ok) {
        throw new Error('Semester ini sudah ditambahkan')
      }
      return await resp.json()
    },
    onSuccess: async () => cq.invalidateQueries({ queryKey: ['get-all-semester'] }),
  })
}
