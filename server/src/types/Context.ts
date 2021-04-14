import { EntityManager } from '@mikro-orm/postgresql'
import { Channel, Folder, User } from '@/entity'
import { InMemoryLiveQueryStore } from '@n1ru4l/in-memory-live-query-store'
import DataLoader from 'dataloader'

export interface Context {
  em: EntityManager
  user: User
  liveQueryStore: InMemoryLiveQueryStore
  loaders: {
    channelLoader: DataLoader<string, Channel[]>
    serverFolderLoader: DataLoader<string, Folder[]>
    userFolderLoader: DataLoader<string, Folder[]>
  }
}
