import { ArgsType, Field, Publisher } from 'type-graphql'
import { Length } from 'class-validator'
import { ServerCategory } from '@/resolver/server'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Context } from '@/types'
import { UserServerPayload } from '@/resolver/server/subscriptions/UserServerPayload'
import { Channel, Server, ServerUser } from '@/entity'
import { uploadImageSingle } from '@/util'

@ArgsType()
export class CreateServerArgs {
  @Field()
  @Length(2, 100)
  name: string

  @Field({ defaultValue: false })
  isPublic: boolean

  @Field(() => ServerCategory, { nullable: true })
  category?: ServerCategory

  @Field(() => GraphQLUpload, { nullable: true })
  avatarFile?: FileUpload
}

export async function createServer(
  { em, user }: Context,
  { name, isPublic, category, avatarFile }: CreateServerArgs,
  notifyUserJoinedServer: Publisher<UserServerPayload>
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
  await user.joinServer(em, server.id, notifyUserJoinedServer)
  return server
}
