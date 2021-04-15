import { Options, ReflectMetadataProvider } from '@mikro-orm/core'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'
import { CustomError } from '@/types/CustomError'
import { BaseEntity } from '@/entity/BaseEntity'
import {
  Channel,
  ChannelRole,
  ChannelUser,
  Comment,
  CommentVote,
  File,
  Folder,
  FolderPost,
  FolderVisibility,
  Group,
  GroupUser,
  Image,
  LinkMetadata,
  Message,
  Post,
  PostVote,
  Relationship,
  Reply,
  Role,
  Server,
  ServerFolder,
  ServerInvite,
  ServerUser,
  User,
  UserFolder
} from '@/entity'

export const mikroOrmConf = {
  highlighter: new SqlHighlighter(),
  metadataProvider: ReflectMetadataProvider,
  cache: { enabled: false },
  entities: [
    Channel,
    ChannelRole,
    ChannelUser,
    Comment,
    CommentVote,
    Reply,
    Folder,
    FolderPost,
    FolderVisibility,
    ServerFolder,
    UserFolder,
    Group,
    GroupUser,
    Message,
    Post,
    PostVote,
    Role,
    Server,
    ServerInvite,
    ServerUser,
    Relationship,
    User,
    BaseEntity,
    File,
    Image,
    LinkMetadata
  ],
  type: 'postgresql',
  clientUrl:
    process.env.DATABASE_URL ??
    'postgresql://postgres:password@localhost:5432/postgres',
  debug: process.env.NODE_ENV !== 'production',
  forceUtcTimezone: true,
  findOneOrFailHandler: (entityName: string) => {
    return new CustomError('error.entityNotFound', entityName)
  },
  driverOptions:
    process.env.NODE_ENV === 'production'
      ? {
          connection: { ssl: { rejectUnauthorized: false } }
        }
      : {},
  migrations: {
    disableForeignKeys: false
  }
} as Options<PostgreSqlDriver>
