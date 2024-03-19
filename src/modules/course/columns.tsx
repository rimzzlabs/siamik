import { Badge } from '#/components/ui/badge'

import { formatLongDate } from '#/lib/date'
import { getSemesterText } from '#/lib/semester'

import { RowActionCourse } from './row-action'

import type { Course, Semester } from '@prisma/client'
import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<Course & { semester: Semester }>()

export const courseColumns = [
  columnHelper.display({ header: '#', cell: (props) => props.row.index + 1 }),
  columnHelper.accessor('name', { header: 'Nama MK' }),
  columnHelper.accessor('credit', {
    header: 'Jumlah SKS',
    cell: (props) => <Badge variant='secondary'>{props.getValue()} SKS</Badge>,
  }),
  columnHelper.accessor('semester.grade', {
    header: 'Semester',
    cell: (props) => getSemesterText(props.getValue()),
  }),
  columnHelper.accessor('createdAt', {
    header: 'Dibuat pada',
    cell: (props) => formatLongDate(props.getValue()),
  }),
  columnHelper.accessor('updatedAt', {
    header: 'Terakhir diperbarui',
    cell: (props) => formatLongDate(props.getValue()),
  }),
  columnHelper.display({
    header: 'Aksi',
    cell: (props) => <RowActionCourse {...props.row.original} />,
  }),
]
