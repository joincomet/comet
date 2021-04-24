import Redis from 'ioredis'
import { InMemoryLiveQueryStore } from '@n1ru4l/in-memory-live-query-store'
import { execute as defaultExecute, ExecutionArgs } from 'graphql'

const CHANNEL = 'LIVE_QUERY_INVALIDATIONS'

declare type ExecutionParameter =
  | Parameters<typeof defaultExecute>
  | [ExecutionArgs]
export class RedisLiveQueryStore {
  liveQueryStore = new InMemoryLiveQueryStore()
  pub = new Redis(process.env.REDIS_URL)
  sub = new Redis(process.env.REDIS_URL)

  constructor() {
    this.sub.subscribe(CHANNEL, err => {
      if (err) throw err
    })

    this.sub.on('message', (channel, resourceIdentifier) => {
      if (channel === CHANNEL)
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

  async execute(...args: ExecutionParameter) {
    return this.liveQueryStore.execute(...args)
  }
}
