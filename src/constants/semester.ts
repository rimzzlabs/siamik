import { SemesterGrade } from '@prisma/client'

export const semesterYearOptions = ((currentYear: number) => {
  return Array.from({ length: currentYear - 1994 }, (_, index) => 1995 + index)
})(new Date().getFullYear())

export const semesterGradeOptions = [
  { text: 'Semester 1', value: SemesterGrade.FIRST },
  { text: 'Semester 2', value: SemesterGrade.SECOND },
  { text: 'Semester 3', value: SemesterGrade.THIRD },
  { text: 'Semester 4', value: SemesterGrade.FOURTH },
  { text: 'Semester 5', value: SemesterGrade.FIFTH },
  { text: 'Semester 6', value: SemesterGrade.SIXTH },
]
