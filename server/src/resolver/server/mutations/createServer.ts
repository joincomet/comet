import { Field, InputType } from 'type-graphql'
import { Length } from 'class-validator'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Context } from '@/types'
import { Channel, Server, ServerCategory, ServerUser } from '@/entity'
import { uploadImageSingle } from '@/util'

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
  await em.persistAndFlush([server])
  liveQueryStore.invalidate(`Query.getJoinedServers(id:"${user.id}")`)
  return server
}
