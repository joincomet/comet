import DataLoader from 'dataloader'
import { Relationship, User } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'

export const userLastMessageAtLoader = (
  em: EntityManager,
  currentUserId: string
) => {
  return new DataLoader<string, Date>(async (userIds: string[]) => {
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
}
