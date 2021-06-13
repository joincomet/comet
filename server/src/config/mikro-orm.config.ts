import {
  MemoryCacheAdapter,
  Options,
  ReflectMetadataProvider
} from '@mikro-orm/core'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'
import { CustomError } from '@/types/CustomError'
import { BaseEntity } from '@/entity/BaseEntity'
import {
  Channel,
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
  PostImage,
  PostVote,
  Relationship,
  Reply,
  Role,
  Server,
  ServerFolder,
  ServerUser,
  User,
  UserFolder
} from '@/entity'
import { RedisCacheAdapter } from 'mikro-orm-cache-adapter-redis'
import Redis from 'ioredis'

export const mikroOrmConf = {
  highlighter: new SqlHighlighter(),
  metadataProvider: ReflectMetadataProvider,
  cache: { enabled: false },
  entities: [
    Channel,
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
    PostImage,
    PostVote,
    Role,
    Server,
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
    process.env.NODE_ENV === 'production' && process.env.SSL !== 'false'
      ? {
          connection: { ssl: { rejectUnauthorized: false } }
        }
      : {},
  resultCache:
    process.env.NODE_ENV === 'production' && process.env.REDIS_URL
      ? {
          adapter: RedisCacheAdapter,
          options: {
            client: new Redis(process.env.REDIS_URL)
          }
        }
      : { adapter: MemoryCacheAdapter },
  migrations: {
    disableForeignKeys: false
  }
} as Options<PostgreSqlDriver>
