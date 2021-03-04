import { RedisPubSub } from 'graphql-redis-subscriptions'
import { PubSub } from 'apollo-server-express'
import * as Redis from 'ioredis'

export enum SubscriptionTopic {
  MessageCreated = 'MESSAGE_CREATED',
  MessageUpdated = 'MESSAGE_UPDATED',
  MessageDeleted = 'MESSAGE_DELETED',
  MessageMentioned = 'MESSAGE_MENTIONED',

  GroupAdded = 'GROUP_ADDED',
  GroupUpdated = 'GROUP_UPDATED',
  GroupRemoved = 'GROUP_REMOVED',

  ServerUpdated = 'SERVER_UPDATED',
  ServerDeleted = 'SERVER_DELETED',

  UserJoinedServer = 'USER_JOINED_SERVER',
  UserLeftServer = 'USER_LEFT_SERVER',
  UserUpdated = 'USER_UPDATED',

  CommentReplied = 'COMMENT_REPLIED'
}

const redisOptions: Redis.RedisOptions = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  retryStrategy: times => Math.max(times * 100, 3000)
}

export const getPubSub = () =>
  process.env.NODE_ENV === 'production'
    ? new RedisPubSub({
        publisher: new Redis(redisOptions),
        subscriber: new Redis(redisOptions)
      })
    : new PubSub()
