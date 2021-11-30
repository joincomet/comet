import DataLoader from 'dataloader'
import { Relationship, User } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'
import {logger} from "@/util";

export const userLastMessageAtLoader = (
  em: EntityManager,
  currentUserId: string
) => {
  const loader = new DataLoader<string, Date>(async (userIds: string[]) => {
    logger('userLastMessageAtLoader', userIds)
    loader.clearAll()
    const relationships = await em.find(Relationship, {
      owner: currentUserId,
      user: userIds
    })
    const map: Record<string, Date> = {}
    userIds.forEach(
      userId =>
        (map[userId] = relationships.find(
          rel => rel.user === em.getReference(User, userId)
        )?.lastMessageAt)
    )
    return userIds.map(userId => map[userId])
  })
  return loader
}
