import { INVALID_FORM_MESSAGES } from '#/constants/auth'

import { email, password } from './generic'

import { z } from 'zod'

export const CreateStudentSchema = z.object({
  email,
  password,
  image: z.string().optional(),
  name: z.string().min(1, INVALID_FORM_MESSAGES.required),
  nim: z
    .string()
    .min(1, INVALID_FORM_MESSAGES.required)
    .max(9, 'Maksimal karakter pada NIM adalah 9'),
  semesterId: z.string().min(1, INVALID_FORM_MESSAGES.required),
})

export type TCreateStudentSchema = z.infer<typeof CreateStudentSchema>
