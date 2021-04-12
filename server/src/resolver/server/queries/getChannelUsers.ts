import { Field, ObjectType } from 'type-graphql'
import { Channel, ServerUser, User } from '@/entity'
import { Context, ServerPermission } from '@/types'

@ObjectType()
export class ChannelUsersResponse {
  @Field()
  role: string

  @Field(() => [User])
  users: User[]
}

export async function getChannelUsers(
  { em }: Context,
  channelId: string
): Promise<ChannelUsersResponse[]> {
  const channel = await em.findOneOrFail(Channel, channelId, ['server.roles'])
  const joins = await em.find(ServerUser, { server: channel.server }, [
    'user',
    'roles'
  ])

  const result = []

  const compareFn = (a: User, b: User) => a.username.localeCompare(b.username)

  for (const role of channel.server.roles
    .getItems()
    .filter(role =>
      role.permissions.includes(ServerPermission.DisplayRoleSeparately)
    )) {
    const roleUsers = joins
      .filter(join => join.roles.getItems()[0] === role)
      .map(join => join.user)
      .sort(compareFn)
    if (roleUsers.length > 0) {
      result.push({
        role: role.name,
        users: roleUsers
      } as ChannelUsersResponse)
    }
  }

  const onlineUsers = joins
    .filter(
      join =>
        join.user.isOnline &&
        join.roles
          .getItems()
          .filter(role =>
            role.permissions.includes(ServerPermission.DisplayRoleSeparately)
          ).length === 0
    )
    .map(join => join.user)
    .sort(compareFn)

  if (onlineUsers.length > 0) {
    result.push({
      role: 'Online',
      users: onlineUsers
    } as ChannelUsersResponse)
  }

  const offlineUsers = joins
    .filter(join => !join.user.isOnline)
    .map(join => join.user)
    .sort(compareFn)

  if (offlineUsers.length > 0) {
    result.push({
      role: 'Offline',
      users: offlineUsers
    } as ChannelUsersResponse)
  }

  return result
}
