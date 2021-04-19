import DataLoader from 'dataloader'
import { Group, User } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'

export const userGroupsLoader = (em: EntityManager, currentUserId: string) => {
  return new DataLoader<string, Group[]>(async (userIds: string[]) => {
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
}
