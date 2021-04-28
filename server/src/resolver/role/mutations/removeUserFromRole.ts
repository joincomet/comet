import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import {
  Role,
  ServerPermission,
  ServerUser,
  ServerUserStatus,
  User
} from '@/entity'
import { AddUserToRoleInput } from '@/resolver/role/mutations/addUserToRole'

@InputType()
export class RemoveUserFromRoleInput {
  @Field(() => ID)
  roleId: string

  @Field(() => ID)
  userId: string
}

export async function removeUserFromRole(
  { em, userId: currentUserId, liveQueryStore }: Context,
  { roleId, userId }: AddUserToRoleInput
): Promise<ServerUser> {
  const role = await em.findOneOrFail(Role, roleId, ['server'])
  const currentUser = await em.findOneOrFail(User, currentUserId)
  await currentUser.checkServerPermission(
    em,
    role.server.id,
    ServerPermission.ManageServer
  )
  const serverUser = await em.findOneOrFail(ServerUser, {
    user: userId,
    server: role.server,
    status: ServerUserStatus.Joined
  })
  if (!role.serverUsers.contains(serverUser))
    throw new Error('User does not have this role')
  role.serverUsers.remove(serverUser)
  liveQueryStore.invalidate(`User:${userId}`)
  return serverUser
}
