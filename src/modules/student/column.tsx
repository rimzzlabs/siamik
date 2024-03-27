'use client'

import { formatLongDate } from '#/lib/date'
import { getSemesterText } from '#/lib/semester'
import type { AllStudent } from '#/service/student'

import { StudentRowAction } from './row-action'

import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<AllStudent[0]>()

export const studentColumns = [
  columnHelper.display({
    id: 'no',
    header: '#',
    maxSize: 1,
    cell(props) {
      return props.row.index + 1
    },
  }),
  columnHelper.accessor('nim', {
    header: 'NIM Mahasiswa',
  }),
  columnHelper.accessor('name', {
    header: 'Nama Lengkap',
  }),
  columnHelper.accessor('email', {
    header: 'Alamat Email',
  }),
  columnHelper.accessor('semester.grade', {
    header: 'Semester',
    cell(props) {
      return getSemesterText(props.getValue())
    },
  }),
  columnHelper.accessor('createdAt', {
    header: 'Dibuat pada',
    cell(props) {
      return formatLongDate(props.getValue())
    },
  }),
  columnHelper.accessor('updatedAt', {
    header: 'Terakhir diubah',
    cell(props) {
      return formatLongDate(props.getValue())
    },
  }),
  columnHelper.display({
    header: 'Aksi',
    cell(props) {
      const data = props.row.original

      return <StudentRowAction {...data} />
    },
  }),
]
