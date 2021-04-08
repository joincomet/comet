import { ServerPermission } from '@/types/ServerPermission'
import { ChannelPermission } from '@/types/ChannelPermission'

export const permissions = {
  server: {
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
    [ServerPermission.KickUser]: {
      title: 'Kick Members',
      description:
        'Allows members to remove other members from this planet. Kicked members will be able to rejoin if they have' +
        ' another invite, or the planet is public.'
    },
    [ServerPermission.BanUser]: {
      title: 'Ban Members',
      description:
        'Allows members to permanently ban other members from this planet.'
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
      title: 'Allow anyone to **@mention** this role',
      description: `Note: Members with the "Mention @everyone, @here, and All Roles" permission will always be able to ping this role.`
    },
    [ServerPermission.Admin]: {
      title: 'Administrator',
      description: `Members with this permission will have every permission and will also bypass all channel specific permissions or restrictions (for example, these members would get access to all private channels). **This is a dangerous permission to grant**.`
    }
  },
  channel: {
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
}
