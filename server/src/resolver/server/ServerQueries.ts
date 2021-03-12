import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Query,
  Resolver,
  UseMiddleware
} from 'type-graphql'
import { ChatChannel, Server } from '@/entity'
import {
  ChannelUsersResponse,
  GetServersArgs,
  GetServersResponse,
  GetServersSort
} from '@/resolver/server'
import { QueryOrder } from '@mikro-orm/core'
import { Context } from '@/types'
import { ServerPermission } from '@/types/ServerPermission'
import { ChannelPermission } from '@/types/ChannelPermission'
import { CheckChannelPermission } from '@/util'

@Resolver(() => Server)
export class ServerQueries {
  @Authorized()
  @Query(() => GetServersResponse)
  async getServers(
    @Args()
    { sort, category, page, pageSize }: GetServersArgs,
    @Ctx() { user, em }: Context
  ) {
    await em.populate(user, ['servers'])

    let where = {}
    let orderBy = {}

    if (sort === GetServersSort.FEATURED) {
      where = { featured: true }
      orderBy = { featuredPosition: QueryOrder.ASC }
    } else if (category) {
      where = { category: category }
      orderBy = { name: QueryOrder.ASC }
    }

    if (sort === GetServersSort.NEW) {
      orderBy = { createdAt: QueryOrder.DESC }
    } else if (sort === GetServersSort.TOP) {
      orderBy = { userCount: QueryOrder.DESC }
    } else if (sort === GetServersSort.AZ) {
      orderBy = { name: QueryOrder.ASC }
    }

    const servers = await em.find(
      Server,
      where,
      [],
      orderBy,
      pageSize,
      page * pageSize
    )

    return {
      servers: servers,
      page,
      nextPage: page >= 0 && servers.length >= pageSize ? page + 1 : null
    } as GetServersResponse
  }

  @Authorized()
  @Query(() => [Server])
  async getJoinedServers(@Ctx() { user, em }: Context) {
    await em.populate(user, ['serverJoins.server'])
    const joins = user.serverJoins
    return joins.getItems().map(join => join.server)
  }

  @CheckChannelPermission(
    ChannelPermission.ViewChannel,
    ServerPermission.ViewChannels
  )
  @Query(() => [ChannelUsersResponse])
  async getChannelUsers(
    @Ctx() { em }: Context,
    @Arg('channelId', () => ID) channelId: string
  ) {
    const channel = await em.findOneOrFail(ChatChannel, channelId, [
      'server.userJoins.user',
      'server.roles'
    ])
    const joins = channel.server.userJoins
    const users = joins.getItems().map(join => join.user)
    for (const user of users) {
      await user.roles.matching({
        where: { server: channel.server },
        orderBy: { position: QueryOrder.DESC },
        store: true
      })
    }

    const result = []

    for (const role of channel.server.roles
      .getItems()
      .filter(role =>
        role.hasPermission(ServerPermission.DisplayRoleSeparately)
      )) {
      result.push({
        role: role.name,
        users: users.filter(
          user =>
            user.isOnline &&
            user.roles.length > 0 &&
            user.roles.getItems()[0] === role
        )
      } as ChannelUsersResponse)
    }

    result.push({
      role: 'Online',
      users: users.filter(
        user =>
          user.isOnline &&
          user.roles
            .getItems()
            .filter(role =>
              role.hasPermission(ServerPermission.DisplayRoleSeparately)
            ).length === 0
      )
    } as ChannelUsersResponse)

    result.push({
      role: 'Offline',
      users: users.filter(user => !user.isOnline)
    } as ChannelUsersResponse)

    return result
  }
}
