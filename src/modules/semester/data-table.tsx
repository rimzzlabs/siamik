'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'

import { useSemester } from '#/queries/use-semester'

import { semesterColumns } from './column'
import { CreateSemesterDialog } from './create-dialog'

import type { Semester } from '@prisma/client'
import type { SortingState } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ScanSearchIcon } from 'lucide-react'
import { useState } from 'react'

type TProps = {
  data: Array<Semester>
}

export function SemesterDataTable(props: TProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const query = useSemester(props.data)

  const table = useReactTable({
    data: query.data,
    columns: semesterColumns,
    debugTable: true,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div>
      <div className='flex justify-end'>
        <CreateSemesterDialog initialData={props.data} />
      </div>

      <div className='rounded-md border mt-4 hidden md:block'>
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
                  colSpan={semesterColumns.length}
                  className='h-52 md:h-80 text-center space-y-2'
                >
                  <ScanSearchIcon className='mx-auto' size='4rem' />
                  <p>Belum ada data</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {table.getFooterGroups().length > 0 &&
            table.getRowModel().rows?.length > 0 && (
              <TableFooter>
                {table.getFooterGroups().map((group) => (
                  <TableRow key={group.id}>
                    {group.headers.map((header) => (
                      <TableCell key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.footer,
                              header.getContext(),
                            )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableFooter>
            )}
        </Table>
      </div>
    </div>
  )
}
