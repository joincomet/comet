import DataLoader from 'dataloader'
import { Group, User } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'
import {logger} from "@/util";

export const userGroupsLoader = (em: EntityManager, currentUserId: string) => {
  const loader = new DataLoader<string, Group[]>(async (userIds: string[]) => {
    logger('userGroupsLoader', userIds)
    loader.clearAll()
    const groups = await em.find(Group, { users: userIds }, ['users'], {
      lastMessageAt: 'DESC'
    })
    const map: Record<string, Group[]> = {}
    userIds.forEach(userId => {
      map[userId] = groups.filter(group => {
        group.users.contains(em.getReference(User, currentUserId)) &&
          group.users.contains(em.getReference(User, userId))
      })
    })
    return userIds.map(userId => map[userId])
  })
  return loader
}
