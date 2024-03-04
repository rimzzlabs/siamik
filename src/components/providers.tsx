'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider, useTheme } from 'next-themes'
import { Toaster } from 'sonner'
import { match } from 'ts-pattern'

const client = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

export function Providers(props: React.PropsWithChildren) {
  const { theme } = useTheme()
  const toastTheme = match(theme)
    .with('light', (theme) => theme)
    .with('dark', (theme) => theme)
    .otherwise(() => 'system' as const)

  return (
    <SessionProvider>
      <ThemeProvider attribute='class' defaultTheme='system' disableTransitionOnChange>
        <QueryClientProvider client={client}>
          {props.children}
          <ReactQueryDevtools />
        </QueryClientProvider>
        <Toaster position='top-right' theme={toastTheme} duration={2500} richColors />
      </ThemeProvider>
    </SessionProvider>
  )
}
