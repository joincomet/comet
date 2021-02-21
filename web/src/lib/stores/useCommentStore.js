import create from 'zustand'

export const useCommentStore = create(set => ({
  createComment: false,
  setCreateComment: createComment => set({ createComment })
}))
