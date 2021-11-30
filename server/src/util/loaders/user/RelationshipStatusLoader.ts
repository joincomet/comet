import DataLoader from 'dataloader'
import { Relationship, RelationshipStatus, User } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'
import {logger} from "@/util";

export const relationshipStatusLoader = (
  em: EntityManager,
  currentUserId: string
) => {
  const loader = new DataLoader<string, RelationshipStatus>(
    async (userIds: string[]) => {
      logger('relationshipStatusLoader', userIds)
      loader.clearAll()
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
  return loader
}
