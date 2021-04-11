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
import { Channel, Server, ServerInvite, User } from '@/entity'
import { uploadImageSingle } from '@/util/s3'
import { Context, SubscriptionTopic } from '@/types'
import { ServerUserJoin } from '@/entity/ServerUserJoin'
import { UpdateServerArgs } from '@/resolver/server/types/UpdateServerArgs'
import { CreateServerArgs } from '@/resolver/server/types/CreateServerArgs'
import { ServerPermission } from '@/types/ServerPermission'
import { CheckServerPermission } from '@/util'
import { CheckJoinedServer } from '@/util/auth/middlewares/CheckJoinedServer'

@Resolver()
export class ServerMutations {
  @Authorized()
  @Mutation(() => Server, { description: 'Create a server' })
  async createServer(
    @Ctx() { user, em }: Context,
    @Args() { name, avatarFile, isPublic, category }: CreateServerArgs,
    @PubSub(SubscriptionTopic.RefetchUsers)
    refetchUsers: Publisher<string>
  ): Promise<Server> {
    if ((await em.count(ServerUserJoin, { user })) >= 100)
      throw new Error('error.server.joinLimit')

    const channel = em.create(Channel, {
      name: 'general'
    })

    em.persist(channel)

    let avatarUrl = null
    if (avatarFile) {
      avatarUrl = await uploadImageSingle(
        avatarFile,
        {
          width: 256,
          height: 256
        },
        true
      )
    }

    const server = em.create(Server, {
      name,
      owner: user,
      channels: [channel],
      avatarUrl,
      category,
      isPublic,
      systemMessagesChannel: channel
    })
    await em.persistAndFlush([server])
    await user.joinServer(em, refetchUsers, server)
    return server
  }

  @Authorized()
  @Mutation(() => Boolean)
  async joinPublicServer(
    @Arg('serverId', () => ID) serverId: string,
    @Ctx() { user, em }: Context,
    @PubSub(SubscriptionTopic.RefetchUsers)
    refetchUsers: Publisher<string>
  ): Promise<boolean> {
    const server = await em.findOneOrFail(Server, serverId)
    if (!server.isPublic) throw new Error('error.server.inviteRequired')
    await user.checkBannedFromServer(em, server)
    await user.joinServer(em, refetchUsers, server)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async joinServerWithInvite(
    @Arg('inviteId', () => ID) inviteId: string,
    @Ctx() { user, em }: Context,
    @PubSub(SubscriptionTopic.RefetchUsers)
    refetchUsers: Publisher<string>
  ): Promise<boolean> {
    const invite = await em.findOneOrFail(ServerInvite, inviteId, ['server'])
    if (invite.isExpired) throw new Error('error.server.inviteExpired')
    const server = invite.server
    await user.checkBannedFromServer(em, server)
    await user.joinServer(em, refetchUsers, server)
    return true
  }

  @CheckJoinedServer()
  @Mutation(() => Boolean)
  async leaveServer(
    @Arg('serverId', () => ID, { description: 'ID of server to leave' })
    serverId: string,
    @Ctx() { user, em }: Context,
    @PubSub(SubscriptionTopic.RefetchUsers)
    refetchUsers: Publisher<string>
  ): Promise<boolean> {
    const server = await em.findOneOrFail(Server, serverId)
    await user.leaveServer(em, refetchUsers, server)
    return true
  }

  @CheckServerPermission(ServerPermission.BanUser)
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
  ): Promise<boolean> {
    const server = await em.findOneOrFail(Server, serverId)
    const bannedUser = await em.findOneOrFail(User, userId, [
      'serverJoins.server'
    ])
    await bannedUser.banFromServer(
      em,
      refetchUsers,
      server,
      reason,
      currentUser
    )
    return true
  }

  @CheckServerPermission(ServerPermission.BanUser)
  @Mutation(() => Boolean)
  async unbanUserFromServer(
    @Arg('serverId', () => ID) serverId: string,
    @Arg('userId', () => ID) userId: string,
    @Ctx() { em }: Context
  ): Promise<boolean> {
    const server = await em.findOneOrFail(Server, serverId)
    const user = await em.findOneOrFail(User, userId)
    await user.unbanFromServer(em, server)
    return true
  }

  @CheckServerPermission(ServerPermission.ManageServer)
  @Mutation(() => Server)
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
  ): Promise<Server> {
    const server = await em.findOneOrFail(Server, serverId)

    const avatarUrl = await uploadImageSingle(
      avatarFile,
      {
        width: 256,
        height: 256
      },
      true
    )

    const bannerUrl = await uploadImageSingle(bannerFile, null, false)

    em.assign(server, {
      name,
      description,
      avatarUrl,
      bannerUrl,
      category,
      isPublic: searchable
    })

    await em.persistAndFlush(server)

    return server
  }
}
