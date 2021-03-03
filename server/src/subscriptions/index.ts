import { RedisPubSub } from 'graphql-redis-subscriptions'
import { PubSub } from 'apollo-server-express'
import * as Redis from 'ioredis'

export const MESSAGE_CREATED = 'MESSAGE_CREATED'
export const MESSAGE_UPDATED = 'MESSAGE_UPDATED' // edited, link meta scraped, etc
export const MESSAGE_DELETED = 'MESSAGE_DELETED'
export const MESSAGE_MENTION = 'MESSAGE_MENTION'

export const GROUP_ADDED = 'GROUP_ADDED'

export const CHANNEL_CREATED = 'CHANNEL_CREATED'
export const CHANNEL_RENAMED = 'CHANNEL_RENAMED'
export const CHANNEL_DELETED = 'CHANNEL_DELETED'

export const SERVER_DELETED = 'SERVER_DELETED'
export const SERVER_UPDATED = 'SERVER_UPDATED' // change name, change avatar, etc

export const USER_JOINED_SERVER = 'USER_JOINED_SERVER'
export const USER_LEFT_SERVER = 'USER_LEFT_SERVER'
export const USER_UPDATED = 'USER_UPDATED' // change name, change online status, etc

export const REPLY_POST = 'REPLY_POST'
export const REPLY_COMMENT = 'REPLY_COMMENT'

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
