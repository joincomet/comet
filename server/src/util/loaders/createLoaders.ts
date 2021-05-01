import { EntityManager } from '@mikro-orm/postgresql'
import { serverChannelsLoader } from '@/util/loaders/server/ServerChannelsLoader'
import { serverFoldersLoader } from '@/util/loaders/server/ServerFoldersLoader'
import { userFoldersLoader } from '@/util/loaders/user/UserFoldersLoader'
import { userServersLoader } from '@/util/loaders/user/UserServersLoader'
import { channelMentionCountLoader } from '@/util/loaders/channel/ChannelMentionCountLoader'
import { channelPermissionsLoader } from '@/util/loaders/channel/ChannelPermissionsLoader'
import { channelUnreadLoader } from '@/util/loaders/channel/ChannelUnreadLoader'
import { commentVoteLoader } from '@/util/loaders/comment/CommentVoteLoader'
import { groupUnreadCountLoader } from '@/util/loaders/group/GroupUnreadCountLoader'
import { postVoteLoader } from '@/util/loaders/post/PostVoteLoader'
import { serverMyRolesLoader } from '@/util/loaders/server/ServerMyRolesLoader'
import { serverNicknameLoader } from '@/util/loaders/server/ServerNicknameLoader'
import { serverNotificationSettingLoader } from '@/util/loaders/server/ServerNotificationSettingLoader'
import { serverPermissionsLoader } from '@/util/loaders/server/ServerPermissionsLoader'
import { serverRolesLoader } from '@/util/loaders/server/ServerRolesLoader'
import { serverJoinedLoader } from '@/util/loaders/server/ServerJoinedLoader'
import { relatedUsersLoader } from '@/util/loaders/user/RelatedUsersLoader'
import { relationshipStatusLoader } from '@/util/loaders/user/RelationshipStatusLoader'
import { userGroupsLoader } from '@/util/loaders/user/UserGroupsLoader'
import { userUnreadCountLoader } from '@/util/loaders/user/UserUnreadCountLoader'
import { channelRolePermissionsLoader } from '@/util/loaders/channel/ChannelRolePermissionsLoader'
import { serverSystemMessagesChannelLoader } from '@/util/loaders/server'
import { serverOnlineCountLoader } from '@/util/loaders/server'
import {
  folderFollowingLoader,
  folderOwnerLoader,
  folderServerLoader
} from '@/util/loaders/folder'
import { Loaders } from '@/types'
import { userShowChatLoader } from '@/util/loaders/user'

export function createLoaders(em: EntityManager, userId: string): Loaders {
  return {
    channelMentionCountLoader: channelMentionCountLoader(em, userId),
    channelPermissionsLoader: channelPermissionsLoader(em, userId),
    channelRolePermissionsLoader: channelRolePermissionsLoader(em),
    channelUnreadLoader: channelUnreadLoader(em, userId),

    commentVoteLoader: commentVoteLoader(em, userId),

    groupUnreadCountLoader: groupUnreadCountLoader(em, userId),

    postVoteLoader: postVoteLoader(em, userId),

    serverChannelsLoader: serverChannelsLoader(em),
    serverFoldersLoader: serverFoldersLoader(em),
    serverMyRolesLoader: serverMyRolesLoader(em, userId),
    serverNicknameLoader: serverNicknameLoader(em, userId),
    serverNotificationSettingLoader: serverNotificationSettingLoader(
      em,
      userId
    ),
    serverPermissionsLoader: serverPermissionsLoader(em, userId),
    serverRolesLoader: serverRolesLoader(em),
    serverSystemMessagesChannelLoader: serverSystemMessagesChannelLoader(em),
    serverOnlineCountLoader: serverOnlineCountLoader(em),
    serverJoinedLoader: serverJoinedLoader(em, userId),

    relatedUsersLoader: relatedUsersLoader(em, userId),
    relationshipStatusLoader: relationshipStatusLoader(em, userId),
    userFoldersLoader: userFoldersLoader(em, userId),
    userGroupsLoader: userGroupsLoader(em, userId),
    userServersLoader: userServersLoader(em, userId),
    userUnreadCountLoader: userUnreadCountLoader(em, userId),
    userShowChatLoader: userShowChatLoader(em, userId),

    folderFollowingLoader: folderFollowingLoader(em, userId),
    folderOwnerLoader: folderOwnerLoader(em),
    folderServerLoader: folderServerLoader(em)
  }
}
