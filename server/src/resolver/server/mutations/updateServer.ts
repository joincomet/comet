import { Field, ID, InputType, Int } from 'type-graphql'
import { IsOptional, Length } from 'class-validator'
import {
  ChannelUser,
  Server,
  ServerCategory,
  ServerPermission,
  ServerUser,
  ServerUserStatus
} from '@/entity'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Context, NotificationSetting } from '@/types'
import { getReorderPosition, uploadImageSingle } from '@/util'

@InputType()
export class UpdateServerInput {
  @Field(() => ID)
  serverId: string

  @Field({ nullable: true })
  @IsOptional()
  @Length(2, 100)
  name?: string

  @Field({ nullable: true })
  @Length(0, 500)
  description?: string

  @Field({ nullable: true })
  isPublic?: boolean

  @Field({ nullable: true })
  isFeatured?: boolean

  @Field(() => Int, { nullable: true })
  featuredPosition?: number

  @Field(() => ServerCategory, { nullable: true })
  category?: ServerCategory

  @Field(() => GraphQLUpload, { nullable: true })
  avatarFile?: FileUpload

  @Field(() => GraphQLUpload, { nullable: true })
  bannerFile?: FileUpload

  @Field({ defaultValue: false })
  isDeleted: boolean = false

  @Field(() => ID, { nullable: true })
  banUserId?: string

  @Field({ defaultValue: false })
  purge: boolean = false

  @Field(() => ID, { nullable: true })
  unbanUserId?: string

  @Field(() => ID, { nullable: true })
  kickUserId?: string

  @Field(() => ID, { nullable: true })
  ownerId?: string

  @Field(() => ID, { nullable: true })
  beforeServerId?: string

  @Field({ nullable: true })
  @Length(1, 1000)
  @IsOptional()
  nickname?: string

  @Field(() => NotificationSetting, { nullable: true })
  notificationSetting?: NotificationSetting

  @Field({ defaultValue: false })
  isRead: boolean = false

  @Field(() => ID, { nullable: true })
  systemMessagesChannelId?: string

  @Field({ nullable: true })
  sendWelcomeMessage: boolean
}

export async function updateServer(
  { em, user, liveQueryStore }: Context,
  {
    serverId,
    name,
    description,
    isPublic,
    category,
    avatarFile,
    bannerFile,
    banUserId,
    beforeServerId,
    featuredPosition,
    isFeatured,
    kickUserId,
    isDeleted,
    ownerId,
    unbanUserId,
    nickname,
    notificationSetting,
    isRead,
    systemMessagesChannelId,
    sendWelcomeMessage
  }: UpdateServerInput
): Promise<Server> {
  const server = await em.findOneOrFail(Server, serverId, ['owner'])
  if (
    name ||
    description ||
    isPublic ||
    category ||
    avatarFile ||
    bannerFile ||
    systemMessagesChannelId ||
    sendWelcomeMessage
  ) {
    await user.checkServerPermission(
      em,
      server.id,
      ServerPermission.ManageServer
    )
    em.assign(server, {
      name: name ?? server.name,
      description: description ?? server.description,
      isPublic: isPublic ?? server.isPublic,
      category: category ?? server.category,
      avatarUrl: avatarFile
        ? await uploadImageSingle(avatarFile, { width: 256, height: 256 })
        : server.avatarUrl,
      bannerUrl: bannerFile
        ? await uploadImageSingle(bannerFile, { width: 256, height: 256 })
        : server.bannerUrl,
      systemMessagesChannel:
        systemMessagesChannelId ?? server.systemMessagesChannel,
      sendWelcomeMessage: sendWelcomeMessage ?? server.sendWelcomeMessage
    })
  }

  if (banUserId || unbanUserId || kickUserId) {
    await user.checkServerPermission(
      em,
      server.id,
      ServerPermission.ManageUsers
    )
    if (banUserId) {
      const serverUser = await em.findOneOrFail(ServerUser, {
        user: banUserId,
        server,
        status: ServerUserStatus.Joined
      })
      serverUser.status = ServerUserStatus.Banned
      await em.persistAndFlush(serverUser)
      liveQueryStore.invalidate(`User:${banUserId}`)
    }

    if (unbanUserId) {
      const serverUser = await em.findOneOrFail(ServerUser, {
        user: banUserId,
        server,
        status: ServerUserStatus.Banned
      })
      serverUser.status = ServerUserStatus.None
      em.persist(serverUser)
    }

    if (kickUserId) {
      const serverUser = await em.findOneOrFail(ServerUser, {
        user: kickUserId,
        server,
        status: ServerUserStatus.Joined
      })
      serverUser.status = ServerUserStatus.None
      await em.persistAndFlush(serverUser)
      liveQueryStore.invalidate(`User:${kickUserId}`)
    }
  }

  if (beforeServerId || nickname || notificationSetting || isRead) {
    const serverUser = await em.findOneOrFail(ServerUser, {
      user,
      server,
      status: ServerUserStatus.Joined
    })
    em.assign(server, {
      nickname: nickname ?? serverUser.nickname,
      notificationSetting: notificationSetting ?? serverUser.notificationSetting
    })

    if (isRead) {
      await em
        .createQueryBuilder(ChannelUser)
        .update({ lastViewAt: new Date(), mentionCount: 0 })
        .where({ user, channel: { server } })
        .execute()
    }

    if (typeof beforeServerId === 'string') {
      const serverUsers = await em.find(
        ServerUser,
        { user, status: ServerUserStatus.Joined },
        ['server'],
        {
          position: 'ASC'
        }
      )
      const serverUser = serverUsers.find(s => s.server.id === serverId)
      const firstServerUser = serverUsers[0]
      const beforeServerUser =
        beforeServerId !== '0'
          ? serverUsers.find(s => s.server.id === beforeServerId)
          : null
      const afterServerUser = beforeServerUser
        ? serverUsers[serverUsers.indexOf(beforeServerUser) + 1]
        : null

      serverUser.position = getReorderPosition(
        firstServerUser?.position,
        beforeServerUser?.position,
        afterServerUser?.position
      )
      em.persist(serverUser)
    }
  }

  if (isDeleted || ownerId) {
    if (server.owner !== user)
      throw new Error('Must be server owner to delete server or change owner')
    em.assign(server, {
      isDeleted: isDeleted,
      owner: ownerId ?? server.owner
    })
  }

  if (isFeatured || featuredPosition) {
    if (!user.isAdmin)
      throw new Error('Must be global admin to set featured planets')
    em.assign(server, {
      isFeatured: isFeatured ?? server.isFeatured,
      featuredPosition: featuredPosition ?? server.featuredPosition
    })
  }
  await em.persistAndFlush(server)
  liveQueryStore.invalidate(`Query.getJoinedServers(id:"${user.id}")`)
  return server
}
