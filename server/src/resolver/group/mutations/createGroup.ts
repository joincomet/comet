import { Context } from '@/types'
import { ArgsType, Field, Publisher } from 'type-graphql'
import { Group, User } from '@/entity'
import { GroupUserPayload } from '@/resolver/group/subscriptions/GroupUserPayload'
import { ArrayMaxSize } from 'class-validator'

@ArgsType()
export class CreateGroupArgs {
  @Field(() => [String])
  @ArrayMaxSize(9)
  usernames: string[]
}

export async function createGroup(
  { em, user }: Context,
  { usernames }: CreateGroupArgs,
  notifyUserJoinedGroup: Publisher<GroupUserPayload>
): Promise<Group> {
  if (usernames.length > 9) throw new Error('error.group.maxSize')
  const users = [user]
  for (const username of usernames) {
    users.push(await em.findOneOrFail(User, { username }))
  }
  const group = em.create(Group, {
    users,
    owner: user
  })
  await em.persistAndFlush(group)
  for (const u of users)
    await notifyUserJoinedGroup({ userId: u.id, groupId: group.id })
  return group
}
