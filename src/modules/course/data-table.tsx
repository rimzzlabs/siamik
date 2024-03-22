'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'

import { useCourse } from '#/queries/use-course'

import { courseColumns } from './columns'

import type { Course, Semester } from '@prisma/client'
import type { SortingState } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ScanSearchIcon } from 'lucide-react'
import { Fragment, useState } from 'react'

type TCourseDataTableProps = {
  initialData?: Array<Course & { semester: Semester }>
}

export function CourseDataTable(props: TCourseDataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const query = useCourse(props.initialData)

  const table = useReactTable({
    data: query.data,
    columns: courseColumns,
    debugTable: true,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <Fragment>
      <div className='rounded-md border mt-4'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={courseColumns.length}
                  className='h-52 md:h-80 text-center space-y-2'
                >
                  <ScanSearchIcon className='mx-auto' size='4rem' />
                  <p>Belum ada data</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Fragment>
  )
}
