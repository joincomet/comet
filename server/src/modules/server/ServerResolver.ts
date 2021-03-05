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
import { Server } from '@/entity/Server'
import { Context } from '@/types/Context'
import { User } from '@/entity/User'
import { GetServersArgs } from '@/modules/server/types/GetServersArgs'
import { GetServersSort } from '@/modules/server/types/GetServersSort'
import { ChatChannel } from '@/entity/ChatChannel'
import { GetServersResponse } from '@/modules/server/types/GetServersResponse'
import { QueryOrder } from '@mikro-orm/core'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { uploadImage } from '@/util/s3Storage'
import { SubscriptionTopic } from '@/modules/subscriptions'
import { SubscriptionFilter } from '@/modules/subscriptions/SubscriptionFilter'

const filter = ({
  payload: { users },
  context: { user }
}: SubscriptionFilter<Server>) => users.contains(user)

const joinLeaveFilter = ({
  payload: { server },
  context: { user: currentUser }
}: SubscriptionFilter<UserServerPayload>) => server.users.contains(currentUser)

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

    const channel = em.create(ChatChannel, {
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
  @Mutation(() => ChatChannel)
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
    /*if (!server.moderators.contains(user))
      throw new Error('You are not a moderator')*/

    const channel = em.create(ChatChannel, {
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
