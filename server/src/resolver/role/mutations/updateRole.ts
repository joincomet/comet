import { Field, ID, InputType } from 'type-graphql'
import { IsHexColor, IsOptional, Length } from 'class-validator'
import {
  ChannelPermission,
  Role,
  ServerPermission,
  ServerUser,
  ServerUserStatus
} from '@/entity'
import { Context } from '@/types'
import { QueryOrder } from '@mikro-orm/core'
import { getReorderPosition } from '@/util'

@InputType()
class UpdateChannelRoleInput {
  @Field(() => ID)
  channelId: string

  @Field(() => [ChannelPermission])
  allowedPermissions: ChannelPermission[]

  @Field(() => [ChannelPermission])
  deniedPermissions: ChannelPermission[]
}

@InputType()
export class UpdateRoleInput {
  @Field(() => ID)
  roleId: string

  @Field({ nullable: true })
  @Length(1, 100)
  @IsOptional()
  name?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsHexColor()
  color?: string

  @Field(() => [ServerPermission], { nullable: true })
  permissions?: ServerPermission[]

  @Field(() => ID, { nullable: true })
  addedUserId: string

  @Field(() => ID, { nullable: true })
  removedUserId: string

  @Field({ defaultValue: false })
  isDeleted: boolean = false

  @Field(() => ID, { nullable: true })
  beforeRoleId?: string

  @Field(() => UpdateChannelRoleInput, { nullable: true })
  updateChannelRole?: UpdateChannelRoleInput
}

export async function updateRole(
  { em, user, liveQueryStore }: Context,
  {
    roleId,
    name,
    color,
    permissions,
    addedUserId,
    removedUserId,
    isDeleted,
    beforeRoleId,
    updateChannelRole
  }: UpdateRoleInput
): Promise<Role> {
  const role = await em.findOneOrFail(Role, { id: roleId })
  await user.checkServerPermission(
    em,
    role.server.id,
    ServerPermission.ManageServer
  )

  if (isDeleted) {
    await em.remove(role).flush()
  } else {
    // Update channel-specific permissions
    if (updateChannelRole) {
      const {
        channelId,
        allowedPermissions,
        deniedPermissions
      } = updateChannelRole
      const channelRole = role.channelRoles
        .getItems()
        .find(channelRole => channelRole.channel.id === channelId)
      channelRole.allowedPermissions = allowedPermissions
      channelRole.deniedPermissions = deniedPermissions
      em.persist(channelRole)
    }

    // Update properties
    em.assign(role, {
      name: name ?? role.name,
      color: color ?? role.color,
      permissions: permissions ?? role.permissions
    })

    // Reorder role
    if (typeof beforeRoleId === 'string') {
      const roles = await em.find(
        Role,
        { server: role.server },
        { orderBy: { position: QueryOrder.ASC } }
      )
      const firstRole = roles[0]
      const beforeRole =
        beforeRoleId !== '0' ? roles.find(r => r.id === beforeRoleId) : null
      const afterRole = beforeRole ? roles[roles.indexOf(beforeRole) + 1] : null
      role.position = getReorderPosition(
        firstRole?.position,
        beforeRole?.position,
        afterRole?.position
      )
    }

    // Add/remove users
    if (removedUserId || addedUserId) {
      await user.checkServerPermission(
        em,
        role.server.id,
        ServerPermission.ManageUsers
      )
      if (removedUserId) {
        const serverUser = await em.findOneOrFail(ServerUser, {
          user: removedUserId,
          server: role.server,
          status: ServerUserStatus.Joined
        })
        role.serverUsers.remove(serverUser)
      }
      if (addedUserId) {
        const serverUser = await em.findOneOrFail(ServerUser, {
          user: addedUserId,
          server: role.server,
          status: ServerUserStatus.Joined
        })
        role.serverUsers.add(serverUser)
      }
    }
    await em.persistAndFlush(role)
  }
  liveQueryStore.invalidate(`Role:${roleId}`)
  return role
}
