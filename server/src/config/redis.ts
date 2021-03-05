import * as Redis from 'ioredis'
import { getUserId } from '@/modules/auth/AuthTokens'

export default {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  retryStrategy: times => Math.max(times * 100, 3000)
} as Redis.RedisOptions

export const onConnect = (connectionParams: { authorization: string }) => {
  if (connectionParams.authorization) {
    return {
      userId: getUserId(connectionParams.authorization)
    }
  } else {
    return { userId: null }
  }
}
