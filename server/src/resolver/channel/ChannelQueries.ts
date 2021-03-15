import { Arg, Ctx, ID, Query, Resolver } from 'type-graphql'
import { Channel, ChannelRole, Server } from '@/entity'
import { CheckJoinedChannelServer } from '@/util/auth/middlewares/CheckJoinedChannelServer'
import { GetChannelPermissionsResponse } from '@/resolver/user'
import { ChannelPermission, Context } from '@/types'
import { CheckJoinedServer } from '@/util/auth/middlewares/CheckJoinedServer'
import { QueryOrder } from '@mikro-orm/core'

@Resolver(() => Channel)
export class ChannelQueries {
  @CheckJoinedChannelServer()
  @Query(() => GetChannelPermissionsResponse)
  async getChannelPermissions(
    @Ctx() { user, em }: Context,
    @Arg('channelId', () => ID) channelId: string
  ) {
    const channel = await em.findOneOrFail(Channel, channelId, [
      'owner',
      'roles'
    ])
    const roles = await user.roles.matching({
      where: { server: channel.server }
    })

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
      channelRole.allowedPermissions.forEach(perm =>
        allowedPermissions.add(perm)
      )
      channelRole.deniedPermissions.forEach(perm => deniedPermissions.add(perm))
    }

    return {
      allowedPermissions: [...allowedPermissions],
      deniedPermissions: [...deniedPermissions]
    } as GetChannelPermissionsResponse
  }

  @CheckJoinedServer()
  async getServerChannels(
    @Ctx() { user, em }: Context,
    @Arg('serverId', () => ID) serverId: string
  ) {
    const server = await em.findOneOrFail(Server, serverId)
    const channels = await server.channels.matching({
      orderBy: { position: QueryOrder.DESC }
    })
    return channels
  }
}
