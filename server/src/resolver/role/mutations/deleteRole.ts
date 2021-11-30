import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Role, ServerPermission, ServerUser, User } from '@/entity'
import {logger} from "@/util";

@InputType()
export class DeleteRoleInput {
  @Field(() => ID)
  roleId: string
}

export async function deleteRole(
  { em, userId, liveQueryStore }: Context,
  { roleId }: DeleteRoleInput
): Promise<string> {
  logger('deleteRole')
  const user = await em.findOneOrFail(User, userId)
  const role = await em.findOneOrFail(Role, roleId, ['server'])
  if (role.isDefault) throw new Error('Default role cannot be deleted')
  await user.checkServerPermission(
    em,
    role.server.id,
    ServerPermission.ManageServer
  )
  const defaultRole = await em.findOneOrFail(Role, {
    server: role.server,
    isDefault: true
  })
  await em
    .createQueryBuilder(ServerUser)
    .update({ role: defaultRole.id })
    .where({ server: role.server, role })
    .execute()
  await em.remove(role).flush()
  liveQueryStore.invalidate(`Role:${roleId}`)
  return roleId
}
