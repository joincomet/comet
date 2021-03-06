import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Publisher,
  PubSub,
  Resolver
} from 'type-graphql'
import { ChatChannel, Server, User } from '@/entity'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { uploadImage } from '@/util/s3'
import { SubscriptionTopic, Context } from '@/types'
import { ServerCategory, UserServerPayload } from '@/resolver/server'

@Resolver()
export class ServerMutations {
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

  @Authorized()
  @Mutation(() => Boolean)
  async banUserFromServer(
    @Arg('serverId', () => ID) serverId: string,
    @Arg('bannedId', () => ID) bannedId: string,
    @Ctx() { em, user }: Context
  ) {
    const server = await em.findOne(Server, serverId)

    const bannedUser = await em.findOne(User, bannedId)
    server.bannedUsers.add(bannedUser)
    server.users.remove(bannedUser)
    await em.persistAndFlush(server)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async unbanUserFromServer(
    @Arg('serverId', () => ID) serverId: string,
    @Arg('bannedId', () => ID) bannedId: string,
    @Ctx() { em, user }: Context
  ) {
    const server = await em.findOne(Server, serverId)

    const bannedUser = await em.findOne(User, bannedId)
    server.bannedUsers.remove(bannedUser)
    await em.persistAndFlush(server)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async uploadServerAvatar(
    @Arg('serverId', () => ID) serverId: string,
    @Arg('file', () => GraphQLUpload) file: FileUpload,
    @Ctx() { em, user }: Context
  ) {
    const server = await em.findOne(Server, serverId)

    const { createReadStream, mimetype } = await file
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')
    server.avatarUrl = await uploadImage(createReadStream(), file.mimetype, {
      width: 256,
      height: 256
    })
    await em.persistAndFlush(server)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async uploadServerBanner(
    @Arg('serverId', () => ID) serverId: string,
    @Arg('file', () => GraphQLUpload) file: FileUpload,
    @Ctx() { em, user }: Context
  ) {
    const server = await em.findOne(Server, serverId)

    const { createReadStream, mimetype } = await file
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')
    server.bannerUrl = await uploadImage(createReadStream(), file.mimetype, {
      width: 1920
    })
    await em.persistAndFlush(server)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async editServerDescription(
    @Arg('serverId', () => ID) serverId: string,
    @Arg('description') description: string,
    @Ctx() { em, user }: Context
  ) {
    const server = await em.findOne(Server, serverId)

    if (description.length > 1000)
      throw new Error('Description cannot be longer than 1000 characters')

    server.description = description
    await em.persistAndFlush(server)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async setServerCategory(
    @Arg('serverId', () => ID) serverId: string,
    @Arg('category', () => ServerCategory) category: ServerCategory,
    @Ctx() { em }: Context
  ) {
    const server = await em.findOne(Server, serverId)
    server.category = category
    await em.persistAndFlush(server)
    return true
  }
}
