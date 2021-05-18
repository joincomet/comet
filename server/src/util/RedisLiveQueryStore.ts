import Redis from 'ioredis'
import { InMemoryLiveQueryStore } from '@n1ru4l/in-memory-live-query-store'
import {
  execute as defaultExecute,
  ExecutionArgs,
  ExecutionResult
} from 'graphql'
import { LiveExecutionResult } from '@n1ru4l/graphql-live-query'

declare type MaybePromise<T> = T | Promise<T>

declare type ExecutionParameter =
  | Parameters<typeof defaultExecute>
  | [ExecutionArgs]

export interface LiveQueryStore {
  invalidate: (identifiers: Array<string> | string) => Promise<void>
  execute: (
    ...args: ExecutionParameter
  ) => MaybePromise<
    | AsyncIterableIterator<ExecutionResult | LiveExecutionResult>
    | ExecutionResult
  >
}

const CHANNEL = 'LIVE_QUERY_INVALIDATIONS'

export class RedisLiveQueryStore {
  pub: Redis.Redis
  sub: Redis.Redis
  liveQueryStore: InMemoryLiveQueryStore

  constructor(redisUrl: string) {
    this.pub = new Redis(redisUrl)
    this.sub = new Redis(redisUrl)
    this.liveQueryStore = new InMemoryLiveQueryStore()

    this.sub.subscribe(CHANNEL, err => {
      if (err) throw err
    })

    this.sub.on('message', (channel, resourceIdentifier) => {
      if (channel === CHANNEL && resourceIdentifier)
        this.liveQueryStore.invalidate(resourceIdentifier)
    })
  }

  async invalidate(identifiers: Array<string> | string) {
    if (typeof identifiers === 'string') {
      identifiers = [identifiers]
    }
    for (const identifier of identifiers) {
      this.pub.publish(CHANNEL, identifier)
    }
  }

  execute(...args: ExecutionParameter) {
    return this.liveQueryStore.execute(...args)
  }
}
