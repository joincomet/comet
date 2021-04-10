import { Arg, Ctx, ID, Query, Resolver } from 'type-graphql'
import {
  Channel,
  ChannelRole,
  Server,
  ServerRole,
  ServerUserJoin
} from '@/entity'
import { CheckJoinedChannelServer } from '@/util/auth/middlewares/CheckJoinedChannelServer'
import { GetChannelPermissionsResponse } from '@/resolver/user'
import { ChannelPermission, Context, ServerPermission } from '@/types'
import { CheckJoinedServer } from '@/util/auth/middlewares/CheckJoinedServer'
import { QueryOrder } from '@mikro-orm/core'
import { ChannelUser } from '@/entity/ChannelUser'

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
}
