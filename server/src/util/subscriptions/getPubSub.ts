import { RedisPubSub } from 'graphql-redis-subscriptions'
import { PubSub } from 'apollo-server-express'
import Redis from 'ioredis'
import redisOptions from '@/config/redis'

/*export const getPubSub = () =>
  process.env.NODE_ENV === 'production'
    ? new RedisPubSub({
        publisher: new Redis(redisOptions),
        subscriber: new Redis(redisOptions)
      })
    : new PubSub()*/

export const getPubSub = () => new PubSub()
