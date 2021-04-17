import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Group, GroupUser } from '@/entity'

@InputType()
export class ReadGroupInput {
  @Field(() => ID)
  groupId: string
}

export async function readGroup(
  { em, user, liveQueryStore }: Context,
  { groupId }: ReadGroupInput
): Promise<Group> {
  const group = await em.findOneOrFail(Group, groupId, ['users'])
  await user.checkInGroup(em, group.id)
  let groupUser = await em.findOne(GroupUser, { user, group })
  if (!groupUser) groupUser = em.create(GroupUser, { user, group })
  groupUser.lastViewAt = new Date()
  groupUser.unreadCount = 0
  await em.persist(groupUser)
  group.unreadCount = 0
  liveQueryStore.invalidate(`Group:${groupId}`)
  return group
}
