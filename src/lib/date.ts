import { format } from 'date-fns'
import { id } from 'date-fns/locale'

export function formatLongDate(date: string | Date) {
  return format(date, 'PPPP HH:mm', { locale: id })
}
