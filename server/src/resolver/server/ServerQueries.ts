import { Arg, Args, Authorized, Ctx, ID, Query, Resolver } from 'type-graphql'
import { ChatChannel, Server, User } from '@/entity'
import {
  GetServersArgs,
  GetServersResponse,
  GetServersSort
} from '@/resolver/server'
import { QueryOrder } from '@mikro-orm/core'
import { Context } from '@/types'
import { ServerPermission } from '@/types/ServerPermission'
import { ChannelPermission } from '@/types/ChannelPermission'

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

  @Authorized([ChannelPermission.ViewChannel, ServerPermission.ViewChannels])
  @Query(() => [User])
  async getChannelUsers(
    @Ctx() { user, em }: Context,
    @Arg('channelId', () => ID) channelId: string
  ) {
    // TODO
    const channel = await em.findOneOrFail(ChatChannel, channelId)
    return []
  }
}
