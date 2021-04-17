import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Role, ServerPermission } from '@/entity'

@InputType()
export class DeleteRoleInput {
  @Field(() => ID)
  roleId: string
}

export async function deleteRole(
  { em, user, liveQueryStore }: Context,
  { roleId }: DeleteRoleInput
): Promise<boolean> {
  const role = await em.findOneOrFail(Role, roleId, ['server'])
  await user.checkServerPermission(
    em,
    role.server.id,
    ServerPermission.ManageRoles
  )
  await em.remove(role).flush()
  liveQueryStore.invalidate(`Role:${roleId}`)
  return true
}
