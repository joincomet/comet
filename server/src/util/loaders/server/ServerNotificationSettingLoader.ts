import DataLoader from 'dataloader'
import { Server, ServerUser } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'
import { NotificationSetting } from '@/types'

export const serverNotificationSettingLoader = (
  em: EntityManager,
  userId: string
) => {
  return new DataLoader<string, NotificationSetting>(
    async (serverIds: string[]) => {
      const serverUsers = await em.find(ServerUser, {
        user: userId,
        server: serverIds
      })
      const map: Record<string, NotificationSetting> = {}
      serverIds.forEach(
        serverId =>
          (map[serverId] = serverUsers.find(
            su => su.server === em.getReference(Server, serverId)
          )?.notificationSetting)
      )
      return serverIds.map(serverId => map[serverId])
    }
  )
}
