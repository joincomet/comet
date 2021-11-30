import DataLoader from 'dataloader'
import { Relationship, RelationshipStatus, User } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'
import {logger} from "@/util";

export const relatedUsersLoader = (
  em: EntityManager,
  currentUserId: string
) => {
  const loader = new DataLoader<string, User[]>(async (userIds: string[]) => {
    logger('relatedUsersLoader', userIds)
    loader.clearAll()
    const rels = await em.find(Relationship, { owner: userIds }, ['user'], {
      lastMessageAt: 'DESC'
    })
    const friends = (
      await em.find(Relationship, {
        owner: currentUserId,
        status: RelationshipStatus.Friends
      })
    ).map(rel => rel.user)

    const map: Record<string, User[]> = {}
    userIds.forEach(userId => {
      map[userId] = rels
        .filter(
          rel =>
            rel.owner === em.getReference(User, userId) &&
            (userId === currentUserId || friends.includes(rel.user))
        )
        .map(rel => rel.user)
    })
    return userIds.map(userId => map[userId])
  })
  return loader
}
