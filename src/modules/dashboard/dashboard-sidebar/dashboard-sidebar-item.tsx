'use client'

import { Button } from '#/components/ui/button'

import type { LinkProps } from 'next/link'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type TProps = Pick<LinkProps, 'href'> & {
  text: string
  icon: JSX.Element
}

export function DashboardSidebarItem(props: TProps) {
  const pathname = usePathname()
  const variant = pathname === props.href ? 'default' : 'ghost'

  return (
    <Button asChild className='w-full justify-normal gap-2' variant={variant}>
      <Link href={props.href}>
        {props.icon}
        {props.text}
      </Link>
    </Button>
  )
}
