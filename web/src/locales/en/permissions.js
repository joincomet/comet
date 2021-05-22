import { ServerPermission } from '@/graphql/hooks'

export const permissions = {
  server: {
    // General
    [ServerPermission.ManageChannels]: {
      title: 'Manage Channels',
      description: 'Allows members to create, edit, or delete channels.'
    },
    [ServerPermission.ManageServer]: {
      title: 'Manage Roles',
      description:
        'Allows members to create new roles and edit or delete roles lower than their highest role. Also allows members to change permissions of individual channels that they have access to.'
    },
    [ServerPermission.ManageServer]: {
      title: 'Manage Planet',
      description:
        "Allows members to change this planet's name, description, icon, and banner image."
    },

    // Channels
    [ServerPermission.SendMessages]: {
      title: 'Send Messages',
      description: 'Allows members to send messages in text channels.'
    },
    [ServerPermission.RestrictedChannels]: {
      title: 'Send Messages in Restricted Channels',
      description:
        'Allows members to send messages in restricted text channels.'
    },
    [ServerPermission.PrivateChannels]: {
      title: 'Use Private Channels',
      description:
        'Allows members to view and send messages in private text channels.'
    },
    [ServerPermission.ManageMessages]: {
      title: 'Manage Messages',
      description:
        'Allows members to remove messages by other members or pin any message.'
    },

    // Posts
    [ServerPermission.ManagePosts]: {
      title: 'Manage Posts',
      description: 'Allows members to pin and remove posts.'
    },

    // Comments
    [ServerPermission.ManageComments]: {
      title: 'Manage Comments',
      description: 'Allows members to pin and remove comments.'
    },

    // Folders
    [ServerPermission.ManageFolders]: {
      title: 'Manage Folders',
      description: 'Allows members to create, delete, and edit folders.'
    },
    [ServerPermission.AddPostToFolder]: {
      title: 'Add Posts to Folders',
      description: 'Allows members to add and remove posts from folders.'
    },

    // Other
    [ServerPermission.DisplayRoleSeparately]: {
      title: 'Display Role Separately',
      description:
        'Members with this role will appear separately in the users list'
    },
    [ServerPermission.Admin]: {
      title: 'Administrator',
      description: `Members with this role have every permission`
    },

    [ServerPermission.ManageUsers]: {
      title: 'Manage Users',
      description: `Ban and kick users`
    }
  }
}
