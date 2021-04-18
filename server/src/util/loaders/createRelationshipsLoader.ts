import DataLoader from 'dataloader'
import { Relationship, User } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'

export const createRelationshipsLoader = (
  em: EntityManager,
  currentUser: User
) => {
  return new DataLoader<string, Relationship[]>(async (userIds: string[]) => {
    const map: Record<string, Relationship[]> = {}
    return userIds.map(userId => map[userId])
  })
}
