import { authChecker } from '@/util/auth'
import { BuildSchemaOptions } from 'type-graphql'
import path from 'path'
import { GraphQLLiveDirective } from '@n1ru4l/graphql-live-query'
import {
  ChannelMutations,
  ChannelQueries,
  CommentMutations,
  CommentQueries,
  FolderMutations,
  FolderQueries,
  GroupMutations,
  MessageMutations,
  MessageQueries,
  PostMutations,
  PostQueries,
  ReplyMutations,
  ReplyQueries,
  RoleMutations,
  RoleQueries,
  ServerMutations,
  ServerQueries,
  SubscriptionResolver,
  UserMutations,
  UserQueries
} from '@/resolver'

export const typeGraphQLConf = {
  resolvers: [
    ChannelQueries,
    ChannelMutations,
    CommentQueries,
    CommentMutations,
    FolderQueries,
    FolderMutations,
    GroupMutations,
    MessageQueries,
    MessageMutations,
    PostQueries,
    PostMutations,
    ReplyQueries,
    ReplyMutations,
    RoleQueries,
    RoleMutations,
    ServerQueries,
    ServerMutations,
    SubscriptionResolver,
    UserQueries,
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
