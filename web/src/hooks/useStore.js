import create from 'zustand'

export const useStore = create((set, get) => ({
  friendsPage: 'Online',
  setFriendsPage: friendsPage => set({ friendsPage }),
  inboxPage: 'Unread',
  setInboxPage: inboxPage => set({ inboxPage }),
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
  setHomePage: page => set({ homePage: page }),

  replyingCommentId: null,
  setReplyingCommentId: commentId => set({ replyingCommentId: commentId }),

  canGoBack: false,
  setCanGoBack: canGoBack => set({ canGoBack }),

  exploreSort: 'Featured',
  setExploreSort: exploreSort => set({ exploreSort }),
  exploreCategory: null,
  setExploreCategory: exploreCategory => set({ exploreCategory }),

  dialogUser: null,
  setDialogUser: user => set({ dialogUser: user, userDialogOpen: !!user }),
  userDialogOpen: false,
  setUserDialogOpen: open => set({ userDialogOpen: open }),

  folderSort: 'Added',
  setFolderSort: sort => set({ folderSort: sort })
}))
