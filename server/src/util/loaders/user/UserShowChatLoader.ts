import DataLoader from 'dataloader'
import { Relationship, User } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'

export const userShowChatLoader = (
  em: EntityManager,
  currentUserId: string
) => {
  return new DataLoader<string, boolean>(async (userIds: string[]) => {
    const relationships = await em.find(Relationship, {
      owner: currentUserId,
      user: userIds
    })
    const map: Record<string, boolean> = {}
    userIds.forEach(
      userId =>
        (map[userId] =
          relationships.find(rel => rel.user === em.getReference(User, userId))
            ?.showChat ?? false)
    )
    return userIds.map(userId => map[userId])
  })
}
