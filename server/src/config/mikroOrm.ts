import { Options, ReflectMetadataProvider } from '@mikro-orm/core'
import {
  BaseEntity,
  ChatChannel,
  ChatGroup,
  ChatMessage,
  Comment,
  Folder,
  LinkMetadata,
  Notification,
  Post,
  Server,
  ServerInvite,
  User
} from '@/entity'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'

export default {
  metadataProvider: ReflectMetadataProvider,
  cache: { enabled: false },
  entities: [
    BaseEntity,
    ChatChannel,
    ChatGroup,
    ChatMessage,
    Comment,
    Folder,
    LinkMetadata,
    Notification,
    Server,
    ServerInvite,
    Post,
    User
  ],
  type: 'postgresql',
  clientUrl:
    process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432',
  dbName: process.env.DATABASE_NAME || 'postgres',
  debug: process.env.NODE_ENV !== 'production',
  forceUtcTimezone: true
} as Options<PostgreSqlDriver>
