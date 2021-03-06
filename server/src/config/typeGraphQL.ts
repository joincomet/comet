import {
  ChatMutations,
  ChatQueries,
  ChatSubscriptions,
  CommentMutations,
  CommentQueries,
  FolderMutations,
  FolderQueries,
  NotificationMutations,
  NotificationQueries,
  PostMutations,
  PostQueries,
  ServerMutations,
  ServerQueries,
  ServerSubscriptions,
  UserMutations,
  UserQueries
} from '@/resolver'
import { authChecker } from '@/util/auth'
import { getPubSub } from '@/util/subscriptions'
import { BuildSchemaOptions } from 'type-graphql'
import path from 'path'

export default {
  resolvers: [
    ChatMutations,
    ChatQueries,
    ChatSubscriptions,

    CommentMutations,
    CommentQueries,

    FolderMutations,
    FolderQueries,

    NotificationMutations,
    NotificationQueries,

    PostMutations,
    PostQueries,

    ServerMutations,
    ServerQueries,
    ServerSubscriptions,

    UserMutations,
    UserQueries
  ],
  emitSchemaFile:
    process.env.NODE_ENV === 'production'
      ? false
      : path.resolve(__dirname, '../../../schema.graphql'),
  validate: true,
  authChecker: authChecker,
  pubSub: getPubSub()
} as BuildSchemaOptions
