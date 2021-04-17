import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Role, ServerPermission } from '@/entity'
import { QueryOrder } from '@mikro-orm/core'
import { getReorderPosition } from '@/util'

@InputType()
export class MoveRoleInput {
  @Field(() => ID)
  roleId: string

  @Field(() => ID, { nullable: true })
  beforeRoleId?: string
}

export async function moveRole(
  { em, user, liveQueryStore }: Context,
  { roleId, beforeRoleId }: MoveRoleInput
): Promise<Role> {
  const role = await em.findOneOrFail(Role, roleId, ['server'])
  await user.checkServerPermission(
    em,
    role.server.id,
    ServerPermission.ManageRoles
  )
  const roles = await em.find(
    Role,
    { server: role.server },
    { orderBy: { position: QueryOrder.ASC } }
  )
  const firstRole = roles[0]
  const beforeRole = beforeRoleId
    ? roles.find(r => r.id === beforeRoleId)
    : null
  const afterRole = beforeRole ? roles[roles.indexOf(beforeRole) + 1] : null
  role.position = getReorderPosition(
    firstRole?.position,
    beforeRole?.position,
    afterRole?.position
  )
  await em.persistAndFlush(role)
  liveQueryStore.invalidate(`Role:${roleId}`)
  return role
}
