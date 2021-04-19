import DataLoader from 'dataloader'
import { Channel, ChannelPermissions, User } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'

export const channelRolePermissionsLoader = (em: EntityManager) => {
  return new DataLoader<string, ChannelPermissions[]>(
    async (channelIds: string[]) => {
      const channelPerms = await em.find(
        ChannelPermissions,
        { channel: channelIds },
        ['role'],
        { role: { position: 'DESC' } }
      )
      const map: Record<string, ChannelPermissions[]> = {}
      channelIds.forEach(channelId => {
        map[channelId] = channelPerms.filter(
          channelPerm =>
            channelPerm.channel === em.getReference(Channel, channelId)
        )
      })
      return channelIds.map(channelId => map[channelId])
    }
  )
}
