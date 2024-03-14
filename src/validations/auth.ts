import { INVALID_FORM_MESSAGES } from '#/constants/auth'

import { email } from './generic'

import { z } from 'zod'

export const SignInSchema = z.object({
  email,
  password: z.string().min(1, INVALID_FORM_MESSAGES.required),
})

export type TSignInSchema = z.infer<typeof SignInSchema>
