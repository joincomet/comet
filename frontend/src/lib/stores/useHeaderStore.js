import create from 'zustand'

export const useHeaderStore = create(set => ({
  title: 'Home',
  setTitle: title => set({ title }),
  canGoBack: false,
  setCanGoBack: canGoBack => set({ canGoBack })
}))
