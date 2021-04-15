import { Role, ServerPermission } from '@/entity'
import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { IsHexColor, IsOptional, Length } from 'class-validator'
import { QueryOrder } from '@mikro-orm/core'
import { ReorderUtils } from '@/util'

@InputType()
export class CreateRoleInput {
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
  { em, user, liveQueryStore }: Context,
  { serverId, name, color, permissions }: CreateRoleInput
): Promise<Role> {
  await user.checkServerPermission(em, serverId, ServerPermission.ManageServer)
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
  liveQueryStore.invalidate(`Server:${serverId}`)
  return role
}
