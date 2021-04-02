import create from 'zustand'

export const useStore = create((set, get) => ({
  friendsPage: 'Online',
  setFriendsPage: friendsPage => set({ friendsPage }),
  inboxPage: 'Unread',
  setInboxPage: inboxPage => set({ inboxPage }),
  explorePage: 'Featured',
  setExplorePage: explorePage => set({ explorePage }),
  postsSort: 'Hot',
  setPostsSort: postsSort => set({ postsSort }),
  postsTime: 'Day',
  setPostsTime: postsTime => set({ postsTime }),
  commentsSort: 'Top',
  setCommentsSort: commentsSort => set({ commentsSort }),
  liveMode: false,
  setLiveMode: liveMode => set({ liveMode }),

  // Right Sidebar Toggles
  showFolders: true,
  setShowFolders: showFolders => set({ showFolders }),
  showUsers: true,
  setShowUsers: showUsers => set({ showUsers }),

  serverPages: {},
  setServerPage: (serverId, page) =>
    set({ serverPages: { ...get().serverPages, [serverId]: page } }),
  homePage: null,
  setHomePage: page => set({ homePage: page })
}))
