import { GroupUserPayload } from '@/resolver/group/subscriptions'
import { Publisher } from 'type-graphql'
import { Context } from '@/types'
import { Group, GroupUser } from '@/entity'

export async function readGroup(
  { em, user }: Context,
  groupId: string,
  notifyGroupRead: Publisher<GroupUserPayload>
): Promise<Group> {
  const group = await em.findOneOrFail(Group, groupId)
  let groupUser = await em.findOne(GroupUser, { user, group })
  if (!groupUser) groupUser = em.create(GroupUser, { user, group })
  groupUser.lastViewAt = new Date()
  groupUser.unreadCount = 0
  await em.persistAndFlush(groupUser)
  group.unreadCount = 0
  await notifyGroupRead({ userId: user.id, groupId })
  return group
}
