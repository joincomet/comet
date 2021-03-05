import {
  AdminResolver,
  AuthResolver,
  ChatResolver,
  CommentResolver,
  FolderResolver,
  ModerationResolver,
  NotificationResolver,
  ServerResolver,
  PostResolver,
  UserResolver
} from '@/resolver'
import { authChecker } from '@/util/auth'
import { getPubSub } from '@/util/subscriptions'
import { BuildSchemaOptions } from 'type-graphql'
import path from 'path'

export default {
  resolvers: [
    AdminResolver,
    AuthResolver,
    ChatResolver,
    CommentResolver,
    FolderResolver,
    ModerationResolver,
    NotificationResolver,
    ServerResolver,
    PostResolver,
    UserResolver
  ],
  emitSchemaFile:
    process.env.NODE_ENV === 'production'
      ? false
      : path.resolve(__dirname, '../../../schema.graphql'),
  validate: true,
  authChecker: authChecker,
  pubSub: getPubSub()
} as BuildSchemaOptions
