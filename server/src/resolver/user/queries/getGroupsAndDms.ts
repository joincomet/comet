import { createUnionType } from 'type-graphql'
import { FriendData, Group, GroupUser, User } from '@/entity'
import { QueryOrder } from '@mikro-orm/core'
import { Context } from '@/types'

export const GroupDmUnion = createUnionType({
  name: 'GroupDmUnion',
  types: () => [Group, User] as const
})

export async function getGroupsAndDms({
  em,
  user
}: Context): Promise<Array<typeof GroupDmUnion>> {
  const dms = await em.find(FriendData, { user, showChat: true }, ['friend'], {
    lastMessageAt: QueryOrder.DESC
  })
  dms.forEach(dm => (dm.friend.unreadCount = dm.unreadCount))

  const groupUsers = await em.find(GroupUser, { user }, ['group'])
  groupUsers.forEach(gu => (gu.group.unreadCount = gu.unreadCount))
  const groups = groupUsers.map(gu => gu.group)

  const arr: (Group | FriendData)[] = [].concat(groups).concat(dms)
  return arr
    .sort((a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime())
    .map(i => {
      if (i instanceof Group) return i
      else if (i instanceof FriendData) return i.friend
    })
}
