import type { AllStudent } from '#/service/student'
import type { TCreateStudentSchema } from '#/validations/student'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { match } from 'ts-pattern'

async function createStudent(payload: TCreateStudentSchema) {
  const body = JSON.stringify(payload)
  const resp = await fetch('/api/student', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  })
  if (!resp.ok) {
    const statusText = match(resp)
      .with({ status: 409 }, () => {
        return 'Mahasiswa dengan data NIM atau email ini sudah ada, tidak bisa ditambahkan'
      })
      .otherwise((resp) => resp.statusText)

    throw new Error(statusText)
  }
  return await resp.json()
}

async function getAllStudent() {
  const resp = await fetch('/api/student')
  const data = (await resp.json()) as TResponseApi<AllStudent>
  return data.data
}

export function useStudent(initialData?: AllStudent) {
  return useQuery({
    queryKey: ['get-all-student'],
    queryFn: getAllStudent,
    initialData,
  })
}

export function useCreateStudent() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: createStudent,
    onSuccess: async () =>
      await qc.invalidateQueries({ queryKey: ['get-all-student'] }),
  })
}
