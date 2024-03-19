import { INVALID_FORM_MESSAGES } from '#/constants/auth'

import { z } from 'zod'

export const CourseSchema = z.object({
  name: z
    .string()
    .min(1, INVALID_FORM_MESSAGES.required)
    .max(80, 'Maksimal nama mata kuliah adalah 80 karakter'),
  credit: z.preprocess(
    (a) => {
      return parseInt(z.string().parse(typeof a === 'number' ? String(a) : a))
    },
    z.number().gt(0, 'SKS harus lebih dari 0').lte(5, 'SKS tidak boleh lebih dari 5'),
  ),
  semesterId: z.string().min(1, 'Harap pilih semester'),
})

export const CourseUpdateSchema = z.object({
  id: z.string().min(1, INVALID_FORM_MESSAGES.required),
  name: z
    .string()
    .min(1, INVALID_FORM_MESSAGES.required)
    .max(80, 'Maksimal nama mata kuliah adalah 80 karakter'),
  credit: z.preprocess(
    (a) => {
      return parseInt(z.string().parse(typeof a === 'number' ? String(a) : a))
    },
    z.number().gt(0, 'SKS harus lebih dari 0').lte(5, 'SKS tidak boleh lebih dari 5'),
  ),
  semesterId: z.string().min(1, 'Harap pilih semester'),
})

export type TCourseUpdateSchema = z.infer<typeof CourseUpdateSchema>

export type TCourseSchema = z.infer<typeof CourseSchema>
