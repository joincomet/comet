import { Role, ServerPermission, User } from '@/entity'
import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Length } from 'class-validator'
import { QueryOrder } from '@mikro-orm/core'
import { ReorderUtils } from '@/util'

@InputType()
export class CreateRoleInput {
  @Field(() => ID)
  serverId: string

  @Field()
  @Length(1, 100)
  name: string
}

export async function createRole(
  { em, userId, liveQueryStore }: Context,
  { serverId, name }: CreateRoleInput
): Promise<Role> {
  name = name.trim()
  const user = await em.findOneOrFail(User, userId)
  await user.checkServerPermission(em, serverId, ServerPermission.ManageServer)
  const roles = await em.find(
    Role,
    { server: serverId },
    { orderBy: { position: QueryOrder.DESC } }
  )
  if (roles.map(r => r.name.toLowerCase()).includes(name.toLowerCase()))
    throw new Error('That role already exists')
  const lastRole = roles[0]
  let position = ReorderUtils.FIRST_POSITION
  if (lastRole) {
    position = ReorderUtils.positionAfter(lastRole.position)
  }

  const role = await em.create(Role, {
    server: serverId,
    name,
    position
  })
  await em.persistAndFlush(role)
  liveQueryStore.invalidate(`Server:${serverId}`)
  return role
}
