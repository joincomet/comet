import { Context } from '@/types'
import { GroupUserPayload } from '@/resolver/group/subscriptions/GroupUserPayload'
import { Publisher } from 'type-graphql'
import { Group } from '@/entity'

export async function leaveGroup(
  { em, user }: Context,
  groupId: string,
  notifyUserLeftGroup: Publisher<GroupUserPayload>
): Promise<boolean> {
  const group = await em.findOneOrFail(Group, groupId, ['users'])
  group.users.remove(user)
  if (group.owner === user) group.owner = group.users.getItems()[0]
  await em.persistAndFlush(group)
  await notifyUserLeftGroup({ userId: user.id, groupId: group.id })
  return true
}
