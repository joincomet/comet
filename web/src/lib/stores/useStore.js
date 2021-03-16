import create from 'zustand'

export const useStore = create(set => ({
  friendsPage: 'Online',
  setFriendsPage: friendsPage => set({ friendsPage }),
  explorePage: 'featured',
  setExplorePage: explorePage => set({ explorePage }),
  postsSort: 'hot',
  setPostsSort: postsSort => set({ postsSort }),
  commentsSort: 'top',
  setCommentsSort: commentsSort => set({ commentsSort })
}))
