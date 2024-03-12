'use client'

import { Toaster } from '#/components/ui/sonner'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'

const client = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

export function Providers(props: React.PropsWithChildren) {
  return (
    <SessionProvider>
      <ThemeProvider attribute='class' defaultTheme='system' disableTransitionOnChange>
        <QueryClientProvider client={client}>
          {props.children}
          <ReactQueryDevtools />
        </QueryClientProvider>
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  )
}
