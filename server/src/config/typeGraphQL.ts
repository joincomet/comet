import { authChecker } from '@/util/auth'
import { BuildSchemaOptions } from 'type-graphql'
import path from 'path'
import { GraphQLLiveDirective } from '@n1ru4l/graphql-live-query'
import {
  ChannelResolver,
  CommentResolver,
  FolderResolver,
  GroupResolver,
  MessageResolver,
  PostResolver,
  RelationshipsResolver,
  RepliesResolver,
  RoleResolver,
  ServerResolver,
  SubscriptionResolver,
  UserResolver
} from '@/resolver'

export const typeGraphQLConf = {
  resolvers: [
    ChannelResolver,
    CommentResolver,
    FolderResolver,
    GroupResolver,
    MessageResolver,
    PostResolver,
    RelationshipsResolver,
    RepliesResolver,
    RoleResolver,
    ServerResolver,
    SubscriptionResolver,
    UserResolver
  ],
  emitSchemaFile:
    process.env.NODE_ENV === 'production'
      ? false
      : path.resolve(__dirname, '../../../schema.graphql'),
  validate: true,
  authChecker: authChecker,
  directives: [GraphQLLiveDirective]
} as BuildSchemaOptions
