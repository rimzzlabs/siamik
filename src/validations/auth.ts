import { FORM_MESSAGE } from '#/src/constant/auth'

import { z } from 'zod'

export const SignInSchema = z.object({
  email: z.string().min(1, FORM_MESSAGE.required).email(FORM_MESSAGE.invalidEmail),
  password: z.string().min(1, FORM_MESSAGE.required),
})

export type TSignInSchema = z.infer<typeof SignInSchema>
