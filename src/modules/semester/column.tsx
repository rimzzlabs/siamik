'use client'

import { formatLongDate } from '#/lib/date'

import type { Semester } from '@prisma/client'
import { createColumnHelper } from '@tanstack/react-table'
import { match } from 'ts-pattern'

const columnHelper = createColumnHelper<Semester>()

export const semesterColumns = [
  columnHelper.display({
    id: 'no',
    header: '#',
    maxSize: 1,
    cell(props) {
      return props.row.index + 1
    },
  }),
  columnHelper.accessor('id', { header: 'ID Semester' }),
  columnHelper.accessor('grade', {
    header: 'Semester Kelas',
    cell(props) {
      const prefix = (value: number) => 'Semester ' + value
      return match(props.getValue())
        .with('FIRST', () => prefix(1))
        .with('SECOND', () => prefix(2))
        .with('THIRD', () => prefix(3))
        .with('FOURTH', () => prefix(4))
        .with('FIFTH', () => prefix(5))
        .otherwise(() => prefix(6))
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
]
