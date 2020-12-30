import create from 'zustand'

export const useHeaderStore = create(set => ({
  dark: false,
  setDark: dark => set({ dark }),
  sidebar: false,
  setSidebar: sidebar => set({ sidebar }),
  title: 'Home',
  setTitle: title => set({ title }),
  canGoBack: false,
  setCanGoBack: canGoBack => set({ canGoBack })
}))
