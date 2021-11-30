import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Group, GroupUser, User } from '@/entity'
import {logger} from "@/util";

@InputType()
export class ReadGroupInput {
  @Field(() => ID)
  groupId: string
}

export async function readGroup(
  { em, userId, liveQueryStore }: Context,
  { groupId }: ReadGroupInput
): Promise<Group> {
  logger('readGroup')
  const group = await em.findOneOrFail(Group, groupId, ['users'])
  const user = em.getReference(User, userId)
  if (!group.users.contains(user)) throw new Error('Not group member')
  let groupUser = await em.findOne(GroupUser, { user, group })
  if (!groupUser) groupUser = em.create(GroupUser, { user, group })
  groupUser.lastViewAt = new Date()
  groupUser.unreadCount = 0
  await em.persist(groupUser)
  group.unreadCount = 0
  // liveQueryStore.invalidate(`Group:${groupId}`)
  return group
}
