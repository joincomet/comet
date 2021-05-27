import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Group, User } from '@/entity'
import {logger} from "@/util";

@InputType()
export class LeaveGroupInput {
  @Field(() => ID)
  groupId: string
}

export async function leaveGroup(
  { em, userId, liveQueryStore }: Context,
  { groupId }: LeaveGroupInput
): Promise<boolean> {
  logger('leaveGroup')
  const user = await em.findOneOrFail(User, userId)
  const group = await em.findOneOrFail(Group, groupId, ['users', 'owner'])
  await user.checkInGroup(em, group.id)
  group.users.remove(user)
  if (group.owner === user) group.owner = group.users[0]
  await em.persistAndFlush(group)
  liveQueryStore.invalidate(`Group:${groupId}`)
  return true
}
