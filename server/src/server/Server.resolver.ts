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
import { Server } from '@/server/Server.entity'
import { Context } from '@/types/Context'
import { User } from '@/user/User.entity'
import { ServersArgs } from '@/server/ServersArgs'
import { ServerSort } from '@/server/ServerSort'
import { Channel } from '@/chat/Channel.entity'
import { ServersResponse } from '@/server/ServersResponse'
import { QueryOrder } from '@mikro-orm/core'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { uploadImage } from '@/util/S3Storage'
import { SubscriptionTopic } from '@/subscriptions'
import { Filter } from '@/types/Filter'

const filter = ({ payload: { users }, context: { user } }: Filter<Server>) =>
  users.contains(user)

const joinLeaveFilter = ({
  payload: { server },
  context: { user: currentUser }
}: Filter<UserServerPayload>) => server.users.contains(currentUser)

@Resolver(() => Server)
export class ServerResolver {
  @Authorized()
  @Mutation(() => Server)
  async createServer(
    @Ctx() { user, em }: Context,
    @Arg('name') name: string,
    @Arg('avatarFile', () => GraphQLUpload, { nullable: true })
    avatarFile?: FileUpload
  ): Promise<Server> {
    await em.populate(user, ['servers'])
    if (user.servers.length >= 100)
      throw new Error('Cannot join more than 100 servers')

    const channel = em.create(Channel, {
      name: 'general'
    })

    em.persist(channel)

    let avatarUrl = null
    if (avatarFile) {
      const { createReadStream, mimetype } = await avatarFile
      if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
        throw new Error('Image must be PNG or JPEG')
      avatarUrl = await uploadImage(createReadStream(), avatarFile.mimetype, {
        width: 256,
        height: 256
      })
    }

    const server = em.create(Server, {
      name,
      owner: user,
      moderators: [user],
      users: [user],
      userCount: 1,
      channels: [channel],
      channelsSort: [channel.id],
      avatarUrl
    })
    await em.persistAndFlush(server)
    return server
  }

  @Authorized()
  @Mutation(() => Channel)
  async createChannel(
    @Ctx() { user, em }: Context,
    @Arg('serverId', () => ID) serverId: string,
    @Arg('name') name: string,
    @Arg('modOnly', { defaultValue: false }) modOnly: boolean,
    @PubSub(SubscriptionTopic.ServerUpdated) serverUpdated: Publisher<Server>
  ) {
    const server = await em.findOne(Server, serverId, [
      'moderators',
      'channels'
    ])
    if (!server.moderators.contains(user))
      throw new Error('You are not a moderator')

    const channel = em.create(Channel, {
      name,
      server,
      modOnly
    })

    await em.persistAndFlush([channel, server])
    await serverUpdated(server)
    return channel
  }

  @Authorized()
  @Mutation(() => Boolean)
  async joinServer(
    @Arg('serverId', () => ID) serverId: string,
    @Ctx() { user, em }: Context,
    @PubSub(SubscriptionTopic.UserJoinedServer)
    userJoinedServer: Publisher<UserServerPayload>
  ) {
    await em.populate(user, ['servers'])
    if (user.servers.length >= 100)
      throw new Error('Cannot join more than 100 servers')

    const server = await em.findOne(Server, serverId, ['users'])
    if (!server) throw new Error('Server not found')
    if (server.users.contains(user))
      throw new Error('You have already joined this server')
    server.users.add(user)
    server.userCount++
    user.serversSort.push(server.id)
    await em.persistAndFlush([server, user])
    await userJoinedServer({ server, user })
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async leaveServer(
    @Arg('serverId', () => ID) serverId: string,
    @Ctx() { user, em }: Context,
    @PubSub(SubscriptionTopic.UserLeftServer)
    userLeftServer: Publisher<UserServerPayload>
  ) {
    const server = await em.findOne(Server, serverId, ['users'])
    if (!server) throw new Error('Server not found')
    if (!server.users.contains(user))
      throw new Error('You have not joined that server')
    server.users.remove(user)
    server.userCount--
    user.serversSort = user.serversSort.filter(id => id !== server.id)
    await em.persistAndFlush([server, user])
    await userLeftServer({ server, user })
    return true
  }

  @Query(() => ServersResponse)
  async getServers(
    @Args()
    { sort, joinedOnly, category, page, pageSize }: ServersArgs,
    @Ctx() { user, em }: Context
  ) {
    await em.populate(user, ['servers'])

    let where = {}
    let orderBy = {}

    if (sort === ServerSort.FEATURED || (!user && joinedOnly)) {
      where = { featured: true }
      orderBy = { featuredPosition: QueryOrder.ASC }
    } else if (category) {
      where = { category: category }
      orderBy = { name: QueryOrder.ASC }
    }

    if (sort === ServerSort.NEW) {
      orderBy = { createdAt: QueryOrder.DESC }
    } else if (sort === ServerSort.TOP) {
      orderBy = { userCount: QueryOrder.DESC }
    } else if (sort === ServerSort.AZ) {
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
    } as ServersResponse
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

  // --- Subscriptions ---

  @Authorized()
  @Subscription(() => Server, {
    topics: SubscriptionTopic.ServerUpdated,
    filter
  })
  serverUpdated(@Root() server: Server) {
    return server
  }

  @Authorized()
  @Subscription(() => ID, {
    topics: SubscriptionTopic.ServerDeleted,
    filter
  })
  serverDeleted(@Root() server: Server) {
    return server.id
  }

  @Authorized()
  @Subscription(() => UserJoinedServerResponse, {
    topics: SubscriptionTopic.UserJoinedServer,
    filter: joinLeaveFilter
  })
  userJoinedServer(@Root() { user, server }: UserServerPayload) {
    return { user: user, serverId: server.id } as UserJoinedServerResponse
  }

  @Authorized()
  @Subscription(() => UserLeftServerResponse, {
    topics: SubscriptionTopic.UserLeftServer,
    filter: joinLeaveFilter
  })
  userLeftServer(@Root() { user, server }: UserServerPayload) {
    return { userId: user.id, serverId: server.id } as UserLeftServerResponse
  }
}

interface UserServerPayload {
  user: User
  server: Server
}

@ObjectType()
class UserJoinedServerResponse {
  @Field(() => User)
  user: User

  @Field(() => ID)
  serverId: string
}

@ObjectType()
class UserLeftServerResponse {
  @Field(() => ID)
  userId: string

  @Field(() => ID)
  serverId: string
}
