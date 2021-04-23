import { Field, InputType } from 'type-graphql'
import { Length } from 'class-validator'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Context } from '@/types'
import {
  Channel,
  defaultServerPermissions,
  Folder,
  Role,
  Server,
  ServerCategory,
  ServerFolder,
  ServerUser,
  ServerUserStatus
} from '@/entity'
import { ReorderUtils, uploadImageFileSingle } from '@/util'

@InputType()
export class CreateServerInput {
  @Field()
  @Length(2, 100)
  name: string

  @Field({ defaultValue: false })
  isPublic: boolean = false

  @Field(() => ServerCategory, { defaultValue: ServerCategory.Other })
  category: ServerCategory = ServerCategory.Other

  @Field(() => GraphQLUpload, { nullable: true })
  avatarFile?: FileUpload
}

export async function createServer(
  { em, userId, liveQueryStore }: Context,
  { name, isPublic, category, avatarFile }: CreateServerInput
): Promise<Server> {
  if ((await em.count(ServerUser, { user: userId })) >= 100)
    throw new Error('error.server.joinLimit')

  const channel = em.create(Channel, {
    name: 'general'
  })

  em.persist(channel)

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

  const server = em.create(Server, {
    name,
    owner: userId,
    channels: [channel],
    avatarUrl,
    category,
    isPublic,
    systemMessagesChannel: channel,
    userCount: 1
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
    name: '@everyone',
    permissions: defaultServerPermissions,
    serverUsers: [serverUser]
  })
  await em.persistAndFlush([server, serverUser, serverFolder, role])
  liveQueryStore.invalidate(`User:${userId}`)
  return server
}
