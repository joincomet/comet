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
import Redis from 'ioredis'
import { RedisPubSub } from 'graphql-redis-subscriptions'
import { PubSub } from 'graphql-subscriptions'

const redisOptions: Redis.RedisOptions = {
  retryStrategy: times => Math.max(times * 100, 3000)
}

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

    if (err && process.env.NODE_ENV !== 'production') {
      console.error(err)
      if (err.validationErrors) console.error(err.validationErrors)
    }

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
  globalMiddlewares: [ErrorInterceptor],
  pubSub:
    process.env.NODE_ENV === 'production' && process.env.REDIS_URL
      ? new RedisPubSub({
          publisher: new Redis(process.env.REDIS_URL, redisOptions),
          subscriber: new Redis(process.env.REDIS_URL, redisOptions)
        })
      : new PubSub()
} as BuildSchemaOptions
