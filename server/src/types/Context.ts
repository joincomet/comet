import { EntityManager } from '@mikro-orm/postgresql'
import {
  Channel,
  Folder,
  Group,
  RelationshipStatus,
  Role,
  Server,
  ServerPermission,
  ServerUser,
  User,
  VoteType
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

  commentVoteLoader: DataLoader<string, VoteType>

  groupUnreadCountLoader: DataLoader<string, number>

  postVoteLoader: DataLoader<string, VoteType>

  serverChannelsLoader: DataLoader<string, Channel[]>
  serverFoldersLoader: DataLoader<string, Folder[]>
  serverPermissionsLoader: DataLoader<string, ServerPermission[]>
  serverRolesLoader: DataLoader<string, Role[]>
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

  messageServerUserLoader: DataLoader<string, ServerUser>
  postServerUserLoader: DataLoader<string, ServerUser>
  commentServerUserLoader: DataLoader<string, ServerUser>
  commentAuthorLoader: DataLoader<string, User>
  commentTextLoader: DataLoader<string, string>
  postAuthorLoader: DataLoader<string, User>
}
