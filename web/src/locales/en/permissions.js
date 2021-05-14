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

    // Membership
    [ServerPermission.CreateInvite]: {
      title: 'Create Invite',
      description: 'Allows members to invite new people to this planet.'
    },
    [ServerPermission.ChangeNickname]: {
      title: 'Change Nicknames',
      description:
        'Allows members to change their own nickname, a custom name for just this planet.'
    },
    [ServerPermission.ManageNicknames]: {
      title: 'Manage Nicknames',
      description: 'Allows members to change the nicknames of other members.'
    },

    // Channels
    [ServerPermission.SendMessages]: {
      title: 'Send Messages',
      description: 'Allows members to send messages in text channels.'
    },
    [ServerPermission.Mention]: {
      title: 'Mention @everyone, @here, and All Roles',
      description: `Allows members to use @everyone (everyone in the planet) or @here (only online members in that channel). They can also @mention all roles, even if the role's "Allow anyone to mention this role" permission is disabled.`
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
      title: 'Display role members separately from online members',
      description: ''
    },
    [ServerPermission.Mentionable]: {
      title: 'Allow anyone to @mention this role',
      description: `Note: Members with the "Mention @everyone, @here, and All Roles" permission will always be able to ping this role.`
    },
    [ServerPermission.Admin]: {
      title: 'Administrator',
      description: `Members with this permission will have every permission and will also bypass all channel specific permissions or restrictions (for example, these members would get access to all private channels). **This is a dangerous permission to grant**.`
    },

    [ServerPermission.ManageUsers]: {
      title: 'Manage Users',
      description: `Ban and kick users`
    },

    [ServerPermission.ViewChannels]: {
      title: 'View Channels',
      description: `View channels`
    }
  }
}
