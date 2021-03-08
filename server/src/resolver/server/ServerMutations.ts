import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Publisher,
  PubSub,
  Resolver
} from 'type-graphql'
import { ChatChannel, Server, ServerInvite, User } from '@/entity'
import { uploadImage } from '@/util/s3'
import { SubscriptionTopic, Context } from '@/types'
import { UserServerPayload } from '@/resolver/server'
import { UserJoinServer } from '@/entity/UserJoinServer'
import { UpdateServerArgs } from '@/resolver/server/types/UpdateServerArgs'
import { CreateServerArgs } from '@/resolver/server/types/CreateServerArgs'
import { ServerPermission } from '@/types/ServerPermission'

@Resolver()
export class ServerMutations {
  @Authorized()
  @Mutation(() => Server)
  async createServer(
    @Ctx() { user, em }: Context,
    @Args() { name, avatarFile, searchable, category }: CreateServerArgs,
    @PubSub(SubscriptionTopic.UserJoinedServer)
    userJoinedServer: Publisher<UserServerPayload>
  ): Promise<Server> {
    if ((await em.count(UserJoinServer, { user })) >= 100)
      throw new Error('Cannot join more than 100 servers')

    const channel = em.create(ChatChannel, {
      name: 'general'
    })

    em.persist(channel)

    let avatarUrl = null
    if (avatarFile) {
      avatarUrl = await uploadImage(avatarFile, {
        width: 256,
        height: 256
      })
    }

    const server = em.create(Server, {
      name,
      owner: user,
      channels: [channel],
      avatarUrl,
      category,
      searchable
    })
    await em.persistAndFlush([server])
    await user.joinServer(em, server, userJoinedServer)
    return server
  }

  @Authorized(ServerPermission.ManageChannels)
  @Mutation(() => ChatChannel)
  async createChannel(
    @Ctx() { em }: Context,
    @Arg('serverId', () => ID) serverId: string,
    @Arg('name') name: string,
    @PubSub(SubscriptionTopic.ServerUpdated) serverUpdated: Publisher<Server>
  ) {
    const server = await em.findOne(Server, serverId, ['channels'])

    const channel = em.create(ChatChannel, {
      name,
      server
    })

    await em.persistAndFlush([channel, server])
    await serverUpdated(server)
    return channel
  }

  @Authorized()
  @Mutation(() => Boolean)
  async joinPublicServer(
    @Arg('serverId', () => ID) serverId: string,
    @Ctx() { user, em }: Context,
    @PubSub(SubscriptionTopic.UserJoinedServer)
    userJoinedServer: Publisher<UserServerPayload>
  ) {
    const server = await em.findOneOrFail(Server, serverId)
    if (!server.searchable)
      throw new Error('Invite required to join this server')
    await user.checkBannedFromServer(em, server)
    await user.joinServer(em, server, userJoinedServer)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async joinServerWithInvite(
    @Arg('inviteId', () => ID) inviteId: string,
    @Ctx() { user, em }: Context,
    @PubSub(SubscriptionTopic.UserJoinedServer)
    userJoinedServer: Publisher<UserServerPayload>
  ) {
    const invite = await em.findOneOrFail(ServerInvite, inviteId, ['server'])
    if (invite.expired) throw new Error('This invite has expired.')
    const server = invite.server
    await user.checkBannedFromServer(em, server)
    await user.joinServer(em, server, userJoinedServer)
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
    const server = await em.findOneOrFail(Server, serverId)
    await user.leaveServer(em, server, userLeftServer)
    return true
  }

  @Authorized(ServerPermission.BanUser)
  @Mutation(() => Boolean)
  async banUserFromServer(
    @Ctx() { em, user: currentUser }: Context,
    @PubSub(SubscriptionTopic.UserLeftServer)
    userLeftServer: Publisher<UserServerPayload>,
    @Arg('serverId', () => ID) serverId: string,
    @Arg('userId', () => ID) userId: string,
    @Arg('reason', { nullable: true }) reason?: string
  ) {
    const server = await em.findOneOrFail(Server, serverId)
    const user = await em.findOneOrFail(User, userId)
    await user.banFromServer(em, server, userLeftServer, reason, currentUser)
    return true
  }

  @Authorized(ServerPermission.BanUser)
  @Mutation(() => Boolean)
  async unbanUserFromServer(
    @Arg('serverId', () => ID) serverId: string,
    @Arg('userId', () => ID) userId: string,
    @Ctx() { em }: Context
  ) {
    const server = await em.findOneOrFail(Server, serverId)
    const user = await em.findOneOrFail(User, userId)
    await user.unbanFromServer(em, server)
    return true
  }

  @Authorized(ServerPermission.ManageServer)
  @Mutation(() => Boolean)
  async updateServer(
    @Ctx() { em }: Context,
    @Args()
    {
      serverId,
      name,
      description,
      avatarFile,
      bannerFile,
      category,
      searchable
    }: UpdateServerArgs
  ) {
    const server = await em.findOneOrFail(Server, serverId)

    const avatarUrl = await uploadImage(avatarFile, {
      width: 256,
      height: 256
    })

    const bannerUrl = await uploadImage(bannerFile, {
      width: 256,
      height: 256
    })

    em.assign(server, {
      name,
      description,
      avatarUrl,
      bannerUrl,
      category,
      searchable
    })
  }
}
