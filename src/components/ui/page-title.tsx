import { cn } from '#/lib/utils'

import { Button } from './button'

import { isObject } from 'radash'

type TPageTitleProps = {
  title: string
  action?: {
    text: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
  }
}

export function PageTitle(props: TPageTitleProps) {
  return (
    <section
      className={cn(
        'flex items-center py-4',
        isObject(props.action) && 'justify-between',
      )}
    >
      <h1 className='text-2xl lg:text-4xl font-bold'>{props.title}</h1>

      {props.action && (
        <Button onClick={props.action.onClick}>{props.action.text}</Button>
      )}
    </section>
  )
}
