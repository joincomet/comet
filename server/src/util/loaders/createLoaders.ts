import { EntityManager } from '@mikro-orm/postgresql'
import { createChannelsLoader } from '@/util/loaders/createChannelsLoader'
import { User } from '@/entity'
import { createServerFoldersLoader } from '@/util/loaders/createServerFoldersLoader'
import { createUserFoldersLoader } from '@/util/loaders/createUserFoldersLoader'
import { createServersLoader } from '@/util/loaders/createServersLoader'

export const createLoaders = (em: EntityManager, user: User) => ({
  channelLoader: createChannelsLoader(em, user),
  serverFoldersLoader: createServerFoldersLoader(em),
  userFoldersLoader: createUserFoldersLoader(em, user),
  serversLoader: createServersLoader(em, user)
})
