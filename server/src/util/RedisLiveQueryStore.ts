import Redis from 'ioredis'
import { InMemoryLiveQueryStore } from '@n1ru4l/in-memory-live-query-store'
import {
  execute as defaultExecute,
  ExecutionArgs,
  ExecutionResult
} from 'graphql'
import { MaybePromise } from 'type-graphql'
import { LiveExecutionResult } from '@n1ru4l/graphql-live-query'

const CHANNEL = 'LIVE_QUERY_INVALIDATIONS'

const liveQueryStore = new InMemoryLiveQueryStore()
const pub = new Redis(process.env.REDIS_URL)
const sub = new Redis(process.env.REDIS_URL)

sub.subscribe(CHANNEL, err => {
  if (err) throw err
})

sub.on('message', (channel, resourceIdentifier) => {
  if (channel === CHANNEL) liveQueryStore.invalidate(resourceIdentifier)
})

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

export const RedisLiveQueryStore = {
  invalidate: async (identifiers: Array<string> | string) => {
    if (typeof identifiers === 'string') {
      identifiers = [identifiers]
    }
    for (const identifier of identifiers) {
      pub.publish(CHANNEL, identifier)
    }
  },

  execute: (...args: ExecutionParameter) => {
    return liveQueryStore.execute(...args)
  }
} as LiveQueryStore
