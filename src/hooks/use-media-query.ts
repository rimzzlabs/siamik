import { useSyncExternalStore } from 'react'

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (listener) => {
      window.matchMedia(query).addEventListener('change', listener)

      return () => window.matchMedia(query).removeEventListener('change', listener)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}
