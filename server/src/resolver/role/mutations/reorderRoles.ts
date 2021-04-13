import { Context } from '@/types'
import { ArgsType, Field, ID, Publisher } from 'type-graphql'
import { Role, Server, ServerPermission } from '@/entity'
import { getReorderPosition } from '@/util'
import { QueryOrder } from '@mikro-orm/core'

@ArgsType()
export class ReorderRoleArgs {
  @Field(() => ID, { nullable: true })
  beforeRoleId?: string

  @Field(() => ID)
  roleId: string
}

export async function reorderRoles(
  { em, user }: Context,
  { beforeRoleId, roleId }: ReorderRoleArgs,
  notifyRolesUpdated: Publisher<{ serverId: string }>
): Promise<Server> {
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
  await notifyRolesUpdated({ serverId: role.server.id })
  return em.findOneOrFail(Server, role.server.id, ['roles.channelRoles'])
}
