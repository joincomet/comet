import DataLoader from 'dataloader'
import { Relationship, RelationshipStatus, User } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'

export const relationshipStatusLoader = (
  em: EntityManager,
  currentUserId: string
) => {
  return new DataLoader<string, RelationshipStatus>(
    async (userIds: string[]) => {
      const rels = await em.find(Relationship, {
        owner: currentUserId,
        user: userIds
      })
      const map: Record<string, RelationshipStatus> = {}
      userIds.forEach(userId => {
        map[userId] =
          rels.find(rel => rel.user === em.getReference(User, userId))
            ?.status ?? RelationshipStatus.None
      })
      return userIds.map(userId => map[userId])
    }
  )
}
