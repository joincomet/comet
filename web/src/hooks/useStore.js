import create from 'zustand'
import {getOS} from "@/utils/getOS";

export const useStore = create((set, get) => ({
  friendsPage: 'Online', // Online, All, Pending, Blocked, Add
  setFriendsPage: friendsPage => set({ friendsPage }),
  inboxPage: 'Unread', // Unread, All
  setInboxPage: inboxPage => set({ inboxPage }),
  postsSort: 'Hot', // Hot, Top, New
  setPostsSort: postsSort => set({ postsSort }),
  postsTime: 'Day', // Hour, Day, Week, Month, Year, All
  setPostsTime: postsTime => set({ postsTime }),
  postsFeed: 'Joined', // Joined, Featured, All
  setPostsFeed: postsFeed => set({ postsFeed }),
  commentsSort: 'Top',
  setCommentsSort: commentsSort => set({ commentsSort }),
  liveMode: false,
  setLiveMode: liveMode => set({ liveMode }),

  serverPages: {},
  setServerPage: (name, page) =>
    set({ serverPages: { ...get().serverPages, [name]: page } }),
  homePage: null,
  setHomePage: page => set({ homePage: page }),

  replyingCommentId: null,
  setReplyingCommentId: commentId => set({ replyingCommentId: commentId }),

  canGoBack: false,
  setCanGoBack: canGoBack => set({ canGoBack }),

  exploreSort: 'Top',
  setExploreSort: exploreSort => set({ exploreSort }),
  exploreCategory: null,
  setExploreCategory: exploreCategory => set({ exploreCategory }),

  dialogUserId: null,
  setDialogUserId: userId =>
    set({ dialogUserId: userId, userDialogOpen: !!userId }),
  userDialogOpen: false,
  setUserDialogOpen: open => set({ userDialogOpen: open }),

  folderSort: 'Added',
  setFolderSort: sort => set({ folderSort: sort }),

  updateAvailable: false,
  setUpdateAvailable: updateAvailable => set({ updateAvailable }),

  loginDialog: false,
  setLoginDialog: open => set({ loginDialog: open }),

  createAccount: false,
  setCreateAccount: createAccount => set({ createAccount }),

  showLeftSidebar: false,
  setShowLeftSidebar: showLeftSidebar => set({showLeftSidebar}),

  showRightSidebar: !['iOS', 'Android'].includes(getOS()),
  setShowRightSidebar: showRightSidebar => set({showRightSidebar})
}))
