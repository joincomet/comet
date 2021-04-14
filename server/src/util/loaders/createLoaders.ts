import { EntityManager } from '@mikro-orm/postgresql'
import { createChannelsLoader } from '@/util/loaders/ChannelsLoader'
import { User } from '@/entity'
import { createServerFoldersLoader } from '@/util/loaders/ServerFoldersLoader'
import { createUserFoldersLoader } from '@/util/loaders/UserFoldersLoader'

export const createLoaders = (em: EntityManager, user: User) => ({
  channelLoader: createChannelsLoader(em),
  serverFoldersLoader: createServerFoldersLoader(em),
  userFoldersLoader: createUserFoldersLoader(em)
})
