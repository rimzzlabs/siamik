'use client'

import { useSearchParams } from 'next/navigation'
import { Fragment } from 'react'
import { match } from 'ts-pattern'

type TProps = {
  create: React.ReactNode
  update: React.ReactNode
}

export default function Layout(props: TProps) {
  const searchParams = useSearchParams()
  const type = searchParams.get('type')

  const renderPage = match(type)
    .with('update', () => props.update)
    .otherwise(() => props.create)

  return <Fragment>{renderPage}</Fragment>
}
