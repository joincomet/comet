import { EntityManager } from '@mikro-orm/postgresql'
import { Channel, Folder, User } from '@/entity'
import { InMemoryLiveQueryStore } from '@n1ru4l/in-memory-live-query-store'
import DataLoader from 'dataloader'
import { Request, Response } from 'express'

export interface Context {
  em: EntityManager
  user: User
  liveQueryStore: InMemoryLiveQueryStore
  req: Request
  res: Response
  loaders: {
    channelLoader: DataLoader<string, Channel[]>
    serverFoldersLoader: DataLoader<string, Folder[]>
    userFoldersLoader: DataLoader<string, Folder[]>
  }
}
