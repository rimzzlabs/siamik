'use client'

import { Button } from '#/components/ui/button'
import { Calendar } from '#/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '#/components/ui/popover'

import { cn } from '#/lib/utils'

import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'
import { P, match } from 'ts-pattern'

type TDatePickerProps = {
  date: Date
  onChange: React.Dispatch<React.SetStateAction<Date | undefined>>
  datePicker?: React.ComponentProps<typeof Calendar>
}
export function DatePicker(props: TDatePickerProps) {
  const datePickerProps = props.datePicker

  const label = match(props.date)
    .with(P.instanceOf(Date), (date) => format(date, 'PPP', { locale: id }))
    .otherwise(() => 'Pilih tanggal')

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !props.date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          <span className='text-sm'>{label}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          {...datePickerProps}
          mode='single'
          selected={props.date}
          onSelect={props.onChange}
        />
      </PopoverContent>
    </Popover>
  )
}
