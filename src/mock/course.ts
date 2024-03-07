import type { Course, Lecturer } from '@prisma/client'

// Semesters
export const semesters = [
  { id: 'sem1', name: 'Fall 2023' },
  { id: 'sem2', name: 'Spring 2024' },
  { id: 'sem3', name: 'Fall 2024' },
]

export const lecturers = [
  {
    id: 'lec1',
    name: 'John Doe',
    email: 'john@example.com',
    semesters: [semesters[0], semesters[1]],
  },
  {
    id: 'lec2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    semesters: [semesters[1], semesters[2]],
  },
  {
    id: 'lec3',
    name: 'Michael Johnson',
    email: 'michael@example.com',
    semesters: [semesters[0], semesters[2]],
  },
  {
    id: 'lec4',
    name: 'Emily Davis',
    email: 'emily@example.com',
    semesters: [semesters[1]],
  },
  {
    id: 'lec5',
    name: 'Robert Wilson',
    email: 'robert@example.com',
    semesters: [semesters[2]],
  },
]

// Courses
export const courses: Array<Course & { lecturer: Lecturer }> = [
  {
    id: 'crs1',
    name: 'Introduction to Computer Science',
    credit: 3,
    semesterId: semesters[0].id,
    lecturer: lecturers[0],
  },
  {
    id: 'crs2',
    name: 'Data Structures and Algorithms',
    credit: 4,
    semesterId: semesters[1].id,
    lecturer: lecturers[1],
  },
  {
    id: 'crs3',
    name: 'Web Development',
    credit: 3,
    semesterId: semesters[1].id,
    lecturer: lecturers[2],
  },
  {
    id: 'crs4',
    name: 'Database Systems',
    credit: 3,
    semesterId: semesters[2].id,
    lecturer: lecturers[2],
  },
  {
    id: 'crs5',
    name: 'Artificial Intelligence',
    credit: 4,
    semesterId: semesters[0].id,
    lecturer: lecturers[1],
  },
  {
    id: 'crs6',
    name: 'Computer Networks',
    credit: 3,
    semesterId: semesters[1].id,
    lecturer: lecturers[2],
  },
  {
    id: 'crs7',
    name: 'Operating Systems',
    credit: 3,
    semesterId: semesters[2].id,
    lecturer: lecturers[3],
  },
  {
    id: 'crs8',
    name: 'Software Engineering',
    credit: 4,
    semesterId: semesters[0].id,
    lecturer: lecturers[3],
  },
  {
    id: 'crs9',
    name: 'Mobile App Development',
    credit: 3,
    semesterId: semesters[1].id,
    lecturer: lecturers[3],
  },
  {
    id: 'crs10',
    name: 'Computer Graphics',
    credit: 3,
    semesterId: semesters[2].id,
    lecturer: lecturers[1],
  },
]
