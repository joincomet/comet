import { Field, InputType } from 'type-graphql'
import { Length } from 'class-validator'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Context } from '@/types'
import { Channel, Server, ServerCategory, ServerUser } from '@/entity'
import { ReorderUtils, uploadImageSingle } from '@/util'

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
  { em, user, liveQueryStore }: Context,
  { name, isPublic, category, avatarFile }: CreateServerInput
): Promise<Server> {
  if ((await em.count(ServerUser, { user })) >= 100)
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
  const firstServer = await em.findOne(
    ServerUser,
    { user },
    { orderBy: { position: 'ASC' } }
  )
  const join = em.create(ServerUser, {
    server,
    user,
    position: firstServer
      ? ReorderUtils.positionBefore(firstServer.position)
      : ReorderUtils.FIRST_POSITION
  })
  await em.persistAndFlush([server, join])
  liveQueryStore.invalidate(`Query.getJoinedServers(userId:"${user.id}")`)
  return server
}
