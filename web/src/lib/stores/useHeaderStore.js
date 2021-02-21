import create from 'zustand'

export const useHeaderStore = create(set => ({
  canGoBack: false,
  setCanGoBack: canGoBack => set({ canGoBack })
}))
