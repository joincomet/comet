import DataLoader from 'dataloader'
import { ChannelPermissions, User } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'

export const createChannelPermissionsLoader = (
  em: EntityManager,
  currentUser: User
) => {
  return new DataLoader<string, ChannelPermissions[]>(
    async (channelIds: string[]) => {
      const map: Record<string, ChannelPermissions[]> = {}
      return channelIds.map(channelId => map[channelId])
    }
  )
}
