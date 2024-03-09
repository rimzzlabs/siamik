'use client'

import { Button } from '#/components/ui/button'
import { SheetClose } from '#/components/ui/sheet'

import type { LinkProps } from 'next/link'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type TProps = Pick<LinkProps, 'href'> & {
  text: string
  icon: JSX.Element
  insideSheet?: boolean
}

export function DashboardMenuItem(props: TProps) {
  const pathname = usePathname()
  const variant = pathname === props.href ? 'default' : 'ghost'

  if (props.insideSheet) {
    return (
      <SheetClose asChild>
        <Button asChild className='w-full justify-normal gap-2' variant={variant}>
          <Link href={props.href}>
            {props.icon}
            {props.text}
          </Link>
        </Button>
      </SheetClose>
    )
  }

  return (
    <Button asChild className='w-full justify-normal gap-2' variant={variant}>
      <Link href={props.href}>
        {props.icon}
        {props.text}
      </Link>
    </Button>
  )
}
