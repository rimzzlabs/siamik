import { INVALID_FORM_MESSAGES } from '#/constants/auth'

import { email } from './generic'

import { z } from 'zod'

export const CreateLecturerSchema = z.object({
  email,
  name: z
    .string()
    .min(1, INVALID_FORM_MESSAGES.required)
    .max(80, 'Umumnya nama tidak lebih dari 80 karaketer'),
})

export const UpdateLecturerSchema = z.object({
  email,
  id: z.string().min(1, INVALID_FORM_MESSAGES.required),
  name: z
    .string()
    .min(1, INVALID_FORM_MESSAGES.required)
    .max(80, 'Umumnya nama tidak lebih dari 80 karaketer'),
})

export type TCreateLecturerSchema = z.infer<typeof CreateLecturerSchema>
export type TUpdateLecturerSchema = z.infer<typeof UpdateLecturerSchema>
