import { withSelectors } from '#/lib/zustand'

import { create } from 'zustand'

type TSetterFunctions = {
  setPending: () => void
  closeConfirmation: () => void
}

type TAlertPayload = {
  title: string
  description: string
  onConfirm: (fns: TSetterFunctions) => Promise<void> | void
}
type TOptionalAlertPayload = Partial<{
  confirmText: string
}>

type TStates = TAlertPayload & {
  isOpen: boolean
  isPending: boolean
  confirmText: string
}

type TActions = TSetterFunctions & {
  openConfirmation: (payload: TAlertPayload & TOptionalAlertPayload) => void
  toggleConfirmation: (nextValue?: boolean) => void
}

const store = create<TStates & TActions>((set) => ({
  isOpen: false,
  isPending: false,
  title: '',
  description: '',
  confirmText: 'Ya',
  onConfirm: async () => {},
  toggleConfirmation: (nextValue) =>
    set((prev) => ({ isOpen: nextValue ?? !prev.isOpen })),
  openConfirmation: (payload) => set({ ...payload, isOpen: true }),
  closeConfirmation: () => set({ isPending: false, isOpen: false }),
  setPending: () => set({ isPending: true }),
}))

export const useConfirmation = withSelectors(store)
