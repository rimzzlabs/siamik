import type { Semester } from '@prisma/client'
import { match } from 'ts-pattern'

export function getSemesterText(grade: Semester['grade']) {
  const base = 'Semester '
  return match(grade)
    .with('FIRST', () => base + '1')
    .with('SECOND', () => base + '2')
    .with('THIRD', () => base + '3')
    .with('FOURTH', () => base + '4')
    .with('FIFTH', () => base + '5')
    .with('SIXTH', () => base + '6')
    .otherwise(() => 'Semester -')
}
