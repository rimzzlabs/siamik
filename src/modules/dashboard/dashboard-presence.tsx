'use client'

import { DateRangePicker } from '#/components/ui/date-range-picker'

import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { list, random, uid } from 'radash'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const chartsData = list(1, 30, (n) => ({
  id: uid(64),
  'semester 1': random(1, 400),
  'semester 3': random(1, 250),
  'semester 5': random(1, 280),
  date: format(new Date(2024, 0, n), 'd MMMM yyyy', { locale: id }),
}))

export function DashboardPresence() {
  const [dates, setDates] = useState<DateRange>()

  return (
    <div className='py-4'>
      <div className='flex items-center justify-between pb-4'>
        <h2 className='text-lg lg:text-xl font-semibold'>Daftar hadir mahasiswa</h2>
        <DateRangePicker date={dates} onChange={setDates} />
      </div>

      <section className='h-96 lg:h-[calc(100svh-22.25rem)]'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart
            title='Daftar hadir mahasiswa'
            dataKey='id'
            width={800}
            height={500}
            data={chartsData}
          >
            <CartesianGrid
              strokeDasharray='3 3'
              className='stroke-gray-200 dark:stroke-gray-800'
            />
            <Tooltip
              labelClassName='dark:!text-white'
              wrapperClassName='dark:!bg-background dark:!border-gray-800'
            />
            <XAxis dataKey='date' className='text-xs' />
            <YAxis className='text-xs' />
            <Area
              type='basis'
              dataKey='semester 1'
              stackId='1'
              stroke='#10b981'
              fill='#10b77fcc'
            />
            <Area
              type='basis'
              dataKey='semester 3'
              stackId='1'
              stroke='#06b6d4'
              fill='#06b6d4cc'
            />
            <Area
              type='basis'
              dataKey='semester 5'
              stackId='1'
              stroke='#6366f1'
              fill='#6366f1cc'
            />
            <XAxis dataKey='date' className='text-xs fill-primary' />
          </AreaChart>
        </ResponsiveContainer>
      </section>
    </div>
  )
}
