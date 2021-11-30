import DataLoader from 'dataloader'
import { Relationship, User } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'
import {logger} from "@/util";

export const userUnreadCountLoader = (
  em: EntityManager,
  currentUserId: string
) => {
  const loader = new DataLoader<string, number>(async (userIds: string[]) => {
    logger('userUnreadCountLoader', userIds)
    loader.clearAll()
    const relationships = await em.find(Relationship, {
      owner: currentUserId,
      user: userIds
    })
    const map: Record<string, number> = {}
    userIds.forEach(
      userId =>
        (map[userId] =
          relationships.find(rel => rel.user === em.getReference(User, userId))
            ?.unreadCount ?? 0)
    )
    return userIds.map(userId => map[userId])
  })
  return loader
}
