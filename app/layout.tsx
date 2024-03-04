import { Providers } from '#/components/providers'

import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'recharts/'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sistem Akademik AMIK Serang',
  description: 'Next.js Fullstack with PostgreSQL Neon Database',
}

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang='id' suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  )
}
