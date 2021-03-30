import { ServerPermission } from '@/lib/ServerPermission'
import { ChannelPermission } from '@/lib/ChannelPermission'

export const en = {
  home: 'Home',
  copyId: 'Copy ID',
  markRead: 'Mark As Read',
  continue: 'Continue',
  more: 'More',
  friends: {
    title: 'Friends',
    sendMessage: 'Message',
    revokeRequest: 'Cancel',
    acceptRequest: 'Accept',
    rejectRequest: 'Ignore',
    tab: {
      online: 'Online',
      all: 'All',
      pending: 'Pending',
      blocked: 'Blocked',
      add: 'Add Friend'
    }
  },
  user: {
    context: {
      viewProfile: 'Profile',
      closeDm: 'Close DM',
      block: 'Block',
      addFriend: 'Add Friend',
      removeFriend: 'Remove Friend',
      sendMessage: 'Message',
      changeNickname: 'Change Nickname',
      kickUser: 'Kick {{user.name}}',
      banUser: 'Ban {{user.name}}',
      banPrompt: 'Reason (Optional)'
    },
    profile: {
      sentFriendRequest: 'Request Sent',
      receivedFriendRequest: 'Accept Request',
      mutualServers: 'Mutual Servers',
      mutualFriends: 'Mutual Friends',
      sendMessage: 'Send Message'
    },
    offline: 'Offline',
    online: 'Online'
  },
  feed: {
    title: 'Your Feed',
    refresh: 'Refresh Posts',
    subscriptions: {
      show: 'Show Subscriptions',
      hide: 'Hide Subscriptions',
      comingSoon: 'Server subscriptions are coming soon!'
    },
    sort: {
      hot: 'Hot',
      top: 'Top',
      new: 'New'
    },
    time: {
      hour: 'Hour',
      day: 'Day',
      week: 'Week',
      month: 'Month',
      year: 'Year',
      all: 'All'
    },
    liveMode: {
      title: 'Live Mode',
      description: 'Automatically add new posts to feed',
      comingSoon: 'Live Mode is coming soon!'
    }
  },
  dms: {
    title: 'Direct Messages',
    create: 'Create DM',
    markRead: 'Mark Read',
    shared: 'Shared with {{user.name}}!'
  },
  folders: {
    hide: 'Hide Folders',
    show: 'Show Folders',
    favorites: 'Favorites',
    readLater: 'Read Later',
    added: 'Added to {{folder.name}}!',
    user: {
      title: 'Your Folders',
      create: 'Create a Folder'
    },
    server: {
      title: 'Server Folders',
      create: 'Create a Server Folder'
    }
  },
  inbox: {
    title: 'Inbox',
    tab: {
      all: 'All',
      unread: 'Unread'
    }
  },
  post: {
    createPost: 'Create a post',
    create: {
      submit: 'Post',
      cancel: 'Cancel'
    },
    type: {
      text: 'Text Post',
      link: 'Link Post',
      image: 'Image Post',
      album: 'Image Album'
    },
    createComment: 'Write a comment',
    commentCount: '{{count}} Comment',
    commentCount_plural: '{{count}} Comments',
    participantCount: '{{count}} Participant',
    participantCount_plural: '{{count}} Participants',
    creator: 'Creator',
    context: {
      pin: 'Pin Post',
      pinned: 'Post pinned!',
      unpin: 'Unpin Post',
      unpinned: 'Post unpinned!',
      addToUserFolder: 'Add to Folder',
      addToServerFolder: 'Add to Server Folder',
      remove: 'Remove Post',
      removed: 'Post removed!',
      removePrompt: 'Reason (Optional)',
      edit: 'Edit Post',
      delete: 'Delete Post',
      deleted: 'Post deleted!',
      copyLink: 'Copy Post Link',
      copiedLink: 'Copied link to post!',
      sendToFriend: 'Send to Friend',
      report: 'Report',
      reported: 'Post reported!'
    },
    hideParticipants: 'Hide Participants',
    showParticipants: 'Show Participants',
    pinnedTo: 'Pinned to {{server.name}}',
    expand: 'Show Details',
    collapse: 'Hide Details'
  },
  search: {
    comingSoon: 'Search is coming soon!'
  },
  settings: {
    title: 'Settings'
  },
  server: {
    context: {
      markRead: 'Mark As Read',
      mute: 'Mute Server',
      invite: 'Invite People',
      leave: 'Leave Server'
    },
    create: {
      title: 'Create Server',
      name: 'Server Name',
      upload: 'Upload',
      requireInvite: 'Require Invite to Join'
    },
    permission: {
      // General
      [ServerPermission.ManageChannels]: {
        title: 'Manage Channels',
        description: 'Allows members to create, edit, or delete channels.'
      },
      [ServerPermission.ManageRoles]: {
        title: 'Manage Roles',
        description:
          'Allows members to create new roles and edit or delete roles lower than their highest role. Also allows members to change permissions of individual channels that they have access to.'
      },
      [ServerPermission.ManageServer]: {
        title: 'Manage Server',
        description:
          "Allows members to change this server's name, description, icon, and banner image."
      },

      // Membership
      [ServerPermission.CreateInvite]: {
        title: 'Create Invite',
        description: 'Allows members to invite new people to this server.'
      },
      [ServerPermission.ChangeNickname]: {
        title: 'Change Nicknames',
        description:
          'Allows members to change their own nickname, a custom name for just this server.'
      },
      [ServerPermission.ManageNicknames]: {
        title: 'Manage Nicknames',
        description: 'Allows members to change the nicknames of other members.'
      },
      [ServerPermission.KickUser]: {
        title: 'Kick Members',
        description:
          'Allows members to remove other members from this server. Kicked members will be able to rejoin if they have another invite, or the server is public.'
      },
      [ServerPermission.BanUser]: {
        title: 'Ban Members',
        description:
          'Allows members to permanently ban other members from this server.'
      },

      // Channels
      [ServerPermission.SendMessages]: {
        title: 'Send Messages',
        description: 'Allows members to send messages in text channels.'
      },
      [ServerPermission.EmbedLinks]: {
        title: 'Embed Links',
        description:
          'Allows links that members share to show embedded content in text channels.'
      },
      [ServerPermission.AttachFiles]: {
        title: 'Attach Files',
        description: 'Allows members to upload files or media in text channels.'
      },
      [ServerPermission.Mention]: {
        title: 'Mention @everyone, @here, and All Roles',
        description: `Allows members to use @everyone (everyone in the server) or @here (only online members in that channel). They can also @mention all roles, even if the role's "Allow anyone to mention this role" permission is disabled.`
      },
      [ServerPermission.ManageMessages]: {
        title: 'Manage Messages',
        description:
          'Allows members to remove messages by other members or pin any message.'
      },

      // Posts
      [ServerPermission.CreatePost]: {
        title: 'Create Posts',
        description: 'Allows members to create posts.'
      },
      [ServerPermission.VotePost]: {
        title: 'Vote on Posts',
        description: 'Allows members to vote on posts.'
      },
      [ServerPermission.ManagePosts]: {
        title: 'Manage Posts',
        description: 'Allows members to pin and remove posts.'
      },

      // Comments
      [ServerPermission.ViewComments]: {
        title: 'View Comments',
        description: 'Allows members to view comments on posts.'
      },
      [ServerPermission.CreateComment]: {
        title: 'Create Comments',
        description: 'Allows members to create comments.'
      },
      [ServerPermission.VoteComment]: {
        title: 'Vote on Comments',
        description: 'Allows members to vote on comments.'
      },
      [ServerPermission.ManageComments]: {
        title: 'Manage Comments',
        description: 'Allows members to pin and remove comments.'
      },

      // Other
      [ServerPermission.DisplayRoleSeparately]: {
        title: 'Display role members separately from online members',
        description: ''
      },
      [ServerPermission.Mentionable]: {
        title: 'Allow anyone to **@mention** this role',
        description: `Note: Members with the "Mention @everyone, @here, and All Roles" permission will always be able to ping this role.`
      },
      [ServerPermission.Admin]: {
        title: 'Administrator',
        description: `Members with this permission will have every permission and will also bypass all channel specific permissions or restrictions (for example, these members would get access to all private channels). **This is a dangerous permission to grant**.`
      }
    }
  },
  channel: {
    hideUsers: 'Hide Users',
    showUsers: 'Show Users',
    create: 'Create Channel',
    permission: {
      [ChannelPermission.ViewChannel]: {
        title: 'View Channel',
        description:
          'Allows members to view this channel by default. Disabling this for @everyone will make this channel private.'
      },
      [ChannelPermission.ManageChannel]: {
        title: 'Manage Channel',
        description: `Allows users to change this channel's name and description.`
      },
      [ChannelPermission.ManagePermissions]: {
        title: 'Manage Permissions',
        description: `Allows users to change this channel's permissions.`
      },
      [ChannelPermission.SendMessages]: {
        title: 'Send Messages',
        description: `Allows members to send messages in this channel.`
      },
      [ChannelPermission.EmbedLinks]: {
        title: 'Embed Links',
        description: `Allows links that members share to show embedded content in this channel.`
      },
      [ChannelPermission.AttachFiles]: {
        title: 'Attach Files',
        description: `Allows members to upload files or media in this channel.`
      },
      [ChannelPermission.Mention]: {
        title: 'Mention @everyone, @here, and All Roles',
        description: `Allows members to use @everyone or @here (only online members) in this channel. They can also @mention all roles in this channel, even if the role's "Allow anyone to mention this role" permission is disabled.`
      },
      [ChannelPermission.ManageMessages]: {
        title: 'Manage Messages',
        description: `Allows members to remove messages by other users or pin any message in this channel.`
      }
    }
  },
  explore: {
    title: 'Explore'
  },
  categories: {
    Arts: 'Arts',
    Business: 'Business',
    Culture: 'Culture',
    Discussion: 'Discussion',
    Entertainment: 'Entertainment',
    Gaming: 'Gaming',
    Health: 'Health',
    Hobbies: 'Hobbies',
    Lifestyle: 'Lifestyle',
    Memes: 'Memes',
    Meta: 'Meta',
    News: 'News',
    Politics: 'Politics',
    Programming: 'Programming',
    Science: 'Science',
    Sports: 'Sports',
    Technology: 'Technology',
    Other: 'Other'
  },
  messages: {
    pinned: 'Pinned Messages',
    upload: 'Upload a File'
  },
  comment: {
    reply: 'Reply',
    cancelReply: 'Cancel Reply',
    hideReplies: 'Hide Replies',
    showReplies: 'Show Replies',
    create: {
      submit: 'Comment',
      cancel: 'Cancel'
    },
    context: {
      remove: 'Remove Comment',
      delete: 'Delete Comment',
      report: 'Report Comment',
      reply: 'Reply'
    }
  }
}
