import { Field, ObjectType } from 'type-graphql'
import { ChannelPermission, Context } from '@/types'
import { Channel, ChannelRole, ServerUser } from '@/entity'

@ObjectType()
export class GetChannelPermissionsResponse {
  @Field(() => [ChannelPermission])
  allowedPermissions: ChannelPermission[]

  @Field(() => [ChannelPermission])
  deniedPermissions: ChannelPermission[]
}

export async function getChannelPermissions(
  { em, user }: Context,
  channelId: string
): Promise<GetChannelPermissionsResponse> {
  const channel = await em.findOneOrFail(Channel, channelId, ['server'])
  const join = await em.findOne(ServerUser, { server: channel.server, user }, [
    'roles'
  ])
  const roles = join.roles.getItems()

  const channelRoles = await em.find(ChannelRole, {
    $and: [
      { channel },
      {
        role: {
          $in: roles
        }
      }
    ]
  })

  const allowedPermissions = new Set<ChannelPermission>()
  const deniedPermissions = new Set<ChannelPermission>()

  for (const channelRole of channelRoles) {
    channelRole.allowedPermissions.forEach(perm => allowedPermissions.add(perm))
    channelRole.deniedPermissions.forEach(perm => deniedPermissions.add(perm))
  }

  return {
    allowedPermissions: [...allowedPermissions],
    deniedPermissions: [...deniedPermissions]
  } as GetChannelPermissionsResponse
}
