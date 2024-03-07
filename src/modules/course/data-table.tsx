'use client'

import { Button } from '#/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'

import type { Course, Lecturer } from '@prisma/client'
import type { SortingState } from '@tanstack/react-table'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ClipboardIcon, MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

const columnHelper = createColumnHelper<Course & { lecturer: Lecturer }>()

const columns = [
  columnHelper.display({
    id: 'no',
    header: '#',
    maxSize: 1,
    cell(props) {
      return props.row.index + 1
    },
  }),
  columnHelper.accessor('id', { header: 'ID Mata Kuliah' }),
  columnHelper.accessor('credit', { header: 'Jumlah SKS' }),
  columnHelper.accessor('name', {
    header: 'Nama Mata Kuliah',
  }),
  columnHelper.accessor('lecturer.name', {
    header: 'Dosen',
    footer(props) {
      const sksCount = props.table
        .getRowModel()
        .rows.reduce((acc, cur) => acc + cur.original.credit, 0)

      return 'Jumlah SKS: ' + sksCount
    },
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Aksi',
    footer(props) {
      return 'Jumlah mata kuliah: ' + props.table.getRowCount()
    },
    cell: ({ row }) => {
      const course = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Buka menu</span>
              <MoreHorizontalIcon className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Menu aksi</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard
                  .writeText(course.id)
                  .finally(() => toast.success('Sukses menyalin ID mata kuliah'))
              }
            >
              <ClipboardIcon size='.875rem' className='mr-1' />
              Salin ID mata kuliah
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Button size='sm' variant='ghost' className='w-full justify-normal'>
                <PencilIcon size='.875rem' className='mr-1' />
                Edit mata kuliah ini
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                size='sm'
                variant='ghost'
                className='w-full justify-normal hover:bg-red-700 dark:hover:bg-red-900'
              >
                <Trash2Icon size='.875rem' className='mr-1' />
                Hapus mata kuliah ini
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }),
]

type TProps = {
  data: Array<Course & { lecturer: Lecturer }>
}

export function CourseDataTable(props: TProps) {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    columns,
    data: props.data,
    debugTable: true,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className='rounded-md border mt-4'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} colSpan={header.getSize()}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} colSpan={cell.column.getSize()}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {table.getFooterGroups().length > 0 && (
          <TableFooter>
            {table.getFooterGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableCell colSpan={header.getSize()} key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.footer, header.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableFooter>
        )}
      </Table>
    </div>
  )
}
