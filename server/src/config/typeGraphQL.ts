import { authChecker } from '@/util/auth'
import { BuildSchemaOptions, MiddlewareFn } from 'type-graphql'
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

export const ErrorInterceptor: MiddlewareFn<any> = async (
  { context, info },
  next
) => {
  try {
    return await next()
  } catch (err) {
    // write error to file log
    // fileLog.write(err, context, info);

    // hide errors from db like printing sql query
    /*if (someCondition(err)) {
      throw new Error("Unknown error occurred!");
    }*/

    console.error(err)
    console.error(err.validationErrors)

    // rethrow the error
    throw err
  }
}

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
  directives: [GraphQLLiveDirective],
  globalMiddlewares: [ErrorInterceptor]
} as BuildSchemaOptions
