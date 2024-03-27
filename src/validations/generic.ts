import { INVALID_FORM_MESSAGES } from '#/constants/auth'

import { z } from 'zod'

const regex = {
  numberPassword: /^.*\d.*$/,
  symbolPassword: /^(?=.*[^a-zA-Z0-9]).+$/,
}

export const password = z
  .string()
  .min(1, INVALID_FORM_MESSAGES.required)
  .min(8, INVALID_FORM_MESSAGES.minPassword)
  .max(80, INVALID_FORM_MESSAGES.maxPassword)
  .regex(regex.symbolPassword, INVALID_FORM_MESSAGES.symbolPassword)
  .regex(regex.numberPassword, INVALID_FORM_MESSAGES.numberSymbol)

export const email = z
  .string()
  .min(1, INVALID_FORM_MESSAGES.required)
  .email(INVALID_FORM_MESSAGES.invalidEmail)
