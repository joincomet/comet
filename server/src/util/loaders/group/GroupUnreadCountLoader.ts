import DataLoader from 'dataloader'
import { Group, GroupUser } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'
import {logger} from "@/util";

export const groupUnreadCountLoader = (em: EntityManager, userId: string) => {
  const loader = new DataLoader<string, number>(async (groupIds: string[]) => {
    logger('groupUnreadCountLoader', groupIds)
    loader.clearAll()
    const groupUsers = await em.find(GroupUser, {
      user: userId,
      group: groupIds
    })
    const map: Record<string, number> = {}
    groupIds.forEach(
      groupId =>
        (map[groupId] =
          groupUsers.find(gu => gu.group === em.getReference(Group, groupId))
            ?.unreadCount ?? 0)
    )
    return groupIds.map(groupId => map[groupId])
  })
  return loader
}
