import create from 'zustand'

export const useLoginStore = create(set => ({
  login: false,
  setLogin: login => set({ login })
}))
