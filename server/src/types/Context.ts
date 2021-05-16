import { EntityManager } from '@mikro-orm/postgresql'
import {
  Channel,
  Folder,
  Group,
  RelationshipStatus,
  Role,
  Server,
  ServerPermission,
  User
} from '@/entity'
import DataLoader from 'dataloader'
import { LiveQueryStore } from '@/util'

export interface Context {
  em: EntityManager
  userId: string
  liveQueryStore: LiveQueryStore
  loaders: Loaders
}

export interface Loaders {
  channelMentionCountLoader: DataLoader<string, number>
  channelUnreadLoader: DataLoader<string, boolean>

  commentVoteLoader: DataLoader<string, boolean>

  groupUnreadCountLoader: DataLoader<string, number>

  postVoteLoader: DataLoader<string, boolean>

  serverChannelsLoader: DataLoader<string, Channel[]>
  serverFoldersLoader: DataLoader<string, Folder[]>
  serverPermissionsLoader: DataLoader<string, ServerPermission[]>
  serverRolesLoader: DataLoader<string, Role[]>
  serverSystemMessagesChannelLoader: DataLoader<string, Channel>
  serverOnlineCountLoader: DataLoader<string, number>
  serverJoinedLoader: DataLoader<string, boolean>

  relatedUsersLoader: DataLoader<string, User[]>
  relationshipStatusLoader: DataLoader<string, RelationshipStatus>
  userFoldersLoader: DataLoader<string, Folder[]>
  userGroupsLoader: DataLoader<string, Group[]>
  userServersLoader: DataLoader<string, Server[]>
  userUnreadCountLoader: DataLoader<string, number>
  userShowChatLoader: DataLoader<string, boolean>
  userLastMessageAtLoader: DataLoader<string, Date>

  folderFollowingLoader: DataLoader<string, boolean>
  folderOwnerLoader: DataLoader<string, User>
  folderServerLoader: DataLoader<string, Server>
}
