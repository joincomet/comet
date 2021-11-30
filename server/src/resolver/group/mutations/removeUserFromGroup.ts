import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Group, Message, MessageType, User } from '@/entity'
import {logger} from "@/util";

@InputType()
export class RemoveUserFromGroupInput {
  @Field(() => ID)
  groupId: string

  @Field(() => ID)
  userId: string
}

export async function removeUserFromGroup(
  { em, userId: currentUserId, liveQueryStore }: Context,
  { groupId, userId }: RemoveUserFromGroupInput
): Promise<Group> {
  logger('removeUserFromGroup')
  const group = await em.findOneOrFail(Group, groupId, ['users', 'owner'])
  const user = await em.findOneOrFail(User, userId)
  if (group.owner !== em.getReference(User, currentUserId))
    throw new Error('Must be group owner to remove users')
  group.users.remove(user)
  const message = em.create(Message, {
    author: user,
    type: MessageType.Left,
    group
  })
  await em.persistAndFlush([group, message])
  liveQueryStore.invalidate(`Group:${groupId}`)
  return group
}
