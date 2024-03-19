import { useCallback, useState } from 'react'

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(
    (nextValue?: boolean) => setValue((prev) => nextValue ?? !prev),
    [],
  )

  return [value, toggle] as const
}
