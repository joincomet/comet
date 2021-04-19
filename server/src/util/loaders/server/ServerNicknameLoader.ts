import DataLoader from 'dataloader'
import { Server, ServerUser, User } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'

export const serverNicknameLoader = (em: EntityManager, userId: string) => {
  return new DataLoader<string, string>(async (serverIds: string[]) => {
    const serverUsers = await em.find(ServerUser, {
      user: userId,
      server: serverIds
    })
    const map: Record<string, string> = {}
    serverIds.forEach(
      serverId =>
        (map[serverId] = serverUsers.find(
          su => su.server === em.getReference(Server, serverId)
        )?.nickname)
    )
    return serverIds.map(serverId => map[serverId])
  })
}
