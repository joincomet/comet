import { EntityManager } from '@mikro-orm/postgresql'
import {
  Channel,
  ChannelPermission,
  ChannelPermissions,
  Folder,
  Group,
  RelationshipStatus,
  Role,
  Server,
  ServerPermission,
  User
} from '@/entity'
import { InMemoryLiveQueryStore } from '@n1ru4l/in-memory-live-query-store'
import { Request, Response } from 'express'
import DataLoader from 'dataloader'
import { NotificationSetting } from '@/types/NotificationSetting'

export interface Context {
  em: EntityManager
  userId: string
  liveQueryStore: InMemoryLiveQueryStore
  req: Request
  res: Response
  loaders: {
    channelMentionCountLoader: DataLoader<string, number>
    channelPermissionsLoader: DataLoader<string, ChannelPermission[]>
    channelRolePermissionsLoader: DataLoader<string, ChannelPermissions[]>
    channelUnreadCountLoader: DataLoader<string, number>

    commentVoteLoader: DataLoader<string, boolean>

    groupUnreadCountLoader: DataLoader<string, number>

    postVoteLoader: DataLoader<string, boolean>

    serverChannelsLoader: DataLoader<string, Channel[]>
    serverFoldersLoader: DataLoader<string, Folder[]>
    serverMyRolesLoader: DataLoader<string, Role[]>
    serverNicknameLoader: DataLoader<string, string>
    serverNotificationSettingLoader: DataLoader<string, NotificationSetting>
    serverPermissionsLoader: DataLoader<string, ServerPermission[]>
    serverRolesLoader: DataLoader<string, Role[]>
    serverSystemMessagesChannelLoader: DataLoader<string, Channel>

    relatedUsersLoader: DataLoader<string, User[]>
    relationshipStatusLoader: DataLoader<string, RelationshipStatus>
    userFoldersLoader: DataLoader<string, Folder[]>
    userGroupsLoader: DataLoader<string, Group[]>
    userServersLoader: DataLoader<string, Server[]>
    userUnreadCountLoader: DataLoader<string, number>

    folderFollowingLoader: DataLoader<string, boolean>
    folderOwnerLoader: DataLoader<string, User>
    folderServerLoader: DataLoader<string, Server>
  }
}
