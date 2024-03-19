import type { TCourseSchema, TCourseUpdateSchema } from '#/validations/course'

import type { Course } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

async function getCourse() {
  const resp = await fetch('/api/course')
  if (!resp.ok) throw new Error(resp.statusText)
  const data = (await resp.json()) as TResponseApi<Array<Course>>

  return data.data
}

async function createCourse(payload: TCourseSchema) {
  const resp = await fetch('/api/course', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!resp.ok) throw new Error(resp.statusText)

  return await resp.json()
}

async function updateCourse(payload: TCourseUpdateSchema) {
  const resp = await fetch('/api/course', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!resp.ok) throw new Error(resp.statusText)

  return await resp.json()
}

async function deleteCourse(courseId: string) {
  const resp = await fetch(`/api/course/${courseId}`, {
    method: 'DELETE',
  })
  if (!resp.ok) throw new Error(resp.statusText)

  return await resp.json()
}

export function useCourse(initialData: Array<Course> = []) {
  return useQuery({ queryKey: ['get-all-course'], queryFn: getCourse, initialData })
}

export function useCreateCourse() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: createCourse,
    onSuccess: async () => await qc.invalidateQueries({ queryKey: ['get-all-course'] }),
  })
}

export function useUpdateCourse() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: updateCourse,
    onSuccess: async () => await qc.invalidateQueries({ queryKey: ['get-all-course'] }),
  })
}

export function useDeleteCourse() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: async () => await qc.invalidateQueries({ queryKey: ['get-all-course'] }),
  })
}
