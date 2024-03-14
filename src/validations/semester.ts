import { SemesterGrade } from '@prisma/client'
import { z } from 'zod'

export const SemesterSchema = z.object({
  grade: z.enum(
    [
      SemesterGrade.FIRST,
      SemesterGrade.SECOND,
      SemesterGrade.THIRD,
      SemesterGrade.FOURTH,
      SemesterGrade.FIFTH,
      SemesterGrade.SIXTH,
    ],
    {
      errorMap() {
        return { message: 'Harap pilih opsi antara semester 1 sampai semester 6' }
      },
    },
  ),
})

export type TSemesterSchema = z.infer<typeof SemesterSchema>
