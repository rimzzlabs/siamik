import { formatLongDate } from '#/lib/date'
import type { AllLecturer } from '#/service/lecturer'

import { LecturerRowAction } from './row-action'

import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<AllLecturer[0]>()

export const lecturerColumns = [
  columnHelper.display({
    header: '#',
    cell(props) {
      return props.row.index + 1
    },
  }),
  columnHelper.accessor('id', { header: 'ID Dosen' }),
  columnHelper.accessor('name', { header: 'Nama Dosen' }),
  columnHelper.accessor('email', { header: 'Email Dosen' }),
  columnHelper.accessor('createdAt', {
    header: 'Dibuat',
    cell: (props) => formatLongDate(props.getValue()),
  }),
  columnHelper.accessor('updatedAt', {
    header: 'Terakhir diperbarui',
    cell: (props) => formatLongDate(props.getValue()),
  }),
  columnHelper.display({
    header: 'Aksi',
    cell: (props) => <LecturerRowAction {...props.row.original} />,
  }),
]
