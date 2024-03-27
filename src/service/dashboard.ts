import { getAllCourse } from './course'
import { getAllLecturer } from './lecturer'
import { getProfile } from './profile'
import { getAllStudent } from './student'

export async function getDashboardStatistics() {
  const profile = await getProfile()
  if (!profile) return { counter: { lecturer: 0, course: 0, student: 0 } }

  const [allLecturer, allCourse, allStudent] = await Promise.all([
    getAllLecturer(),
    getAllCourse(),
    getAllStudent(),
  ])

  return {
    counter: {
      lecturer: allLecturer.length,
      course: allCourse.length,
      student: allStudent.length,
    },
  }
}

export type DashboardStatistics = Awaited<ReturnType<typeof getDashboardStatistics>>
