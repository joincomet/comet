import { Field, ID, InputType } from 'type-graphql'
import { ChannelPermission, Role, ServerPermission, User } from '@/entity'
import { Context } from '@/types'

@InputType()
export class UpdateChannelPermissionsInput {
  @Field(() => ID)
  channelId: string

  @Field(() => ID)
  roleId: string

  @Field(() => [ChannelPermission])
  allowedPermissions: ChannelPermission[]

  @Field(() => [ChannelPermission])
  deniedPermissions: ChannelPermission[]
}

export async function updateChannelPermissions(
  { em, userId, liveQueryStore }: Context,
  {
    channelId,
    roleId,
    allowedPermissions,
    deniedPermissions
  }: UpdateChannelPermissionsInput
): Promise<Role> {
  const user = await em.findOneOrFail(User, userId)
  const role = await em.findOneOrFail(Role, roleId)
  await user.checkChannelPermission(
    em,
    channelId,
    ChannelPermission.ManagePermissions,
    ServerPermission.ManageRoles
  )
  const channelPerms = role.channelPermissions
    .getItems()
    .find(channelPerms => channelPerms.channel.id === channelId)
  channelPerms.allowedPermissions = allowedPermissions
  channelPerms.deniedPermissions = deniedPermissions
  await em.persistAndFlush(channelPerms)
  liveQueryStore.invalidate(`Role:${roleId}`)
  return role
}
