import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Role, ServerPermission, ServerUser, ServerUserStatus } from '@/entity'

@InputType()
export class AddUserToRoleInput {
  @Field(() => ID)
  roleId: string

  @Field(() => ID)
  userId: string
}

export async function addUserToRole(
  { em, user: currentUser, liveQueryStore }: Context,
  { roleId, userId }: AddUserToRoleInput
): Promise<ServerUser> {
  const role = await em.findOneOrFail(Role, roleId, ['server'])
  await currentUser.checkServerPermission(
    em,
    role.server.id,
    ServerPermission.ManageRoles
  )
  const serverUser = await em.findOneOrFail(ServerUser, {
    user: userId,
    server: role.server,
    status: ServerUserStatus.Joined
  })
  if (role.serverUsers.contains(serverUser))
    throw new Error('User already has this role')
  role.serverUsers.add(serverUser)
  liveQueryStore.invalidate(`User:${userId}`)
  return serverUser
}
