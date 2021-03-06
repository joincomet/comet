import {
  Arg,
  Args,
  Authorized,
  Ctx,
  Field,
  ID,
  Mutation,
  ObjectType,
  Publisher,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription
} from 'type-graphql'
import { ChatChannel, Server, User } from '@/entity'
import {
  GetServersArgs,
  GetServersSort,
  GetServersResponse
} from '@/resolver/server'
import { QueryOrder } from '@mikro-orm/core'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { uploadImage } from '@/util/s3'
import { SubscriptionTopic, SubscriptionFilter, Context } from '@/types'

@Resolver(() => Server)
export class ServerQueries {
  @Query(() => GetServersResponse)
  async getServers(
    @Args()
    { sort, joinedOnly, category, page, pageSize }: GetServersArgs,
    @Ctx() { user, em }: Context
  ) {
    await em.populate(user, ['servers'])

    let where = {}
    let orderBy = {}

    if (sort === GetServersSort.FEATURED || (!user && joinedOnly)) {
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

    if (user && joinedOnly) {
      where = { id: user.servers.getItems(false) }
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

  @Query(() => [Server])
  async getJoinedServers(@Ctx() { user, em }: Context) {
    await em.populate(user, ['servers'])

    return user.servers
      .getItems()
      .sort(
        (a, b) =>
          user.serversSort.indexOf(a.id) - user.serversSort.indexOf(b.id)
      )
  }

  @Authorized()
  @Query(() => [User])
  async getServerUsers(
    @Ctx() { user, em }: Context,
    @Arg('serverId', () => ID) serverId: string
  ) {
    const server = await em.findOne(Server, serverId, ['users'])
    if (!server) throw new Error('Server not found')
    return server.users
  }
}
