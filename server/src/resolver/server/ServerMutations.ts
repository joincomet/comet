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
import { ServerUserJoin } from '@/entity/ServerUserJoin'
import { UpdateServerArgs } from '@/resolver/server/types/UpdateServerArgs'
import { CreateServerArgs } from '@/resolver/server/types/CreateServerArgs'
import { ServerPermission } from '@/types/ServerPermission'

@Resolver()
export class ServerMutations {
  @Authorized()
  @Mutation(() => Server, { description: 'Create a server' })
  async createServer(
    @Ctx() { user, em }: Context,
    @Args() { name, avatarFile, searchable, category }: CreateServerArgs,
    @PubSub(SubscriptionTopic.RefetchUsers)
    refetchUsers: Publisher<string>
  ): Promise<Server> {
    if ((await em.count(ServerUserJoin, { user })) >= 100)
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
      isSearchable: searchable
    })
    await em.persistAndFlush([server])
    await user.joinServer(em, refetchUsers, server.id)
    return server
  }

  @Authorized(ServerPermission.ManageChannels)
  @Mutation(() => ChatChannel)
  async createChannel(
    @Ctx() { em }: Context,
    @Arg('serverId', () => ID) serverId: string,
    @Arg('name') name: string,
    @PubSub(SubscriptionTopic.RefetchServers) refetchServers: Publisher<Server>
  ) {
    const server = await em.findOne(Server, serverId, ['channels'])

    const channel = em.create(ChatChannel, {
      name,
      server
    })

    await em.persistAndFlush([channel, server])
    await refetchServers(server)
    return channel
  }

  @Authorized()
  @Mutation(() => Boolean)
  async joinPublicServer(
    @Arg('serverId', () => ID) serverId: string,
    @Ctx() { user, em }: Context,
    @PubSub(SubscriptionTopic.RefetchUsers)
    refetchUsers: Publisher<string>
  ) {
    const server = await em.findOneOrFail(Server, serverId)
    if (!server.isSearchable)
      throw new Error('Invite required to join this server')
    await user.checkBannedFromServer(em, server.id)
    await user.joinServer(em, refetchUsers, server.id)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async joinServerWithInvite(
    @Arg('inviteId', () => ID) inviteId: string,
    @Ctx() { user, em }: Context,
    @PubSub(SubscriptionTopic.RefetchUsers)
    refetchUsers: Publisher<string>
  ) {
    const invite = await em.findOneOrFail(ServerInvite, inviteId, ['server'])
    if (invite.expired) throw new Error('This invite has expired.')
    const server = invite.server
    await user.checkBannedFromServer(em, server.id)
    await user.joinServer(em, refetchUsers, server.id)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async leaveServer(
    @Arg('serverId', () => ID, { description: 'ID of server to leave' })
    serverId: string,
    @Ctx() { user, em }: Context,
    @PubSub(SubscriptionTopic.RefetchUsers)
    refetchUsers: Publisher<string>
  ) {
    await user.leaveServer(em, refetchUsers, serverId)
    return true
  }

  @Authorized(ServerPermission.BanUser)
  @Mutation(() => Boolean, {
    description: 'Ban a user from a server (requires ServerPermission.BanUser)'
  })
  async banUserFromServer(
    @Ctx() { em, user: currentUser }: Context,
    @PubSub(SubscriptionTopic.RefetchUsers)
    refetchUsers: Publisher<string>,
    @Arg('serverId', () => ID, {
      description: 'ID of server user is being banned from'
    })
    serverId: string,
    @Arg('userId', () => ID, { description: 'ID of user to ban' })
    userId: string,
    @Arg('purge', {
      defaultValue: false,
      description: 'Remove all posts, comments and messages'
    })
    purge: boolean,
    @Arg('reason', { nullable: true }) reason?: string
  ) {
    const server = await em.findOneOrFail(Server, serverId)
    const bannedUser = await em.findOneOrFail(User, userId, [
      'serverJoins.server'
    ])
    await bannedUser.banFromServer(
      em,
      refetchUsers,
      server.id,
      reason,
      currentUser.id
    )
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
      isSearchable: searchable
    })
  }
}
