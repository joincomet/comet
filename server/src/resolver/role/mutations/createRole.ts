import { Role, ServerPermission } from '@/entity'
import { ArgsType, Field, ID, Publisher } from 'type-graphql'
import { Context } from '@/types'
import { IsHexColor, IsOptional, Length } from 'class-validator'
import { QueryOrder } from '@mikro-orm/core'
import { ReorderUtils } from '@/util'

@ArgsType()
export class CreateRoleArgs {
  @Field(() => ID)
  serverId: string

  @Field()
  @Length(1, 100)
  name: string

  @Field({ nullable: true })
  @IsOptional()
  @IsHexColor()
  color?: string

  @Field(() => [ServerPermission])
  permissions: ServerPermission[]
}

export async function createRole(
  { em, user }: Context,
  { serverId, name, color, permissions }: CreateRoleArgs,
  notifyRolesUpdated: Publisher<{ serverId: string }>
): Promise<Role> {
  await user.checkServerPermission(em, serverId, ServerPermission.ManageRoles)
  const roles = await em.find(
    Role,
    { server: serverId },
    { orderBy: { position: QueryOrder.DESC } }
  )
  const lastRole = roles[0]
  const secondToLastRole = roles[1]
  let position = ReorderUtils.FIRST_POSITION
  if (lastRole) {
    if (secondToLastRole) {
      position = ReorderUtils.positionBetween(
        secondToLastRole.position,
        lastRole.position
      )
    } else {
      position = ReorderUtils.positionBefore(lastRole.position)
    }
  }

  const role = await em.create(Role, {
    server: serverId,
    name,
    color,
    permissions,
    position
  })
  await em.persistAndFlush(role)
  await notifyRolesUpdated({ serverId })
  return role
}
