import { Arg, Ctx, ID, Query, Resolver } from 'type-graphql'
import { Channel, ChannelRole, Server, ServerUserJoin } from '@/entity'
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
  ): Promise<GetChannelPermissionsResponse> {
    const channel = await em.findOneOrFail(Channel, channelId, ['server'])
    const join = await em.findOne(
      ServerUserJoin,
      { server: channel.server, user },
      ['roles']
    )
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
  @Query(() => [Channel])
  async getServerChannels(
    @Ctx() { em }: Context,
    @Arg('serverId', () => ID) serverId: string
  ): Promise<Channel[]> {
    const server = await em.findOneOrFail(Server, serverId)
    return server.channels.matching({
      orderBy: { position: QueryOrder.DESC }
    })
  }
}
