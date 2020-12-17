import create from 'zustand'

export const useLoginStore = create(set => ({
  open: false,
  openLoginModal: () => set({ open: true }),
  closeLoginModal: () => set({ open: false })
}))

export const useHeaderStore = create(set => ({
  dark: false,
  setDark: d => set({ dark: d })
}))
