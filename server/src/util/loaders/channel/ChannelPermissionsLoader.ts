import DataLoader from 'dataloader'
import {
  Channel,
  ChannelPermission,
  ChannelPermissionFallbacks,
  ServerPermission,
  ServerUser,
  ServerUserStatus,
  User
} from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'

export const channelPermissionsLoader = (em: EntityManager, userId: string) => {
  return new DataLoader<string, ChannelPermission[]>(
    async (channelIds: string[]) => {
      const currentUser = await em.findOneOrFail(User, userId)
      const channels = await em.find(Channel, channelIds)
      const servers = [...new Set(channels.map(channel => channel.server))]

      const serverUsers = await em.find(
        ServerUser,
        {
          server: servers,
          user: currentUser,
          status: ServerUserStatus.Joined
        },
        ['roles.channelPermissions', 'server']
      )
      const map: Record<string, ChannelPermission[]> = {}
      channelIds.forEach(channelId => {
        const channel = channels.find(
          channel => channel === em.getReference(Channel, channelId)
        )
        if (!channel) {
          map[channelId] = []
          return
        }
        let serverPerms: ServerPermission[] = []
        let allowedPerms: ChannelPermission[] = []
        let deniedPerms: ChannelPermission[] = []
        const serverUser = serverUsers.find(su => su.server === channel.server)
        if (!serverUser) {
          map[channelId] = []
          return
        }
        if (currentUser.isAdmin || serverUser.server.owner === currentUser) {
          map[channelId] = Object.values(ChannelPermission)
          return
        }
        const roles = serverUser?.roles.getItems() ?? []
        roles.forEach(role => {
          serverPerms.push(...role.permissions)
          const channelPerms = role.channelPermissions
            .getItems()
            .find(c => c.channel === em.getReference(Channel, channelId))
          allowedPerms.push(...(channelPerms?.allowedPermissions ?? []))
          deniedPerms.push(...(channelPerms?.deniedPermissions ?? []))
        })
        serverPerms = [...new Set(serverPerms)]
        allowedPerms = [...new Set(allowedPerms)]
        deniedPerms = [...new Set(deniedPerms)]
        map[channelId] = Object.values(ChannelPermission).filter(perm => {
          if (deniedPerms.includes(perm)) return false
          else {
            if (allowedPerms.includes(perm)) return true
            if (serverPerms.includes(ChannelPermissionFallbacks[perm]))
              return true
          }
          return false
        })
      })
      return channelIds.map(channelId => map[channelId])
    }
  )
}
