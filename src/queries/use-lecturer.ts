import type { AllLecturer } from '#/service/lecturer'
import type {
  TCreateLecturerSchema,
  TUpdateLecturerSchema,
} from '#/validations/lecturer'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useLecturer(initialData: AllLecturer) {
  return useQuery({
    queryKey: ['get-all-lecturer'],
    queryFn: async () => {
      const resp = await fetch('/api/lecturer')
      const data = (await resp.json()) as TResponseApi<AllLecturer>
      return data.data
    },
    initialData,
  })
}

export function useCreateLecturer() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (payload: TCreateLecturerSchema) => {
      const body = JSON.stringify(payload)

      const resp = await fetch('/api/lecturer', {
        body,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = (await resp.json()) as TResponseApi<{ email: string }>

      if (!resp.ok) throw new Error(data?.message)

      return data
    },
    onSuccess: async () =>
      await qc.invalidateQueries({ queryKey: ['get-all-lecturer'] }),
  })
}

export function useUpdateLecturer() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (payload: TUpdateLecturerSchema) => {
      const body = JSON.stringify(payload)

      const resp = await fetch('/api/lecturer', {
        body,
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = (await resp.json()) as TResponseApi<{ email: string }>

      if (!resp.ok) throw new Error(data?.message)

      return data
    },
    onSuccess: async () =>
      await qc.invalidateQueries({ queryKey: ['get-all-lecturer'] }),
  })
}

export function useDeleteLecturer() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (lecturerId: string) => {
      const resp = await fetch('/api/lecturer/' + lecturerId, {
        method: 'DELETE',
      })
      const data = (await resp.json()) as TResponseApi<{ email: string }>

      if (!resp.ok) throw new Error(data?.message)

      return data
    },
    onSuccess: async () =>
      await qc.invalidateQueries({ queryKey: ['get-all-lecturer'] }),
  })
}
