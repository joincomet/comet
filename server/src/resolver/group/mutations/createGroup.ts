import { Context } from '@/types'
import { Field, InputType } from 'type-graphql'
import { Group, Message, MessageType, User } from '@/entity'
import { ArrayMaxSize } from 'class-validator'
import {logger} from "@/util";

@InputType()
export class CreateGroupInput {
  @Field(() => [String])
  @ArrayMaxSize(9)
  usernames: string[]
}

export async function createGroup(
  { em, userId, liveQueryStore }: Context,
  { usernames }: CreateGroupInput
): Promise<Group> {
  logger('createGroup')
  if (usernames.length > 9) throw new Error('error.group.maxSize')
  const user = await em.findOneOrFail(User, userId)
  const users = [user]
  for (const username of usernames) {
    users.push(await em.findOneOrFail(User, { username }))
  }
  const group = em.create(Group, {
    users,
    owner: user
  })
  const initialMessage = em.create(Message, {
    type: MessageType.Initial,
    author: user,
    group
  })
  await em.persistAndFlush([group, initialMessage])
  liveQueryStore.invalidate(users.map(user => `User:${user.id}`))
  return group
}
