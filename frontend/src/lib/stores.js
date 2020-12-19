import create from 'zustand'

export const useHeaderStore = create(set => ({
  dark: false,
  setDark: d => set({ dark: d })
}))
