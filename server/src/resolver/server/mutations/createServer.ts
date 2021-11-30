import { Field, InputType } from 'type-graphql'
import { Length, Matches } from 'class-validator'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Context } from '@/types'
import {
  Channel,
  defaultServerPermissions,
  Folder,
  Message,
  MessageType,
  Role,
  Server,
  ServerCategory,
  ServerFolder,
  ServerUser,
  ServerUserStatus
} from '@/entity'
import {handleUnderscore, logger, ReorderUtils, uploadImageFileSingle} from '@/util'
import { serverRegex } from '@/util/text/serverRegex'

@InputType()
export class CreateServerInput {
  @Field()
  @Length(3, 21)
  @Matches(serverRegex, { message: 'Letters, numbers and underscores only' })
  name: string

  @Field()
  @Length(2, 100)
  displayName: string

  @Field({ nullable: true })
  @Length(0, 500)
  description?: string

  @Field(() => ServerCategory, { defaultValue: ServerCategory.Other })
  category: ServerCategory = ServerCategory.Other

  @Field(() => GraphQLUpload, { nullable: true })
  avatarFile?: FileUpload

  @Field(() => GraphQLUpload, { nullable: true })
  bannerFile?: FileUpload

  @Field(() => Boolean, { defaultValue: false })
  isDownvotesEnabled: boolean = false
}

export async function createServer(
  { em, userId, liveQueryStore }: Context,
  {
    name,
    displayName,
    description,
    category,
    avatarFile,
    bannerFile,
    isDownvotesEnabled
  }: CreateServerInput
): Promise<Server> {
  logger('createServer')

  const ownerCount = await em.count(Server, { owner: userId })
  if (ownerCount >= 10) throw new Error('Cannot own more than 10 planets')

  name = name.trim()
  displayName = displayName.trim()
  description = description.trim()
  let avatarUrl = null
  if (avatarFile) {
    avatarUrl = await uploadImageFileSingle(
      avatarFile,
      {
        width: 256,
        height: 256
      },
      true
    )
  }

  let bannerUrl = null
  if (bannerFile) {
    bannerUrl = await uploadImageFileSingle(
      bannerFile,
      {
        width: 1920,
        height: 1080
      },
      true
    )
  }

  const foundServer = await em.findOne(Server, {
    name: handleUnderscore(name),
    isDeleted: false
  })
  if (foundServer) throw new Error('Planet with that name already exists')

  const server = em.create(Server, {
    name,
    displayName,
    description,
    isDownvotesEnabled,
    owner: userId,
    avatarUrl,
    bannerUrl,
    category,
    userCount: 1
  })

  const channel = em.create(Channel, {
    name: 'general',
    server,
    isDefault: true
  })

  const serverFolder = em.create(ServerFolder, {
    server,
    folder: em.create(Folder, { server, name: 'Announcements' })
  })
  const firstServer = await em.findOne(
    ServerUser,
    { user: userId },
    { orderBy: { position: 'ASC' } }
  )
  const serverUser = em.create(ServerUser, {
    server,
    user: userId,
    status: ServerUserStatus.Joined,
    position: firstServer
      ? ReorderUtils.positionBefore(firstServer.position)
      : ReorderUtils.FIRST_POSITION
  })
  const role = em.create(Role, {
    server,
    name: 'Default',
    isDefault: true,
    permissions: defaultServerPermissions,
    serverUsers: [serverUser]
  })

  const initialMessage = em.create(Message, {
    author: userId,
    type: MessageType.Initial,
    channel
  })

  await em.persistAndFlush([
    server,
    channel,
    serverUser,
    serverFolder,
    role,
    initialMessage
  ])
  liveQueryStore.invalidate(`User:${userId}`)
  return server
}
