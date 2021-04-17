import { authChecker } from '@/util/auth'
import { BuildSchemaOptions } from 'type-graphql'
import path from 'path'
import { GraphQLLiveDirective } from '@n1ru4l/graphql-live-query'
import {
  ChannelResolver,
  ChannelQueries,
  CommentResolver,
  CommentQueries,
  FolderMutations,
  FolderResolver,
  GroupResolver,
  MessageResolver,
  MessageQueries,
  PostResolver,
  PostQueries,
  ReplyMutations,
  RepliesResolver,
  RoleResolver,
  RoleResolver,
  ServerMutations,
  ServerResolver,
  SubscriptionResolver,
  UserMutations,
  UserResolver
} from '@/resolver'

export const typeGraphQLConf = {
  resolvers: [
    ChannelQueries,
    ChannelResolver,
    CommentQueries,
    CommentResolver,
    FolderResolver,
    FolderMutations,
    GroupResolver,
    MessageQueries,
    MessageResolver,
    PostQueries,
    PostResolver,
    RepliesResolver,
    ReplyMutations,
    RoleResolver,
    RoleResolver,
    ServerResolver,
    ServerMutations,
    SubscriptionResolver,
    UserResolver,
    UserMutations
  ],
  emitSchemaFile:
    process.env.NODE_ENV === 'production'
      ? false
      : path.resolve(__dirname, '../../../schema.graphql'),
  validate: true,
  authChecker: authChecker,
  directives: [GraphQLLiveDirective]
} as BuildSchemaOptions
